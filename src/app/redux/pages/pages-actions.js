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

/* istanbul ignore next */
export function changePlugin(pluginName) {
  return {
    type: types.PAGE_PLUGIN_CHANGE,
    payload: pluginName
  };
}

/* istanbul ignore next */
export default function pagesActions($ngRedux) {
  let actionCreator = { changePlugin };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

pagesActions.$inject = ['$ngRedux'];