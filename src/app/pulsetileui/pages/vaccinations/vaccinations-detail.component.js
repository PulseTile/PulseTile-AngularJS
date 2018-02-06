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
let templateVaccinationsDetail = require('./vaccinations-detail.html');

class VaccinationsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, vaccinationsActions, serviceRequests, usSpinnerService, serviceFormatted) {
    this.actionLoadList = vaccinationsActions.all;
    this.actionLoadDetail = vaccinationsActions.get;
    $scope.actionUpdateDetail = vaccinationsActions.update;

    usSpinnerService.spin('detail-spinner');
    this.actionLoadDetail($stateParams.patientId, $stateParams.detailsIndex);

    $scope.isEdit = false;
    /* istanbul ignore next */
    this.edit = function () {
      $scope.isEdit = true;

      $scope.vaccinationEdit = Object.assign({}, this.vaccination);
      $scope.vaccinationEdit.dateCreated = new Date();
    };
    /* istanbul ignore next */
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    /* istanbul ignore next */
    $scope.confirmEdit = function (vaccinationForm, vaccination) {
      $scope.formSubmitted = true;
      if (vaccinationForm.$valid) {
        $scope.isEdit = false;
        $scope.vaccinationEdit.vaccinationDateTime = new Date($scope.vaccinationEdit.vaccinationDateTime).getTime();
        $scope.vaccinationEdit.userId = $stateParams.patientId;

        serviceFormatted.propsToString($scope.vaccinationEdit, 'vaccinationDateTime');
        $scope.actionUpdateDetail($stateParams.patientId, vaccination.sourceId, $scope.vaccinationEdit);
      }
    }.bind(this);
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.vaccinations;
      const { patientId, detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        this.vaccination = state.dataGet;
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

const VaccinationsDetailComponent = {
  template: templateVaccinationsDetail,
  controller: VaccinationsDetailController
};

VaccinationsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'vaccinationsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default VaccinationsDetailComponent;