import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.HEIGHTANDWEIGHT, types.HEIGHTANDWEIGHT_SUCCESS, types.HEIGHTANDWEIGHT_ERROR],

    shouldCallAPI: (state) => !state.heightAndWeight.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/heightAndWeight/'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.HEIGHTANDWEIGHT_GET, types.HEIGHTANDWEIGHT_GET_SUCCESS, types.HEIGHTANDWEIGHT_GET_ERROR],

    shouldCallAPI: (state) => !state.heightAndWeight.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/heightAndWeight/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.HEIGHTANDWEIGHT_CREATE, types.HEIGHTANDWEIGHT_CREATE_SUCCESS, types.HEIGHTANDWEIGHT_CREATE_ERROR],

    shouldCallAPI: (state) => !state.heightAndWeight.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/heightAndWeight',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.HEIGHTANDWEIGHT_UPDATE, types.HEIGHTANDWEIGHT_UPDATE_SUCCESS, types.HEIGHTANDWEIGHT_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.heightAndWeight.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/heightAndWeight',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function heightAndWeightActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

heightAndWeightActions.$inject = ['$ngRedux'];