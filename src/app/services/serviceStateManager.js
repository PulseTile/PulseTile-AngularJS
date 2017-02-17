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

class ServiceStateManager {
    constructor (serviceRequests, $rootScope, $state) {
        this.state = '';

        this.tableSettings = {
          order: '',
          reverse: false,
          currentPage: 1
        };
        this.filter = {
          isOpen: false,
          query: ''
        };

        this.getFilter = function () {
          this.checkChangeState();

          return this.filter;
        };

        this.setFilter = function (filter) {
          if (typeof filter === "undefined") return;

          if (filter.isOpen) {
            this.filter.isOpen = filter.isOpen;
          }
          if (filter.query) {
            this.filter.query = filter.query;
          }
        };

        this.getTableSettings = function () {
          this.checkChangeState();

          return this.tableSettings;
        };

        this.setTableSettings = function (tableSettings) {
          if (typeof tableSettings === "undefined") return;

          if (tableSettings.order) {
            this.tableSettings.order = tableSettings.order;
          }
          if (tableSettings.reverse) {
            this.tableSettings.reverse = tableSettings.reverse;
          }
          if (tableSettings.currentPage) {
            this.tableSettings.currentPage = tableSettings.currentPage;
          }
        };

        this.clearData = function () {
          this.tableSettings = {
            order: '',
            reverse: false,
            currentPage: 1
          };
          this.filter = {
            isOpen: false,
            query: ''
          };
        };

        this.checkChangeState = function () {
          var nameState = $state.router.globals.$current.name.replace(/-(detail|create)/, '');
          if (this.state !== nameState) {
            this.state = nameState;
            this.clearData();
          }
        };

        $rootScope.$on('$locationChangeStart', function(e) {
          this.checkChangeState();
        }.bind(this));
    }
}

ServiceStateManager.$inject = ['serviceRequests','$rootScope', '$state'];
export default ServiceStateManager;