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
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, vaccinationsActions, serviceRequests, usSpinnerService) {
    $scope.isEdit = false;

    // this.vaccination = $stateParams.source;

    this.edit = function () {
      $scope.isEdit = true;

      $scope.vaccinationEdit = Object.assign({}, this.vaccination);
      $scope.vaccinationEdit.date = new Date(+$scope.vaccinationEdit.date);
      $scope.vaccinationEdit.dateCreate = new Date();
    };

    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    
    $scope.confirmEdit = function (vaccinationForm, vaccination) {
      $scope.formSubmitted = true;
      if (vaccinationForm.$valid) {
        $scope.isEdit = false;
        this.vaccination = Object.assign(this.vaccination, $scope.vaccinationEdit);
        $scope.vaccinationsUpdate(this.currentPatient.id, $scope.vaccination);
      }
    }.bind(this);

    this.setCurrentPageData = function (data) {
      if (data.vaccinations.dataGet) {
        this.vaccination = data.vaccinations.dataGet;
        usSpinnerService.stop('vaccinationDetail-spinner');
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

    this.vaccinationsLoad = vaccinationsActions.get;
    this.vaccinationsLoad($stateParams.patientId, $stateParams.detailsIndex);
    $scope.vaccinationsUpdate = vaccinationsActions.update;
  }
}

const VaccinationsDetailComponent = {
  template: templateVaccinationsDetail,
  controller: VaccinationsDetailController
};

VaccinationsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'vaccinationsActions', 'serviceRequests', 'usSpinnerService'];
export default VaccinationsDetailComponent;