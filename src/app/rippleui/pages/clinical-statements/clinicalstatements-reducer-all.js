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
import * as types from '../../../constants/ActionTypes';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  searchData: null,
  data: null,
  dataGet: null,
  dataCreate: null,
  dataUpdate: null,
  dataTags: null
};

export default function clinicalstatements(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [types.CLINICALSTATEMENTS]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.CLINICALSTATEMENTS_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        data: payload.response
      });
    },
    [types.CLINICALSTATEMENTS_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.CLINICALSTATEMENTS_GET]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.CLINICALSTATEMENTS_GET_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataGet: payload.response
      });
    },
    [types.CLINICALSTATEMENTS_GET_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.CLINICALSTATEMENTS_TAGS]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.CLINICALSTATEMENTS_TAGS_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataTags: payload.response
      });
    },
    [types.CLINICALSTATEMENTS_TAGS_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.CLINICALSTATEMENTS_CREATE]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.CLINICALSTATEMENTS_CREATE_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataCreate: payload.response
      });
    },
    [types.CLINICALSTATEMENTS_CREATE_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.CLINICALSTATEMENTS_UPDATE]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.CLINICALSTATEMENTS_UPDATE_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataUpdate: payload.response
      });
    },
    [types.CLINICALSTATEMENTS_UPDATE_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.CLINICALSTATEMENTS_QUERY]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        searchData: null
      })
    },
    [types.CLINICALSTATEMENTS_QUERY_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        searchData: payload.response
      })
    },
    [types.CLINICALSTATEMENTS_QUERY_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error,
        searchData: null
      })
    },
  };

  return actions[action.type] ?
    actions[action.type](state) :
    state;
}