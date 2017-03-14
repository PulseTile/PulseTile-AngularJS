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
    types: [types.APPOINTMENTS, types.APPOINTMENTS_SUCCESS, types.APPOINTMENTS_ERROR],

    shouldCallAPI: (state) => !state.events.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/appointments'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.APPOINTMENTS_GET, types.APPOINTMENTS_GET_SUCCESS, types.APPOINTMENTS_GET_ERROR],

    shouldCallAPI: (state) => !state.events.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/appointments/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.APPOINTMENTS_CREATE, types.APPOINTMENTS_CREATE_SUCCESS, types.APPOINTMENTS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.events.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/appointments',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.APPOINTMENTS_UPDATE, types.APPOINTMENTS_UPDATE_SUCCESS, types.APPOINTMENTS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.events.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/appointments',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function eventsActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

eventsActions.$inject = ['$ngRedux'];