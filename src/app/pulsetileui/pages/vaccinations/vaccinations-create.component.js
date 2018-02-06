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
let templateVaccinationsCreate = require('./vaccinations-create.html');

class VaccinationsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, vaccinationsActions, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = vaccinationsActions.all;
    $scope.actionCreateDetail = vaccinationsActions.create;

    $scope.vaccination = {};
    $scope.vaccination.dateCreated = new Date();
    $scope.vaccination.source = 'Marand';
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('vaccinations', {
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
    $scope.create = function (vaccinationForm, vaccination) {
      $scope.formSubmitted = true;

      if (vaccinationForm.$valid) {
        let toAdd = {
          vaccinationName: vaccination.vaccinationName,
          comment: vaccination.comment,
          series: vaccination.series,
          dateCreated: vaccination.dateCreated,
          vaccinationDateTime: vaccination.vaccinationDateTime,
          source: vaccination.source
        };
        serviceFormatted.propsToString(toAdd, 'vaccinationDateTime');
        $scope.actionCreateDetail($stateParams.patientId, toAdd);
      }
    }.bind(this);
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.vaccinations.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (store.patientsGet.data) {
        this.currentPatient = store.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.vaccination.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const VaccinationsCreateComponent = {
  template: templateVaccinationsCreate,
  controller: VaccinationsCreateController
};

VaccinationsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'vaccinationsActions', 'serviceRequests', 'serviceFormatted'];
export default VaccinationsCreateComponent;
