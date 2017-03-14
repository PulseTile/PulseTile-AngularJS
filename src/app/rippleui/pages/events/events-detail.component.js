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
let templateEventsDetail = require('./events-detail.html');

class EventsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, eventsActions, serviceRequests, usSpinnerService, ScheduleModal) {
    $scope.isEdit = false;

    this.edit = function () {
      $scope.isEdit = true;

      $scope.eventEdit = Object.assign({}, this.event);
      console.log('$scope.eventEdit.date');
      console.log(new Date(+$scope.eventEdit.date)) ;
      $scope.eventEdit.date = new Date(+$scope.eventEdit.date);
      $scope.eventEdit.dateCreate = new Date();
    };

    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    
    $scope.confirmEdit = function (eventForm, event) {
      $scope.formSubmitted = true;
      if (eventForm.$valid) {
        $scope.isEdit = false;
        this.event = Object.assign(this.event, $scope.eventEdit);
        $scope.eventsUpdate($scope.patient.id, $scope.event);
      }
    }.bind(this);

    this.openSchedule = function () {
      ScheduleModal.openModal(this.currentPatient, {title: 'Schedule event (Appointment)'}, this.event, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.events.dataGet) {
        this.event = data.events.dataGet;
        usSpinnerService.stop('eventDetail-spinner');
      }
      // this.event = {
      //   name: 'Influenza',
      //   date: new Date(),
      //   seriesNumber: 1,
      //   source: 'EtherCIS',
      //   comment: 'Hospital staff',
      //   author: 'ripple_osi',
      //   dateCreated: new Date()
      // };
      usSpinnerService.stop('eventDetail-spinner');
      // if (data.patientsGet.data) {
      //   this.currentPatient = data.patientsGet.data;
      // }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.eventsLoad = eventsActions.get;
    this.eventsLoad($stateParams.patientId, $stateParams.detailsIndex);
    // $scope.eventsUpdate = eventsActions.update;
  }
}

const EventsDetailComponent = {
  template: templateEventsDetail,
  controller: EventsDetailController
};

EventsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'eventsActions', 'serviceRequests', 'usSpinnerService', 'ScheduleModal'];
export default EventsDetailComponent;