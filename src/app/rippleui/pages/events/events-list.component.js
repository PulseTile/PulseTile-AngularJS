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
    var filterTimelineData = serviceStateManager.getFilterTimeline();

    let _ = require('underscore');

    this.currentStateName = $state.router.globals.$current.name;
    this.isShowExpandBtn = this.currentStateName !== 'events';
    this.partsStateName = this.currentStateName.split('-');

    $scope.isFilterTimelineOpen = filterTimelineData.isOpen;
    $scope.sliderRange;
    this.events = [];
    $scope.eventsFiltering = [];
    $scope.eventsTimeline = [];

    $scope.toggleFilterTimeline = function () {
      $scope.isFilterTimelineOpen = !$scope.isFilterTimelineOpen;
      serviceStateManager.setFilterTimeline({
      });
    };
    
    $scope.saveFilterTimelineParams = function () {
      serviceStateManager.setFilterTimeline({
        isOpen: $scope.isFilterTimelineOpen,
        rangeMin: $scope.sliderRange.minValue,
        rangeMax: $scope.sliderRange.maxValue,
      });
    };

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

    this.isActiveCreate = function (typeCreate) {
      return this.partsStateName[this.partsStateName.length - 1] === typeCreate;
    };

    this.create = function (typeCreate) {
      /* istanbul ignore if  */
      if (typeof typeCreate !== "undefined") {
        $scope.saveFilterTimelineParams();

        $state.go('events-create-' + typeCreate, {
          patientId: $stateParams.patientId
        });
      }
    };

    this.go = function (id, source) {
      $scope.saveFilterTimelineParams()
      $state.go('events-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };

    this.setCurrentPageData = function (data) {
      /* istanbul ignore if  */
      if (data.events.data) {
        this.events = data.events.data;
      
        serviceFormatted.filteringKeys = ['serviceTeam', 'type', 'dateOfAppointment'];

        this.eventsFilterSteps = $scope.getFilterArray(this.events);
        serviceFormatted.formattingTablesDate(this.eventsFilterSteps, ['value', 'legend'], serviceFormatted.formatCollection.DDMMMMYYYY);
        
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

        usSpinnerService.stop('patientSummary-spinner');
      }

      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };
    $scope.formCollectionsEvents = function (events) {
      $scope.eventsFiltering = $scope.filterEvents(events);
      $scope.eventsTimeline = $scope.modificateEventsArr($scope.eventsFiltering);

      serviceFormatted.formattingTablesDate($scope.eventsFiltering, ['dateOfAppointment'], serviceFormatted.formatCollection.DDMMMYYYY);
    };
    $scope.filterEvents = function (events) {
      var newEvents = [];
      var minRange, maxRange;
      if ($scope.isFilterTimelineOpen) {
        minRange = Date.parse($scope.sliderRange.minValue);
        maxRange = Date.parse($scope.sliderRange.maxValue)  + (24 * 60 * 60 * 1000) - 1;
        if (minRange && maxRange) {
          newEvents = _.chain(events)
              .filter(function (el, index, arr) {
                var dateInSecongs = Date.parse(new Date(el.dateOfAppointment));

                return (minRange <= dateInSecongs && dateInSecongs <= maxRange);
              })
              .value();
        }
        
        return newEvents;
      }

      return events;
    };
    $scope.getFilterArray = function (arr) {
      var countLabel = 3;

      arr = _.chain(arr)
            .filter(function (el, index, arr) {
              return el.dateOfAppointment;
            })
            .uniq(function (el) {
              return el.dateOfAppointment;
            })
            .sortBy(function (el) {
              return el.dateOfAppointment;
            })
            .map(function (el, index, arr) {
              var newEl = {
                value: +(el.dateOfAppointment),
              }
              if (index % Math.round(arr.length / countLabel) === 0 ||
                  index === arr.length - 1) {

                newEl.legend = el.dateOfAppointment;
              }
              
              return newEl;
            })
            .value();

      return arr;
    };
    $scope.modificateEventsArr = function (arr) {
      arr = _.chain(arr)
            .sortBy(function (value) {
              return value.dateOfAppointment;
            })
            .reverse()
            .each(function (value, index) {
              if (index % 2) {
                value['sideDateInTimeline'] = 'right';
              } else {
                value['sideDateInTimeline'] = 'left';
              }
              value.type = 'Appointment';
            })
            .groupBy(function(value) {
              return value.dateOfAppointment;
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

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    this.eventsLoad = eventsActions.all;
    this.eventsLoad($stateParams.patientId);

  }
}

const EventsListComponent = {
  template: templateEventsList,
  controller: EventsListController
};

EventsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eventsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted', '$timeout', 'serviceStateManager'];
export default EventsListComponent;