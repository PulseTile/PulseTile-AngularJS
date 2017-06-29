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
let templateVitalsCreate = require('./vitals-create.html');

class VitalsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, vitalsActions, serviceRequests, serviceVitalsSigns) {
    $scope.vitalStatuses = {};
    $scope.popoverLabels = serviceVitalsSigns.getLabels();
    $scope.pattern = serviceVitalsSigns.pattern;

    $scope.vitalEdit = {};
    $scope.vitalEdit.dateCreate = Date.parse(new Date());
    $scope.vitalEdit.author = 'ripple_osi';

    this.setCurrentPageData = function (data) {
      if (data.vitals.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.vitalEdit.author = $scope.currentUser.email;
      }
      
      $scope.vitalStatuses = serviceVitalsSigns.setVitalStatuses($scope.vitalEdit);
    };

    $scope.getHighlighterClass = function (vitalName) {
      return serviceVitalsSigns.getHighlighterClass($scope.vitalStatuses[vitalName]);
    };

    $scope.changeVital = function (vital, vitalName) {
      $scope.vitalStatuses[vitalName] = serviceVitalsSigns.getStatusOnValue(vital[vitalName], vitalName);
      $scope.changeNewScore(vital);
    };

    $scope.changeNewScore = function (vital) {
      vital.newsScore = serviceVitalsSigns.countNewsScore($scope.vitalStatuses);
      $scope.vitalStatuses.newsScore = serviceVitalsSigns.getStatusOnValue(vital.newsScore, 'newsScore');
    };

    this.goList = function () {
      $state.go('vitals', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
      });
    };

    this.cancel = function () {
      this.goList();
    };

    $scope.create = function (vitalForm, vital) {
      $scope.formSubmitted = true;
      $scope.changeNewScore(vital);

      if (vitalForm.$valid) {
        $scope.vitalsCreate(this.currentPatient.id, vital);
      }
    }.bind(this);

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

VitalsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'vitalsActions', 'serviceRequests', 'serviceVitalsSigns'];
export default VitalsCreateComponent;
