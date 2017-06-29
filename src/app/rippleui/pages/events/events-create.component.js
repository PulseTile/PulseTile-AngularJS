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
let templateEventsCreate = require('./events-create.html');

class EventsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, eventsActions, serviceRequests, ScheduleModal) {
    var currentStateName = $state.router.globals.$current.name;
    var partsCurrentStateName = currentStateName.split('-');
    this.typeCreate = partsCurrentStateName[partsCurrentStateName.length - 1];

    $scope.appointment = {
      dateCreated: new Date(),
      dateOfAppointment: "2017-02-10",
      location: "Leeds General",
      status: "Scheduled",
      timeOfAppointment: "2017-02-10T14:00:00.000Z"
    };

    $scope.event = {};
    $scope.event.dateCreated = new Date();
    $scope.event.source = 'Marand';
    $scope.event.isConnection = true;

    switch(this.typeCreate) {
      case 'appointment':
          $scope.event.type = 'Appointment';
          break;
      case 'admission':
          $scope.event.type = 'Admission';
          break;
      case 'transfer':
          $scope.event.type = 'Transfer';
          break;
      case 'discharge':
          $scope.event.type = 'Discharge';
          break;
      default: 
          $scope.event.type = 'Event';
    }

    this.setCurrentPageData = function (data) {
      if (data.events.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.event.author = $scope.currentUser.email;
      }
    };

    this.goList = function () {
      $state.go('events', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    
    this.cancel = function () {
      this.goList();
    };

    this.openSchedule = function () {
      ScheduleModal.openModal(this.currentPatient, {title: 'Schedule event (Appointment)'}, {}, $scope.currentUser);
    };
    
    $scope.create = function (eventForm, event) {
      $scope.formSubmitted = true;
      
      if (eventForm.$valid) {
        let toAdd = {
          // name: event.name,
          // comment: event.comment,
          // seriesNumber: event.seriesNumber,
          // dateCreated: event.dateCreated,
          // startDate: event.startDate,
          // source: event.source
          dateCreated: event.dateCreated,
          dateOfAppointment: event.date,
          location: event.location,
          serviceTeam: event.name,
          status: "Scheduled",
          timeOfAppointment: "2017-02-10T14:00:00.000Z"
        };

        $scope.eventsCreate(this.currentPatient.id, toAdd);
      }
    }.bind(this);

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.eventsCreate = eventsActions.create;
  }
}

const EventsCreateComponent = {
  template: templateEventsCreate,
  controller: EventsCreateController
};

EventsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'eventsActions', 'serviceRequests', 'ScheduleModal'];
export default EventsCreateComponent;
