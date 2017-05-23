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

export function loadPatients() {
    return {
        // Types of actions to emit before and after
        types: [types.PATIENTS, types.PATIENTS_SUCCESS, types.PATIENTS_ERROR],
    
        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patients.response,
    
        // Configure $http
        config: {
            method: 'get',
            url: `api/patients`
        },
    
        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export function getPatient(id) {
    return {
        // Types of actions to emit before and after
        types: [types.PATIENTS_GET, types.PATIENTS_GET_SUCCESS, types.PATIENTS_GET_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patientsGet.response,

        // Configure $http
        config: {
            method: 'get',
            url: 'api/patients/' + id
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export default function patientsActions($ngRedux) {
    let actionCreator = {
        loadPatients,
        getPatient
    };

    return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

patientsActions.$inject = ['$ngRedux'];