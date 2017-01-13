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
import * as types from '../constants/ActionTypes';
import userTemp from '../helpers/userTemp';

const INITIAL_STATE = {
  error: false,
  data: null
};

export default function posts(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [types.USER_LOGIN]: (state) => {
      return Object.assign({}, state, {
        error: false
      });
    },
    [types.USER_LOGIN_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        data: payload.response
      });
    },
    [types.USER_LOGIN_ERROR]: (state) => {
      //part for debugging token
      // if (payload.error.data && payload.error.data.error && payload.error.data.error.token) {
      //   document.cookie = "JSESSIONID=" + payload.error.data.error.token;
      //   if (payload.error.data.error.reload) {
      //     location.reload();
      //   }
      // }
      return Object.assign({}, state, {
        error: payload.error,
        data: userTemp() //testing user
      });
    }
  };

  return actions[action.type] ?
      actions[action.type](state) :
      state;
}
