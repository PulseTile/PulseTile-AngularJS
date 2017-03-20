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

class EventsTimelineListController {
  constructor($scope, $state, $stateParams, $ngRedux, eventsActions, serviceRequests, usSpinnerService, serviceFormatted, $timeout) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    let _ = require('underscore');

    this.currentStateName = $state.router.globals.$current.name;
    this.isShowExpandBtn = this.currentStateName !== 'events';
    this.partsStateName = this.currentStateName.split('-');

    $scope.sliderRange;
    this.events = [];
    $scope.eventsFiltering = [];
    $scope.eventsTimeline = [];
    $scope.eventsChronometry = [];

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

    this.setCurrentPageData = function (data) {
      if (data.events.data) {
        this.events = data.events.data;
      
        serviceFormatted.filteringKeys = ['name', 'type', 'date'];

        this.eventsFilterSteps = $scope.getFilterArray(this.events);
        serviceFormatted.formattingTablesDate(this.eventsFilterSteps, ['value', 'legend'], serviceFormatted.formatCollection.DDMMMYYYY);
        
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
      $scope.eventsChronometry = $scope.modificateEventsForChronometry($scope.eventsFiltering);

      serviceFormatted.formattingTablesDate($scope.eventsFiltering, ['date'], serviceFormatted.formatCollection.DDMMMYYYY);
    };
    $scope.filterEvents = function (events) {
      var newEvents = [];
      var minRange, maxRange;

      if ($scope.isFilterOpen) {
        minRange = Date.parse($scope.sliderRange.minValue);
        maxRange = Date.parse($scope.sliderRange.maxValue)  + (24 * 60 * 60 * 1000) - 1;
        if (minRange && maxRange) {
          newEvents = _.chain(events)
              .filter(function (el, index, arr) {
                var dateInSecongs = +el.dateOfAppointment;
                // console.log('el.dateOfAppointment --->', el.serviceTeam);
                // console.log('minRange ---> ', minRange);
                // console.log('dateInSecongs ---> ', dateInSecongs);
                // console.log('maxRange ---> ', maxRange);
                // console.log('---------------------------');
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

                newEl.legend = +el.dateOfAppointment;
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

    $scope.modificateEventsForChronometry = function (arr) {
      arr = _.chain(arr)
            .filter(function (el, index, arr) {
              return el.dateOfAppointment && el.serviceTeam.length;
            })
            .map(function (el, index) {
              var data = new Date(el.dateOfAppointment);
              return {
                  "media": {
                    "url": "",
                    "caption": "",
                    "credit": ""
                  },
                  "start_date": {
                    "month": data.getMonth(),
                    "day": data.getDate(),
                    "year": data.getYear()
                  },
                  "text": {
                    "headline": index + ') ' + el.serviceTeam,
                    "text": "Houston and Brown first meet at the Soul Train Music Awards. In an interview with Rolling Stone Magazine, Houston admitted that it was not love at first sight. She turned down Brown's first marriage proposal but eventually fell in love with him."
                  }
                }
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
    $scope.$watch('isFilterOpen', function() {
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



    // $scope.timelineData = {
    //     "title": {
    //         "media": {
    //           "url": "//www.flickr.com/photos/tm_10001/2310475988/",
    //           "caption": "Whitney Houston performing on her My Love is Your Love Tour in Hamburg.",
    //           "credit": "flickr/<a href='http://www.flickr.com/photos/tm_10001/'>tm_10001</a>"
    //         },
    //         "text": {
    //           "headline": "Whitney Houston<br/> 1963 - 2012",
    //           "text": "<p>Houston's voice caught the imagination of the world propelling her to superstardom at an early age becoming one of the most awarded performers of our time. This is a look into the amazing heights she achieved and her personal struggles with substance abuse and a tumultuous marriage.</p>"
    //         }
    //     },
    //     "events": $scope.eventsChronometry
    // }

    // angular.element(document).ready(function () {
    //   console.log('element(document)');
    //   window.timeline = new TL.Timeline('timeline-embed', $scope.timelineData);
    // });

    $scope.$watch('eventsChronometry', function() {
      if ($scope.eventsChronometry.length) {
        $scope.timelineData = {
            // "title": {
            //     "media": {
            //       "url": "//www.flickr.com/photos/tm_10001/2310475988/",
            //       "caption": "Whitney Houston performing on her My Love is Your Love Tour in Hamburg.",
            //       "credit": "flickr/<a href='http://www.flickr.com/photos/tm_10001/'>tm_10001</a>"
            //     },
            //     "text": {
            //       "headline": "Whitney Houston<br/> 1963 - 2012",
            //       "text": "<p>Houston's voice caught the imagination of the world propelling her to superstardom at an early age becoming one of the most awarded performers of our time. This is a look into the amazing heights she achieved and her personal struggles with substance abuse and a tumultuous marriage.</p>"
            //     }
            // },
            "events": $scope.eventsChronometry
        }
        window.timeline = new TL.Timeline('timeline-embed', $scope.timelineData);
      }
    }.bind(this));
    // $rootScope.$on('$locationChangeStart', function(e) {
    //   console.log('$locationChangeStart');
    //   window.timeline = new TL.Timeline('timeline-embed', $scope.timelineData);
    //   $scope.fullPanelClass = '';
    // });



  }
}

const EventsListComponent = {
  template: templateEventsList,
  controller: EventsTimelineListController
};

EventsTimelineListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eventsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted', '$timeout'];
export default EventsListComponent;