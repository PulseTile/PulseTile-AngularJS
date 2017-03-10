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
  constructor($scope, $state, $stateParams, $ngRedux, eventsActions, serviceRequests, usSpinnerService, serviceFormatted, $rootScope) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'events-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'events';
    
    $scope.viewList;

    this.create = function () {
      $state.go('events-create', {
        patientId: $stateParams.patientId
      });
    };

    this.go = function (id, source) {
      serviceRequests.viewList = $scope.viewList;
      $state.go('events-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };

    $scope.isViewList = function (viewName) {
      return $scope.viewList === viewName;
    };

    $scope.changeViewList = function (viewName) {
      var currentPage = this.currentPage || 1;
      var vitalsForChart;
      $scope.viewList = viewName;
    }.bind(this);
    
    this.setCurrentPageData = function (data) {
      if (data.events.data) {
        this.events = data.events.data;
        console.log('this.events');
        console.log(this.events);
        usSpinnerService.stop('patientSummary-spinner');
        this.eventsTimeline = this.modificateEventsArr(this.events);

        serviceFormatted.formattingTablesDate(this.events, ['date'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['name', 'type', 'date'];

      }
      // var date = new Date();
      // this.events = [
      //   {
      //     sourceId: '1',
      //     name: 'Event 1',
      //     type: 'Discharge',
      //     note: 'Very important event 1',
      //     date: Date.parse(new Date()),
      //     author: 'ripple_osi',
      //     dateCreate: Date.parse(new Date()),
      //     source: 'Marand',
      //     timeSlot: 'Discharge',
      //     status: 'Scheduled'
      //   }, {
      //     sourceId: '2',
      //     name: 'Event 2',
      //     type: 'Transfer',
      //     note: 'Very important event 2',
      //     date: Date.parse(new Date(date.setDate(date.getDate()-1))),
      //     author: 'ripple_osi',
      //     dateCreate: Date.parse(new Date(date.setDate(date.getDate()-1))),
      //     source: 'EtherCIS',
      //     timeSlot: 'Transfer',
      //     status: 'Scheduled'
      //   }, {
      //     sourceId: '3',
      //     name: 'Meeting 1',
      //     type: 'Admission',
      //     note: 'Very important meeting 1',
      //     date: Date.parse(new Date(date.setDate(date.getDate()-7))),
      //     author: 'ripple_osi',
      //     dateCreate: Date.parse(new Date(date.setDate(date.getDate()-7))),
      //     source: 'Marand',
      //     timeSlot: 'Admission',
      //     status: 'Scheduled'
      //   }, {
      //     sourceId: '4',
      //     name: 'Event 3',
      //     type: 'Appointment',
      //     note: 'Very important event 3',
      //     date: Date.parse(new Date(date.setDate(date.getDate()-30))),
      //     author: 'ripple_osi',
      //     dateCreate: Date.parse(new Date(date.setDate(date.getDate()-30))),
      //     source: 'Marand',
      //     location: 'Leeds General',
      //     timeSlot: 'Appointment',
      //     status: 'Scheduled'
      //   }, {
      //     sourceId: '5',
      //     name: 'Meeting 2',
      //     type: 'Admission',
      //     note: 'Very important meeting 2',
      //     date: Date.parse(new Date(date.setDate(date.getDate()-1))),
      //     author: 'ripple_osi',
      //     dateCreate: Date.parse(new Date(date.setDate(date.getDate()-1))),
      //     source: 'Marand',
      //     timeSlot: 'Admission',
      //     status: 'Scheduled'
      //   }
      // ];

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

      $scope.changeViewList(serviceRequests.viewList || 'timeline');
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

      // console.log('EventsArr');
      // console.log(arr);
      return arr;
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    this.eventsLoad = eventsActions.all;
    this.eventsLoad($stateParams.patientId);

    // (function($){
    //   $(window).on("load",function(){
    //     $(".timeline-content-scroll").mCustomScrollbar({
    //       theme:"dark"
    //     });
    //     $rootScope.$on('$locationChangeStart', function(e) {
    //       $(".timeline-content-scroll").mCustomScrollbar({
    //         theme:"dark"
    //       });
    //     });
    //   });
    // })(jQuery);
  }
}

const EventsListComponent = {
  template: templateEventsList,
  controller: EventsListController
};

EventsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eventsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted', '$rootScope'];
export default EventsListComponent;