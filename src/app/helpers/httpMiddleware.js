/*
  ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
  ~  
  ~  Licensed under the Apache License, Version 2.0 (the "License");
  ~  you may not use this file except in compliance with the License.
  ~  You may obtain a copy of the License at
  ~  
  ~    http://www.apache.org/licenses/LICENSE-2.0

  ~  Unless required by applicable law or agreed to in writing, software
  ~  distributed under the License is distributed on an "AS IS" BASIS,
  ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~  See the License for the specific language governing permissions and
  ~  limitations under the License.
*/
import * as actionTypes from '../constants/ActionTypes';

export const httpSetTokenToCookie = function (response) {
  const token = document.cookie.split('JSESSIONID=')[1];
  const payloadToken = response.token;

  if (payloadToken !== undefined && payloadToken !== token) {
    // console.log('replace the token');
    document.cookie = `JSESSIONID=${payloadToken}`
  }
};

export default function httpMiddleware($http) {

  function callAPI(config) {
    config = angular.extend(config, {
      headers: {
        'Content-Type': 'application/json'
      },
      url: encodeURI(config.url)
    });
    
    return $http(config)
      .then(res => res.data);
  }

  return ({dispatch, getState}) => next => action => {
    const {
      types,
      config,
      shouldCallAPI = () => true,
      meta = {}
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof config !== 'object') {
      throw new Error('Expected config to be an object. See $http config.');
    }
    
    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch(Object.assign({}, {
      type: requestType,
      payload: {
        meta
      }
    })); 

    return callAPI(config).then(
      response => {
        // Handle getting a new token
        httpSetTokenToCookie(response);

        dispatch(Object.assign({}, {
          type: successType,
          payload: {
            response,
            meta
          }
        }));
      },
      error => {
				dispatch(Object.assign({}, {
					type: failureType,
					error: true,
					payload: {
						error: error,
						meta
					}
				}));
				// Handle all async Errors from Requests
				dispatch(Object.assign({}, {
					type: actionTypes.HANDLE_ERRORS,
					error: true,
					payload: {
						error: error,
						meta
					}
				}));
      }
    );
  }
}

httpMiddleware.$inject = ['$http'];
