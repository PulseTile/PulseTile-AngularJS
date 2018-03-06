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
  return { type: types.DOCUMENTS__CLEAR }
}
export function all(patientId) {
  return {
    types: [types.DOCUMENTS, types.DOCUMENTS_SUCCESS, types.DOCUMENTS_ERROR],

    shouldCallAPI: (state) => !state.documents.response,

    config: {
      method: 'get',
      url: '/api/documents/patient/' + patientId
    },

    meta: {
      patientId: patientId,
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.DOCUMENTS_GET, types.DOCUMENTS_GET_SUCCESS, types.DOCUMENTS_GET_ERROR],

    shouldCallAPI: (state) => !state.documents.response,

    config: {
      method: 'get',
      url: '/api/documents/patient/' + patientId + '/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function documentsActions($ngRedux) {
  let actionCreator = {
    all, clear, get
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

documentsActions.$inject = ['$ngRedux'];