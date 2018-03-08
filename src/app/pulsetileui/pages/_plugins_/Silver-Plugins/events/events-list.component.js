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
let templateEventsList = require('./events-list.html');

class EventsListController {
  constructor($scope, $state, $stateParams, $ngRedux, eventsActions, serviceRequests, usSpinnerService, serviceFormatted, $timeout, serviceStateManager) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    eventsActions.clear();
    this.actionLoadList = eventsActions.all;

    var filterTimelineData = serviceStateManager.getFilterTimeline();

    let _ = require('underscore');

    this.currentStateName = $state.router.globals.$current.name;
    this.isShowExpandBtn = this.currentStateName !== 'events';
    this.partsStateName = this.currentStateName.split('-');

    $scope.isFilterTimelineOpen = filterTimelineData.isOpen;
    $scope.sliderRange;
    $scope.eventsFiltering = [];
    $scope.eventsTimeline = [];

    /* istanbul ignore next */
    $scope.toggleFilterTimeline = function () {
      $scope.isFilterTimelineOpen = !$scope.isFilterTimelineOpen;
      serviceStateManager.setFilterTimeline({
      });
    };
    
    /* istanbul ignore next */
    $scope.saveFilterTimelineParams = function () {
      serviceStateManager.setFilterTimeline({
        isOpen: $scope.isFilterTimelineOpen,
        rangeMin: $scope.sliderRange.minValue,
        rangeMax: $scope.sliderRange.maxValue,
      });
    };

    /* istanbul ignore next */
    $scope.refreshSlider = function () {
        $timeout(function () {
            $scope.$broadcast('rzSliderForceRender');
        });
    };

    $scope.configScrollbar = {
      // setHeight: 200,
      // setTop: 100,
      mouseWheel:{ enable: true },
      contentTouchScroll: 50,
      documentTouchScroll: true,
      // theme: 'light'
      
    }
    // $timeout(function() {
    //   this.updateScrollbar('scrollTo', 100{
    //       scrollInertia: 0
    //   });
    // }, 1000);

    /* istanbul ignore next */
    this.isActiveCreate = function (typeCreate) {
      return this.partsStateName[this.partsStateName.length - 1] === typeCreate;
    };

    /* istanbul ignore next */
    this.create = function (typeCreate) {
      /* istanbul ignore if  */
      if (typeof typeCreate !== "undefined") {
        $scope.saveFilterTimelineParams();

        $state.go('events-create-' + typeCreate, {
          patientId: $stateParams.patientId
        });
      }
    };

    /* istanbul ignore next */
    this.go = function (id, source) {
      $scope.saveFilterTimelineParams()
      $state.go('events-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };

    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      /* istanbul ignore if  */
      const state = store.events;
      const pagesInfo = store.pagesInfo;
      const pluginName = 'events';

      if (serviceRequests.checkIsCanLoadingListData(state, pagesInfo, pluginName, $stateParams.patientId)) {
        this.actionLoadList($stateParams.patientId);
        serviceRequests.setPluginPage(pluginName);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        this.events = state.data;

        serviceFormatted.filteringKeys = ['name', 'type', 'dateTime'];

        this.eventsFilterSteps = $scope.getFilterArray(this.events);
        serviceFormatted.formattingTablesDate(this.eventsFilterSteps, ['value'], serviceFormatted.formatCollection.DDMMMMYYYY);

        $scope.sliderRange = {
          minValue: filterTimelineData.rangeMin ? filterTimelineData.rangeMin : this.eventsFilterSteps[0].value,
          maxValue: filterTimelineData.rangeMax ? filterTimelineData.rangeMax : this.eventsFilterSteps[this.eventsFilterSteps.length - 1].value,
          options: {
            floor: this.eventsFilterSteps[0].value,
            ceil: this.eventsFilterSteps[this.eventsFilterSteps.length - 1].value,
            step: 100000,
            showTicks: true,
            showTicksValues: false,
            stepsArray: this.eventsFilterSteps
          }
        };

        $scope.formCollectionsEvents(this.events);
      }
      if (state.data || state.error) {
        usSpinnerService.stop('list-spinner');
        setTimeout(() => { usSpinnerService.stop('list-spinner') }, 0);
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };
    
    /* istanbul ignore next */
    $scope.formCollectionsEvents = function (events) {
      $scope.eventsFiltering = $scope.filterEventsRange(events);
      $scope.eventsTimeline = $scope.modificateEventsArr($scope.eventsFiltering);

      serviceFormatted.formattingTablesDate($scope.eventsFiltering, ['dateTime'], serviceFormatted.formatCollection.DDMMMYYYY);
    };

    /* istanbul ignore next */
    $scope.filterEvents = function (collection, filterBy, filterKeys) {
      return collection.filter((item) => {
          let str = '';

          filterKeys.forEach((key) => {
            str += item[key] ? item[key].toString().toLowerCase() + ' ' : '';
          });

          return str.indexOf(filterBy.toLowerCase() || '') !== -1;
        })
    };

    /* istanbul ignore next */
    $scope.filterEventsRange = function (events) {
      var newEvents = [];
      var minRange, maxRange;
      if ($scope.isFilterTimelineOpen) {
        minRange = Date.parse($scope.sliderRange.minValue);
        maxRange = Date.parse($scope.sliderRange.maxValue)  + (24 * 60 * 60 * 1000) - 1;
        if (minRange && maxRange) {
          newEvents = _.chain(events)
              .filter(function (el, index, arr) {
                var dateInSecongs = Date.parse(new Date(el.dateTime));

                return (minRange <= dateInSecongs && dateInSecongs <= maxRange);
              })
              .value();
        }
        
        return newEvents;
      }

      return events;
    };

    /* istanbul ignore next */
    $scope.getFilterArray = function (arr) {
      var countLabel = 3;

      arr = _.chain(arr)
            .filter(function (el) {
              return el.dateTime;
            })
            .uniq(function (el) {
              return el.dateTime;
            })
            .sortBy(function (el) {
              return el.dateTime;
            })
            .map(function (el, index, arr) {
              var newEl = {
                value: +(el.dateTime),
              }
              if (index % Math.round(arr.length / countLabel) === 0 ||
                  index === arr.length - 1) {

                newEl.legend = serviceFormatted.formattingDate(el.dateTime, serviceFormatted.formatCollection.DDMMMYYYYHHmm);;
              }
              
              return newEl;
            })
            .value();

      return arr;
    };

    /* istanbul ignore next */
    $scope.modificateEventsArr = function (arr) {
      arr = _.chain(arr)
            .sortBy(function (value) {
              return value.dateTime;
            })
            .reverse()
            .each(function (value, index) {
              if (index % 2) {
                value['sideDateInTimeline'] = 'right';
              } else {
                value['sideDateInTimeline'] = 'left';
              }
            })
            .groupBy(function(value) {
              return value.dateTime;
            })
            .value();

      return arr;
    };

    $scope.$watch('sliderRange.minValue', function() {
      if (this.events) {
        $scope.formCollectionsEvents(this.events);
      }
    }.bind(this));
    $scope.$watch('sliderRange.maxValue', function() {
      if (this.events) {
        $scope.formCollectionsEvents(this.events);
      }
    }.bind(this));
    $scope.$watch('isFilterTimelineOpen', function() {
      if (this.events) {
        $scope.formCollectionsEvents(this.events);
      }
    }.bind(this));

    $scope.$watch('queryFilter', function(queryFilterValue) {
      if (this.events) {
        this.events.map(function (el) {
          el['dateTimeConvert'] = serviceFormatted.formattingDate(el['dateTime'], serviceFormatted.formatCollection.DDMMMYYYYHHmm);
        });

        $scope.formCollectionsEvents($scope.filterEvents(this.events, queryFilterValue, ['name', 'type', 'dateTimeConvert']));
      }
    }.bind(this));

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const EventsListComponent = {
  template: templateEventsList,
  controller: EventsListController
};

EventsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eventsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted', '$timeout', 'serviceStateManager'];
export default EventsListComponent;