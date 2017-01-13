import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.GENERICMDT, types.GENERICMDT_SUCCESS, types.GENERICMDT_ERROR],

    shouldCallAPI: (state) => !state.genericmdt.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/mdtreports/'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.GENERICMDT_GET, types.GENERICMDT_GET_SUCCESS, types.GENERICMDT_GET_ERROR],

    shouldCallAPI: (state) => !state.genericmdt.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/mdtreports/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.GENERICMDT_CREATE, types.GENERICMDT_CREATE_SUCCESS, types.GENERICMDT_CREATE_ERROR],

    shouldCallAPI: (state) => !state.genericmdt.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/mdtreports',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.GENERICMDT_UPDATE, types.GENERICMDT_UPDATE_SUCCESS, types.GENERICMDT_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.genericmdt.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/mdtreports',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function genericmdtActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

genericmdtActions.$inject = ['$ngRedux'];