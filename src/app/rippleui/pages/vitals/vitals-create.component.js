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
let templateVitalsCreate = require('./vitals-create.html');

class VitalsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, vitalsActions, serviceRequests) {
    $scope.vital = {};
    $scope.vital.dateCreated = new Date();
    $scope.vital.source = 'Marand';

    this.setCurrentPageData = function (data) {
      // if (data.vitals.dataCreate !== null) {
      //   this.goList();
      // }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
      }
    };

    this.goList = function () {
      $state.go('vitals', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    }
    this.cancel = function () {
      this.goList();
    };
    $scope.create = function (vitalForm, vital) {
      $scope.formSubmitted = true;

      let toAdd = {
        name: vital.name,
        comment: vital.comment,
        seriesNumber: vital.seriesNumber,
        dateCreated: vital.dateCreated,
        startDate: vital.startDate,
        source: vital.source,
      };

      if (vitalForm.$valid) {

        $scope.vitalsCreate(this.currentPatient.id, toAdd);
      }
    }.bind(this);
   
    $scope.openDatepicker = function ($event, name) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[name] = true;
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.vitalsCreate = vitalsActions.create;
  }
}

const VitalsCreateComponent = {
  template: templateVitalsCreate,
  controller: VitalsCreateController
};

VitalsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'vitalsActions', 'serviceRequests'];
export default VitalsCreateComponent;
