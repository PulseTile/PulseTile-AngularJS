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
import * as types from '../../../constants/ActionTypes';

export function allStudies(patientId) {
  return {
    types: [types.STUDIES, types.STUDIES_SUCCESS, types.STUDIES_ERROR],

    shouldCallAPI: (state) => !state.studies.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/dicom/studies'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function getAllSeriesInStudy(patientId, studyId, source) {
  return {
    types: [types.SERIES_GET, types.SERIES_GET_SUCCESS, types.SERIES_GET_ERROR],

    shouldCallAPI: (state) => !state.series.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/instances/' + studyId + '/series' + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function getSeriesDetails(patientId, seriesId, source) {
  return {
    types: [types.SERIES_DETAILS_GET, types.SERIES_DETAILS_GET_SUCCESS, types.SERIES_DETAILS_GET_ERROR],

    shouldCallAPI: (state) => !state.seriesDetails.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/instances/' + seriesId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function getInstanceId(patientId, seriesId, source) {
  return {
    types: [types.INSTANCE_ID_GET, types.INSTANCE_ID_GET_SUCCESS, types.INSTANCE_ID_GET_ERROR],

    shouldCallAPI: (state) => !state.instanceIdGet.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/instances/' + seriesId + '/instance' + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function getInstance(patientId, instanceId, source) {
  return {
    types: [types.INSTANCE_GET, types.INSTANCE_GET_SUCCESS, types.INSTANCE_GET_ERROR],

    shouldCallAPI: (state) => !state.instance.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/instances/' + instanceId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function imageActions($ngRedux) {
  let actionCreator = {
    allStudies, getAllSeriesInStudy, getSeriesDetails, getInstanceId, getInstance
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

imageActions.$inject = ['$ngRedux'];