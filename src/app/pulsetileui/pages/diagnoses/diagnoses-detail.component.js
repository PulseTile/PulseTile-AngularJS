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
let templateDiagnosesDetail = require('./diagnoses-detail.html');

class DiagnosesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, diagnosesActions, serviceRequests, usSpinnerService) {
    $scope.isEdit = false;

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.diagnoses.dataGet) {
        this.diagnosis = data.diagnoses.dataGet;
        usSpinnerService.stop('diagnosisDetail-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    this.edit = function () {
      $scope.isEdit = true;
      $scope.diagnosisEdit = Object.assign({}, this.diagnosis);
			$scope.diagnosisEdit.dateCreated = new Date(this.diagnosis.dateCreated);
			$scope.diagnosisEdit.dateOfOnset = new Date(this.diagnosis.dateOfOnset);
      $scope.diagnosisEdit.dateSubmitted = new Date();
    };
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };

    $scope.confirmEdit = function (diagnosisForm, diagnosis) {
      $scope.formSubmitted = true;

      let toAdd = {
        code: $scope.diagnosisEdit.code,
        dateOfOnset: $scope.diagnosisEdit.dateOfOnset.toISOString().slice(0, 10),
        description: $scope.diagnosisEdit.description,
        problem: $scope.diagnosisEdit.problem,
        source: $scope.diagnosisEdit.source,
        sourceId: '',
        terminology: $scope.diagnosisEdit.terminology
      };


      if (diagnosisForm.$valid) {
        $scope.isEdit = false;
        diagnosis = Object.assign(diagnosis, $scope.diagnosisEdit);
        $scope.diagnosesUpdate(this.currentPatient.id, toAdd);
      }
    }.bind(this);
    
    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    $scope.isLocked = function (diagnosis) {
      if (!(diagnosis && diagnosis.id)) {
        return true;
      }

      var diagnosisIdSegments = diagnosis.id.toString().split('::');
      if (diagnosisIdSegments.length > 1) {
        return ($scope.UnlockedSources.indexOf(diagnosisIdSegments[1]) < 0);
      }

      return true;
    };

    this.convertToLabel = function (text) {
      var result = text.replace(/([A-Z])/g, ' $1');
      return result.charAt(0).toUpperCase() + result.slice(1);
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.diagnosesLoad = diagnosesActions.get;
    this.diagnosesLoad($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source);
    $scope.diagnosesUpdate = diagnosesActions.update;
  }
}

const DiagnosesDetailComponent = {
  template: templateDiagnosesDetail,
  controller: DiagnosesDetailController
};

DiagnosesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'diagnosesActions', 'serviceRequests', 'usSpinnerService'];
export default DiagnosesDetailComponent;