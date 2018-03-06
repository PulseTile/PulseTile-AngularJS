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
import {bindActionCreators} from 'redux';
import * as types from './action-types';

export function clear() {
  return { type: types.TRANSFEROFCARE__CLEAR }
}
export function all(patientId) {
  return {
    types: [types.TRANSFEROFCARE, types.TRANSFEROFCARE_SUCCESS, types.TRANSFEROFCARE_ERROR],

    shouldCallAPI: (state) => !state.transferOfCare.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/events/toc'
    },

    meta: {
      patientId: patientId,
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.TRANSFEROFCARE_GET, types.TRANSFEROFCARE_GET_SUCCESS, types.TRANSFEROFCARE_GET_ERROR],

    shouldCallAPI: (state) => !state.transferOfCare.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/events/toc/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
/* istanbul ignore next */
export function create(patientId, composition) {
  return {
    types: [types.TRANSFEROFCARE_CREATE, types.TRANSFEROFCARE_CREATE_SUCCESS, types.TRANSFEROFCARE_CREATE_ERROR],

    shouldCallAPI: (state) => !state.transferOfCare.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/events/toc',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export function update(patientId, sourceId, composition) {
  return {
    types: [types.TRANSFEROFCARE_UPDATE, types.TRANSFEROFCARE_UPDATE_SUCCESS, types.TRANSFEROFCARE_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.transferOfCare.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/events/toc/' + sourceId,
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function transferOfCareActions($ngRedux) {
  let actionCreator = {
    all, clear, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

transferOfCareActions.$inject = ['$ngRedux'];