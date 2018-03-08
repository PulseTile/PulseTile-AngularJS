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
  return { type: types.HEIGHTANDWEIGHT__CLEAR }
}
export function all(patientId) {
  return {
    types: [types.HEIGHTANDWEIGHT, types.HEIGHTANDWEIGHT_SUCCESS, types.HEIGHTANDWEIGHT_ERROR],

    shouldCallAPI: (state) => !state.heightAndWeight.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/heightAndWeight/'
    },

    meta: {
      patientId: patientId,
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.HEIGHTANDWEIGHT_GET, types.HEIGHTANDWEIGHT_GET_SUCCESS, types.HEIGHTANDWEIGHT_GET_ERROR],

    shouldCallAPI: (state) => !state.heightAndWeight.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/heightAndWeight/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.HEIGHTANDWEIGHT_CREATE, types.HEIGHTANDWEIGHT_CREATE_SUCCESS, types.HEIGHTANDWEIGHT_CREATE_ERROR],

    shouldCallAPI: (state) => !state.heightAndWeight.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/heightAndWeight',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.HEIGHTANDWEIGHT_UPDATE, types.HEIGHTANDWEIGHT_UPDATE_SUCCESS, types.HEIGHTANDWEIGHT_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.heightAndWeight.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/heightAndWeight',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function heightAndWeightActions($ngRedux) {
  let actionCreator = {
    all, clear, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

heightAndWeightActions.$inject = ['$ngRedux'];