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
import * as types from '../constants/ActionTypes';

export function login() {
    return {
        // Types of actions to emit before and after
        types: [types.USER_LOGIN, types.USER_LOGIN_SUCCESS, types.USER_LOGIN_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patients.response,

        // Configure $http
        config: {
            method: 'get',
            url: '/api/user'
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export default function userActions($ngRedux) {
    let actionCreator = {
        login
    };

    return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

userActions.$inject = ['$ngRedux'];