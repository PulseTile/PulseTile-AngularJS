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
    types: [types.ORDERS, types.ORDERS_SUCCESS, types.ORDERS_ERROR],

    shouldCallAPI: (state) => !state.orders.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/laborders'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.ORDERS_GET, types.ORDERS_GET_SUCCESS, types.ORDERS_GET_ERROR],

    shouldCallAPI: (state) => !state.orders.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/laborders/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.ORDERS_CREATE, types.ORDERS_CREATE_SUCCESS, types.ORDERS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.orders.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/laborders', composition,
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function suggestion(patientId, composition) {
  return {
    types: [types.ORDERS_SUGGESTION, types.ORDERS_SUGGESTION_SUCCESS, types.ORDERS_SUGGESTION_ERROR],

    shouldCallAPI: (state) => !state.orders.response,

    config: {
      method: 'get',
      url: '/api/terminology/list/order'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function ordersActions($ngRedux) {
  let actionCreator = {
    all, get, create, suggestion
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

ordersActions.$inject = ['$ngRedux'];