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
    this.filterTimeline = {
      isOpen: false,
      rangeMin: '',
      rangeMax: ''
    };
    this.viewsSettings = {
      activeView: ''
    };

    /* istanbul ignore next */
    this.getFilter = function () {
      this.checkChangeState();

      return this.filter;
    };

    /* istanbul ignore next */
    this.setFilter = function (filter) {
      if (typeof filter === "undefined") return;

        if (filter.isOpen) {
            this.filter.isOpen = filter.isOpen;
        } else {
            this.filter.isOpen = filter.isOpen;
        }
        if (filter.query) {
            this.filter.query = filter.query;
        } else {
            this.filter.query = '';
        }
    };

    /* istanbul ignore next */
    this.getFilterTimeline = function () {
      this.checkChangeState();

      return this.filterTimeline;
    };

    /* istanbul ignore next */
    this.setFilterTimeline = function (filterTimeline) {
      if (typeof filterTimeline === "undefined") return;

      if (filterTimeline.isOpen) {
        this.filterTimeline.isOpen = filterTimeline.isOpen;
      }
      if (filterTimeline.rangeMin) {
        this.filterTimeline.rangeMin = filterTimeline.rangeMin;
      }
      if (filterTimeline.rangeMax) {
        this.filterTimeline.rangeMax = filterTimeline.rangeMax;
      }
    };

    /* istanbul ignore next */
    this.getTableSettings = function () {
      this.checkChangeState();

      return this.tableSettings;
    };

    /* istanbul ignore next */
    this.setTableSettings = function (tableSettings) {
      if (typeof tableSettings === "undefined") return;
      /* istanbul ignore if */

      if (tableSettings.order !== undefined) {
        this.tableSettings.order = tableSettings.order;
      }
      if (tableSettings.reverse !== undefined) {
        this.tableSettings.reverse = tableSettings.reverse;
      }
      if (tableSettings.currentPage !== undefined) {
        this.tableSettings.currentPage = tableSettings.currentPage;
      }
    };

    /* istanbul ignore next */
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
      this.filterTimeline = {
        isOpen: false,
        rangeMin: '',
        rangeMax: ''
      };
      this.viewsSettings = {
        activeView: ''
      };
    };

    /* istanbul ignore next */
    this.getViewsSettings = function () {
      this.checkChangeState();

      return this.viewsSettings;
    };

    /* istanbul ignore next */
    this.setViewsSettings = function (viewSettings) {
      if (typeof viewSettings === "undefined") return;

      /* istanbul ignore if */
      if (viewSettings.activeView) {
        this.viewsSettings.activeView = viewSettings.activeView;
      }
    };

    /* istanbul ignore next */
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