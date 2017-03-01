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
    types: [types.CLINICALSTATEMENTS, types.CLINICALSTATEMENTS_SUCCESS, types.CLINICALSTATEMENTS_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/clinicalStatements'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.CLINICALSTATEMENTS_GET, types.CLINICALSTATEMENTS_GET_SUCCESS, types.CLINICALSTATEMENTS_GET_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/clinicalStatements/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.CLINICALSTATEMENTS_CREATE, types.CLINICALSTATEMENTS_CREATE_SUCCESS, types.CLINICALSTATEMENTS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/clinicalStatements',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.CLINICALSTATEMENTS_UPDATE, types.CLINICALSTATEMENTS_UPDATE_SUCCESS, types.CLINICALSTATEMENTS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/clinicalStatements',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function query(prefix='', tag='') {
  let queryString = [];
  if(tag) {    queryString.push('tag=' + encodeURIComponent(tag)); }
  if(prefix) { queryString.push('prefix=' + encodeURIComponent(prefix));}
  return {
    types: [types.CLINICALSTATEMENTS_QUERY, types.CLINICALSTATEMENTS_QUERY_SUCCESS, types.CLINICALSTATEMENTS_QUERY_ERROR],
    
    config: {
      method: 'get',
      url: '/api-clinicalContent/phrases?' + queryString.join('&')
    },

    meta: {
      timestamp: Date.now()
    }
  }
}

export default function clinicalstatementsActions($ngRedux) {
  let actionCreator = {
    all, get, create, update, query
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

clinicalstatementsActions.$inject = ['$ngRedux'];