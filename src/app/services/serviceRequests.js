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
import { httpSetTokenToCookie } from '../helpers/httpMiddleware';
let _ = require('lodash');

class ServiceRequests {

  constructor ($http, pagesActions) {
    this.evCache = {};
    this.cbCache = {};
    this.debug = false;
    this.currentUserData = {};

    /* istanbul ignore next */
    this.publisher = function(eventName, data) {
      if (this.debug) { console.log('PUBLISH', eventName, data); }

      this.evCache[eventName] = this.evCache[eventName] || {
        cache: undefined,
        uids: []
      };

      _.forEach(this.evCache[eventName].uids, function (uid) {
        this.cbCache[uid].fn(data, this.evCache[eventName].cache)
      }.bind(this));

      this.evCache[eventName].cache = data;
    };

    /* istanbul ignore next */
    this.subscriber = function(eventName, callback) {
      if (this.debug) { console.log('SUBSCRIBE', eventName, callback); }

      if (!(eventName && callback)) {
        throw new Error();
      }

      var uid = _.uniqueId(eventName);

      this.evCache[eventName] = this.evCache[eventName] || {
          cache: undefined,
          uids: []
        };
      this.evCache[eventName].uids.push(uid);
      this.cbCache[uid] = {fn: callback, eventName: eventName};

      return uid;
    };

    /* istanbul ignore next */
    this.initialise = function() {
      var options = {
        method: 'GET',
        url: '/api/initialise',
        dataType: 'json'
      };
      return $http(options).then(response => {
        httpSetTokenToCookie(response.data);
        return response;
      });
    };

    /* istanbul ignore next */
    this.login = function() {
      var options = {
        method: 'GET',
        url: '/api/user'
      };
      return $http(options).then(response => {
        httpSetTokenToCookie(response.data);
        return response;
      });
    };

    /* istanbul ignore next */
    this.setAppTheme = function(data) {
      var options = {
        method: 'POST',
        url: '/api/application',
        data: data
      };
      return $http(options).then(response => {
        httpSetTokenToCookie(response.data);
        return response;
      });
    };

    /* istanbul ignore next */
    this.getAppSettings = function() {
      var options = {
        method: 'GET',
        url: '/api/application'
      };
      return $http(options).then(response => {
        httpSetTokenToCookie(response.data);
        return response;
      });
    };

    /* istanbul ignore next */
    this.checkIsNotCurrentPage = function(pages, pageName) {
      return !pages.currentPlugin || pages.currentPlugin !== pageName;
    };

    /* istanbul ignore next */
    this.checkIsCanLoadingListData = function(state, pages, pluginName, patientId) {
      // List of Plugin can loading
      // if (list isn't loaded OR user just switched to the plugin OR user changed patient)
      // AND list does not load now
      // AND no error occurred while loading
      return (!state.data ||
              this.checkIsNotCurrentPage(pages, pluginName) ||
              state.patientId !== patientId)
          && !state.isFetching
          && !state.error;
    };

    /* istanbul ignore next */
    this.setPluginPage = function (pluginName) {
      pagesActions.changePlugin(pluginName);
    };
  }
}

ServiceRequests.$inject = ['$http', 'pagesActions'];
export default ServiceRequests;