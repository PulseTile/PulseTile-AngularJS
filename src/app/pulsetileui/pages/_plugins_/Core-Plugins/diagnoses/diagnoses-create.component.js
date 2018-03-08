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
let templateDiagnosesCreate = require('./diagnoses-create.html');

class DiagnosesCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, diagnosesActions, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = diagnosesActions.all;
    $scope.actionCreateDetail = diagnosesActions.create;

    $scope.diagnosis = {};

    $scope.diagnosis.isImport = false;
    $scope.diagnosis.originalSource = '';
		$scope.diagnosis.originalComposition = '';
    
    if ($stateParams.importData) {
			$scope.diagnosis = {
				...$stateParams.importData.data
			};
    }

    if (typeof $scope.diagnosis.dateSubmitted == "undefined") {
      $scope.diagnosis.dateSubmitted = new Date();
    }
    
    $scope.diagnosis.code = '12393890';
    $scope.diagnosis.terminology = 'SNOMED-CT';
    /* istanbul ignore next */
    this.backToDocs = function () {
      $state.go('documents-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: $stateParams.importData.documentIndex,
        page: 1
      });
    };
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('diagnoses', {
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
    $scope.create = function (diagnosisForm, diagnosis) {
      $scope.formSubmitted = true;

      if (diagnosisForm.$valid) {
        let toAdd = {
          code: diagnosis.code,
          dateOfOnset: serviceFormatted.formattingDate(diagnosis.dateOfOnset, serviceFormatted.formatCollection.YYYYMMDD),
          description: diagnosis.description,
          problem: diagnosis.problem,
          source: diagnosis.source,
          sourceId: '',
          terminology: diagnosis.terminology,
          isImport: diagnosis.isImport || false,
          originalSource: diagnosis.originalSource || '',
          originalComposition: diagnosis.originalComposition || ''
        };
        serviceFormatted.propsToString(toAdd, 'isImport');
        $scope.actionCreateDetail($stateParams.patientId, toAdd);
      }
    }.bind(this);

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.diagnoses.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (store.patientsGet.data) {
        this.currentPatient = store.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.diagnosis.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const DiagnosesCreateComponent = {
  template: templateDiagnosesCreate,
  controller: DiagnosesCreateController
};

DiagnosesCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'diagnosesActions', 'serviceRequests', 'serviceFormatted'];
export default DiagnosesCreateComponent;
