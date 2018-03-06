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
  return { type: types.PERSONALNOTES__CLEAR }
}
export function all(patientId) {
  return {
    types: [types.PERSONALNOTES, types.PERSONALNOTES_SUCCESS, types.PERSONALNOTES_ERROR],

    shouldCallAPI: (state) => !state.personalnotes.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/personalnotes'
    },

    meta: {
      patientId: patientId,
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.PERSONALNOTES_GET, types.PERSONALNOTES_GET_SUCCESS, types.PERSONALNOTES_GET_ERROR],

    shouldCallAPI: (state) => !state.personalnotes.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/personalnotes/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.PERSONALNOTES_CREATE, types.PERSONALNOTES_CREATE_SUCCESS, types.PERSONALNOTES_CREATE_ERROR],

    shouldCallAPI: (state) => !state.personalnotes.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/personalnotes',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, sourceId, composition) {
  return {
    types: [types.PERSONALNOTES_UPDATE, types.PERSONALNOTES_UPDATE_SUCCESS, types.PERSONALNOTES_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.personalnotes.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/personalnotes/' + sourceId,
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function personalnotesActions($ngRedux) {
  let actionCreator = {
    all, clear, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

personalnotesActions.$inject = ['$ngRedux'];