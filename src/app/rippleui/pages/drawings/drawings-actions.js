/*
 ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
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
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.DRAWINGS, types.DRAWINGS_SUCCESS, types.DRAWINGS_ERROR],

    shouldCallAPI: (state) => !state.drawings.response,

    config: {
      method: 'get',
      url: '/api/pictures/' + patientId
    },

    d: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.DRAWINGS_GET, types.DRAWINGS_GET_SUCCESS, types.DRAWINGS_GET_ERROR],

    shouldCallAPI: (state) => !state.drawings.response,

    config: {
      method: 'get',
      url: '/api/pictures/' + patientId + '/' + compositionId
    },

    d: {
      timestamp: Date.now()
    }
  };
}
/* istanbul ignore next */
export function create(patientId, composition) {
  return {
    types: [types.DRAWINGS_CREATE, types.DRAWINGS_CREATE_SUCCESS, types.DRAWINGS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.drawings.response,

    config: {
      method: 'post',
      url: '/api/pictures/' + patientId,
      data: composition
    },

    d: {
      timestamp: Date.now()
    }
  };
}

export function update(patientId, compositionId, composition) {
  return {
    types: [types.DRAWINGS_UPDATE, types.DRAWINGS_UPDATE_SUCCESS, types.DRAWINGS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.drawings.response,

    config: {
      method: 'put',
      url: '/api/pictures/' + patientId + '/' + compositionId,
      data: composition
    },

    d: {
      timestamp: Date.now()
    }
  };
}

export default function drawingsActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

drawingsActions.$inject = ['$ngRedux'];