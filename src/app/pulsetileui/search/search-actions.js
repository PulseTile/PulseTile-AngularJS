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
import { bindActionCreators } from 'redux';
import * as types from '../../constants/ActionTypes';

export function advancedSearch(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.SEARCH, types.SEARCH_SUCCESS, types.SEARCH_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.advancedSearch,

        // Configure $http
        config: {
            method: 'post',
            url: `api/patients/advancedSearch`,
            data: queryParams
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export function querySearch(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.SEARCH, types.SEARCH_SUCCESS, types.SEARCH_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.advancedSearch,

        // Configure $http
        config: {
            method: 'post',
            url: `api/patients/querySearch`,
            data: queryParams
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export default function searchActions($ngRedux) {
    let actionCreator = {
        advancedSearch, querySearch
    };

    return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

searchActions.$inject = ['$ngRedux'];