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
let templateEventsList = require('./events-list.html');

class EventsListController {
  constructor($scope, $state, $stateParams, $ngRedux, eventsActions, serviceRequests, usSpinnerService, serviceFormatted, $timeout) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentStateName = $state.router.globals.$current.name;
    this.isShowExpandBtn = this.currentStateName !== 'events';
    this.partsStateName = this.currentStateName.split('-');

    // $scope.sliderRange = {
    //     minValue: 10,
    //     maxValue: 90,
    //     options: {
    //         floor: 0,
    //         ceil: 100,
    //         step: 1,
    //         minRange: 10,
    //         maxRange: 50
    //     }
    // };

    $scope.sliderRange;
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
    //   console.dir('updateScrollbar');
    //   console.dir(updateScrollbar);
    // }, 1000);

    this.isActiveCreate = function (typeCreate) {
      return this.partsStateName[this.partsStateName.length - 1] === typeCreate;
    };

    this.create = function (typeCreate) {
      if (typeof typeCreate !== "undefined") {
        console.log('events-create-' + typeCreate);
        $state.go('events-create-' + typeCreate, {
          patientId: $stateParams.patientId
        });
      }
    };

    this.go = function (id, source) {
      $state.go('events-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };
    $scope.$watch($scope.sliderRange, function(value) {
          console.log('$scope.sliderRange');
          console.log($scope.sliderRange);
        });
    this.setCurrentPageData = function (data) {
      if (data.events.data) {
        this.events = data.events.data;
        
        usSpinnerService.stop('patientSummary-spinner');

        this.eventsTimeline = this.modificateEventsArr(this.events);
        this.eventsFilterSteps = this.getFilterArray(this.events);
        serviceFormatted.formattingTablesDate(this.eventsFilterSteps, ['value', 'legend'], serviceFormatted.formatCollection.DDMMMYYYY);

        serviceFormatted.formattingTablesDate(this.events, ['date'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['name', 'type', 'date'];

        $scope.sliderRange = {
          minValue: this.eventsFilterSteps[0].value,
          maxValue: this.eventsFilterSteps[this.eventsFilterSteps.length - 1].value,
          options: {
            floor: this.eventsFilterSteps[0].value,
            ceil: this.eventsFilterSteps[this.eventsFilterSteps.length - 1].value,
            step: 100000,
            showTicks: true,
            showTicksValues: false,
            stepsArray: this.eventsFilterSteps
          }
        };
      }

      // this.eventsTimeline = this.modificateEventsArr(this.events);

      // serviceFormatted.formattingTablesDate(this.events, ['date'], serviceFormatted.formatCollection.DDMMMYYYY);
      // serviceFormatted.filteringKeys = ['name', 'type', 'date'];

      // usSpinnerService.stop('patientSummary-spinner');
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };
    this.getFilterArray = function (arr) {
      let _ = require('underscore');
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
                label: +(el.dateOfAppointment)
              }
              if (index % Math.round(arr.length / countLabel) === 0 ||
                  index === arr.length - 1) {

                newEl.legend = +el.dateOfAppointment;
              }
              
              return newEl;
            })
            .value();
            console.log('arr');
            console.log(arr);
      return arr;
    };
    this.modificateEventsArr = function (arr) {
      let _ = require('underscore');
      
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

EventsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eventsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted', '$timeout'];
export default EventsListComponent;