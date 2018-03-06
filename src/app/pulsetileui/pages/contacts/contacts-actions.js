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
  return { type: types.CONTACTS__CLEAR }
}
export function all(patientId) {
  return {
    types: [types.CONTACTS, types.CONTACTS_SUCCESS, types.CONTACTS_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/contacts'
    },

    meta: {
      patientId: patientId,
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.CONTACTS_GET, types.CONTACTS_GET_SUCCESS, types.CONTACTS_GET_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/contacts/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.CONTACTS_CREATE, types.CONTACTS_CREATE_SUCCESS, types.CONTACTS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/contacts',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, sourceId, composition) {
  return {
    types: [types.CONTACTS_UPDATE, types.CONTACTS_UPDATE_SUCCESS, types.CONTACTS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/contacts/' + sourceId,
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function contactsActions($ngRedux) {
  let actionCreator = {
    all, clear, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

contactsActions.$inject = ['$ngRedux'];