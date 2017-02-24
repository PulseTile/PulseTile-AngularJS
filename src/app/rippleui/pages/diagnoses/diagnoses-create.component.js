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
let templateDiagnosesCreate = require('./diagnoses-create.html');

class DiagnosesCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, diagnosesActions, serviceRequests) {
    $scope.diagnosis = {};
    $scope.diagnosis.dateSubmitted = new Date();
    $scope.diagnosis.code = '12393890';

    this.setCurrentPageData = function (data) {
      if (data.diagnoses.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
      }
    };

    this.goList = function () {
      $state.go('diagnoses', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    }
    this.cancel = function () {
      this.goList();
    };

    $scope.create = function (diagnosisForm, diagnosis) {
      $scope.formSubmitted = true;

      let toAdd = {
        code: diagnosis.code,
        dateOfOnset: diagnosis.dateOfOnset.toISOString().slice(0, 10),
        description: diagnosis.description,
        problem: diagnosis.problem,
        source: diagnosis.source,
        sourceId: '',
        terminology: diagnosis.terminology
      };

      if (diagnosisForm.$valid) {
          
        $scope.diagnosesCreate(this.currentPatient.id, toAdd);
      }
    }.bind(this);

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.diagnosesCreate = diagnosesActions.create;
  }
}

const DiagnosesCreateComponent = {
  template: templateDiagnosesCreate,
  controller: DiagnosesCreateController
};

DiagnosesCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'diagnosesActions', 'serviceRequests'];
export default DiagnosesCreateComponent;
