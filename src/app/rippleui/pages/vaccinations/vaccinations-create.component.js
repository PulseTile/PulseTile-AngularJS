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
let templateVaccinationsCreate = require('./vaccinations-create.html');

class VaccinationsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, vaccinationsActions, serviceRequests) {
    $scope.vaccination = {};
    $scope.vaccination.dateCreated = new Date();
    $scope.vaccination.source = 'Marand';

    this.setCurrentPageData = function (data) {
      if (data.vaccinations.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.vaccination.author = $scope.currentUser.email;
      }
    };

    this.goList = function () {
      $state.go('vaccinations', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    
    this.cancel = function () {
      this.goList();
    };
    
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

        $scope.vaccinationsCreate(this.currentPatient.id, toAdd);
      }
    }.bind(this);

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.vaccinationsCreate = vaccinationsActions.create;
  }
}

const VaccinationsCreateComponent = {
  template: templateVaccinationsCreate,
  controller: VaccinationsCreateController
};

VaccinationsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'vaccinationsActions', 'serviceRequests'];
export default VaccinationsCreateComponent;
