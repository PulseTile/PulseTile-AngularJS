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
  constructor($scope, $state, $stateParams, $ngRedux, vitalsActions, serviceRequests, serviceVitalsSigns, serviceFormatted) {
    $scope.actionLoadList = vitalsActions.all;
    $scope.actionCreateDetail = vitalsActions.create;

    $scope.vitalStatuses = {};
    $scope.popoverLabels = serviceVitalsSigns.getLabels();
    $scope.pattern = serviceVitalsSigns.pattern;

    $scope.vitalEdit = {};
    $scope.vitalEdit.dateCreated = new Date().getTime();
    $scope.vitalEdit.author = 'ripple_osi';
    /* istanbul ignore next */
    $scope.getHighlighterClass = function (vitalName) {
      return serviceVitalsSigns.getHighlighterClass($scope.vitalStatuses[vitalName]);
    };
    /* istanbul ignore next */
    $scope.changeVital = function (vital, vitalName) {
      $scope.vitalStatuses[vitalName] = serviceVitalsSigns.getStatusOnValue(vital[vitalName], vitalName);
      $scope.changeNewScore(vital);
    };
    /* istanbul ignore next */
    $scope.changeNewScore = function (vital) {
      vital.newsScore = serviceVitalsSigns.countNewsScore($scope.vitalStatuses);
      $scope.vitalStatuses.newsScore = serviceVitalsSigns.getStatusOnValue(vital.newsScore, 'newsScore');
    };
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('vitals', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
      });
    };
    /* istanbul ignore next */
    this.cancel = function () {
      this.goList();
    };
    /* istanbul ignore next */
    $scope.create = function (vitalForm, vital) {
      $scope.formSubmitted = true;
      $scope.changeNewScore(vital);

      if (vitalForm.$valid) {
        serviceFormatted.propsToString(vital, 'dateCreated');
        $scope.actionCreateDetail($stateParams.patientId, vital);
      }
    }.bind(this);
    /* istanbul ignore next */
    this.setCurrentPageData = function (data) {
      if (data.vitals.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.vitalEdit.author = $scope.currentUser.email;
      }

      $scope.vitalStatuses = serviceVitalsSigns.setVitalStatuses($scope.vitalEdit);
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const VitalsCreateComponent = {
  template: templateVitalsCreate,
  controller: VitalsCreateController
};

VitalsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'vitalsActions', 'serviceRequests', 'serviceVitalsSigns', 'serviceFormatted'];
export default VitalsCreateComponent;
