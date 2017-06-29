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
let templateVitalsDetail = require('./vitals-detail.html');

class VitalsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, vitalsActions, serviceRequests, usSpinnerService, serviceVitalsSigns) {
    $scope.isEdit = false;
    $scope.vitalStatuses = {};
    $scope.popoverLabels = serviceVitalsSigns.getLabels();
    $scope.pattern = serviceVitalsSigns.pattern;
    $scope.vital = {};

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

    this.edit = function () {
      $scope.isEdit = true;

      $scope.vitalEdit = Object.assign({}, $scope.vital);
      $scope.vitalEdit.dateCreate = Date.parse(new Date());

      $scope.changeNewScore($scope.vitalEdit);
    };

    this.cancelEdit = function () {
      $scope.isEdit = false;
      $scope.vitalStatuses = serviceVitalsSigns.setVitalStatuses($scope.vital);

    };

    $scope.confirmEdit = function (vitalForm, vital) {
      $scope.formSubmitted = true;
  
      if (vitalForm.$valid) {
        $scope.isEdit = false;
        
        $scope.vital = Object.assign($scope.vital, $scope.vitalEdit);
        $scope.changeNewScore($scope.vital);

        $scope.vitalsUpdate(this.currentPatient.id, $scope.vital);
      }
    }.bind(this);

    this.setCurrentPageData = function (data) {
      if (data.vitals.dataGet) {
        $scope.vital = serviceVitalsSigns.convertVitalCharacteristics(data.vitals.dataGet);

        $scope.vitalStatuses = serviceVitalsSigns.setVitalStatuses($scope.vital);

        usSpinnerService.stop('vitalDetail-spinner');
      }
  
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }

      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.vitalsLoad = vitalsActions.get;
    $scope.vitalsLoad($stateParams.patientId, $stateParams.detailsIndex);
    $scope.vitalsUpdate = vitalsActions.update;
  }
}

const VitalsDetailComponent = {
  template: templateVitalsDetail,
  controller: VitalsDetailController
};

VitalsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'vitalsActions', 'serviceRequests', 'usSpinnerService', 'serviceVitalsSigns'];
export default VitalsDetailComponent;