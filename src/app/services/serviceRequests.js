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
let _ = require('lodash');

class ServiceRequests {

    constructor ($http) {
        this.evCache = {};
        this.cbCache = {};
        this.debug = false;
        this.currentUserData = {};
        this.currentSort = {
          order: '',
          reverse: false
        };
        this.filter = '';
    
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

        this.initialise = function() {
            var options = {
                method: 'GET',
                url: '/api/initialise',
                dataType: 'json'
            };
            return $http(options);
        };
        
        this.login = function() {
            var options = {
                method: 'GET',
                url: '/api/user'
            };
            return $http(options);
        };
    }
}

ServiceRequests.$inject = ['$http'];
export default ServiceRequests;