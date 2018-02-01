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
  constructor($scope, $state, $stateParams, $ngRedux, eventsActions, serviceRequests, serviceDateTimePicker, serviceFormatted) {
    $scope.actionLoadList = eventsActions.all;
    $scope.actionCreateDetail = eventsActions.create;

    var currentStateName = $state.router.globals.$current.name;
    var partsCurrentStateName = currentStateName.split('-');
    this.typeCreate = partsCurrentStateName[partsCurrentStateName.length - 1];

    $scope.startDateBeforeRender = serviceDateTimePicker.startDateBeforeRender;

    $scope.event = {};
    $scope.event.dateCreated = new Date();
    $scope.event.isConnection = true;

    /* istanbul ignore next */
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

    /* istanbul ignore next */
    this.goList = function () {
      $state.go('events', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    
    /* istanbul ignore next */
    this.cancel = function () {
      this.goList();
    };

    /* istanbul ignore next */
    $scope.create = function (eventForm, event) {
      $scope.formSubmitted = true;
      
      if (eventForm.$valid) {
        let toAdd = {
          name: event.name,
          type: event.type,
          description: event.description,
          dateTime: event.dateTime,
          author: event.author
        };
        
        serviceFormatted.propsToString(toAdd);
        $scope.actionCreateDetail($stateParams.patientId, toAdd);
      }
    }.bind(this);

    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.events.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.event.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const EventsCreateComponent = {
  template: templateEventsCreate,
  controller: EventsCreateController
};

EventsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eventsActions', 'serviceRequests', 'serviceDateTimePicker', 'serviceFormatted'];
export default EventsCreateComponent;
