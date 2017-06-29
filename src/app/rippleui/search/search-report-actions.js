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
import * as types from '../../constants/ActionTypes';

export function getTable(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.SEARCH, types.SEARCH_SUCCESS, types.SEARCH_ERROR],
    
        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patientDetails,
    
        // Configure $http
        config: {
            method: 'post',
            url: `/api/search/reports/table`,
            data: queryParams
        },
    
        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export function getSettingsTable(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.SEARCH, types.SEARCH_SUCCESS, types.SEARCH_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patientDetails,

        // Configure $http
        config: {
            method: 'post',
            url: '/api/search/setting/table',
            data: queryParams
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export function getChart(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.CHART, types.CHART_SUCCESS, types.CHART_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patientDetails,

        // Configure $http
        config: {
            method: 'post',
            url: '/api/search/reports/chart',
            data: queryParams
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export function searchByPatient(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.SEARCH, types.SEARCH_SUCCESS, types.SEARCH_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patientDetails,

        // Configure $http
        config: {
            method: 'post',
            url: '/api/search/patient/table',
            data: queryParams
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export default function searchReport($ngRedux) {
    let actionCreator = {
        getChart,
        getTable,
        getSettingsTable,
        searchByPatient
    };

    return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

searchReport.$inject = ['$ngRedux'];