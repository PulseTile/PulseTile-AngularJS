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

export function findAllDocuments(patientId) {
  return {
    types: [types.DOCUMENTS, types.DOCUMENTS_SUCCESS, types.DOCUMENTS_ERROR],

    shouldCallAPI: (state) => !state.documents.response,

    config: {
      method: 'get',
      url: '/api/documents/patient/' + patientId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function findReferral(patientId, referralId, source) {
  return {
    types: [types.DOCUMENTS_FIND_REFERRAL, types.DOCUMENTS_FIND_REFERRAL_SUCCESS, types.DOCUMENTS_FIND_REFERRAL_ERROR],

    shouldCallAPI: (state) => !state.documents.response,

    config: {
      method: 'get',
      url: '/api/documents/patient/' + patientId + '/' + referralId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function findDischarge(patientId, dischargeId, source) {
  return {
    types: [types.DOCUMENTS_FIND_DISCHARGE, types.DOCUMENTS_FIND_DISCHARGE_SUCCESS, types.DOCUMENTS_FIND_DISCHARGE_ERROR],

    shouldCallAPI: (state) => !state.documents.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/documents/discharge/' + dischargeId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function uploadReferral(patientId, referral) {
  return {
    types: [types.DOCUMENTS_UPLOAD_REFERRAL, types.DOCUMENTS_UPLOAD_REFERRAL_SUCCESS, types.DOCUMENTS_UPLOAD_REFERRAL_ERROR],

    shouldCallAPI: (state) => !state.documents.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/documents/referral',
      data: referral
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function uploadDischarge(patientId, discharge) {
  return {
    types: [types.DOCUMENTS_UPLOAD_DISCHARGE, types.DOCUMENTS_UPLOAD_DISCHARGE_SUCCESS, types.DOCUMENTS_UPLOAD_DISCHARGE_ERROR],

    shouldCallAPI: (state) => !state.documents.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/documents/discharge',
      data: discharge
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function documentsActions($ngRedux) {
  let actionCreator = {
    findAllDocuments, findReferral, findDischarge, uploadReferral, uploadDischarge
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

documentsActions.$inject = ['$ngRedux'];