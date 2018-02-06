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
  constructor($scope, $state, $stateParams, $ngRedux, vitalsActions, serviceRequests, usSpinnerService, serviceVitalsSigns, serviceFormatted) {
    this.actionLoadList = vitalsActions.all;
    this.actionLoadDetail = vitalsActions.get;
    $scope.actionUpdateDetail = vitalsActions.update;

    usSpinnerService.spin('detail-spinner');
    this.actionLoadDetail($stateParams.patientId, $stateParams.detailsIndex);

    $scope.isEdit = false;
    $scope.vitalStatuses = {};
    $scope.popoverLabels = serviceVitalsSigns.getLabels();
    $scope.pattern = serviceVitalsSigns.pattern;
    $scope.vital = {};
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
    this.edit = function () {
      $scope.isEdit = true;

      $scope.vitalEdit = Object.assign({}, $scope.vital);
      $scope.vitalEdit.dateCreated = Date.parse(new Date());

      $scope.changeNewScore($scope.vitalEdit);
    };
    /* istanbul ignore next */
    this.cancelEdit = function () {
      $scope.isEdit = false;
      $scope.vitalStatuses = serviceVitalsSigns.setVitalStatuses($scope.vital);

    };
    /* istanbul ignore next */
    $scope.confirmEdit = function (vitalForm, vital) {
      $scope.formSubmitted = true;
  
      if (vitalForm.$valid) {
        $scope.isEdit = false;

        var toUpdate = Object.assign({}, $scope.vitalEdit);
        $scope.changeNewScore(toUpdate);
        serviceFormatted.propsToString(toUpdate);
        $scope.actionUpdateDetail($stateParams.patientId, $scope.vital.sourceId, toUpdate);
      }
    };
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.vitals;
      const { patientId, detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        $scope.vital = serviceVitalsSigns.convertVitalCharacteristics(state.dataGet);
        $scope.vitalStatuses = serviceVitalsSigns.setVitalStatuses($scope.vital);

        (detailsIndex === state.dataGet.sourceId) ? usSpinnerService.stop('detail-spinner') : null;
      }

      // Update Detail
      if (state.dataUpdate !== null) {
        // After Update we request all list firstly
        this.actionLoadList(patientId);
      }
      if (state.isUpdateProcess) {
        usSpinnerService.spin('detail-update-spinner');
        if (!state.dataGet && !state.isGetFetching) {
          // We request detail when data is empty
          // Details are cleared after request LoadAll list
          this.actionLoadDetail(patientId, detailsIndex);
        }
      } else {
        usSpinnerService.stop('detail-update-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }

      if (state.error) {
        usSpinnerService.stop('detail-spinner');
        usSpinnerService.stop('detail-update-spinner');
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const VitalsDetailComponent = {
  template: templateVitalsDetail,
  controller: VitalsDetailController
};

VitalsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'vitalsActions', 'serviceRequests', 'usSpinnerService', 'serviceVitalsSigns', 'serviceFormatted'];
export default VitalsDetailComponent;