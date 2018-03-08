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

let templateMedicationsCreate = require('./medications-create.html');

class MedicationsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, medicationsActions, serviceRequests, usSpinnerService, serviceFormatted) {
    $scope.actionLoadList = medicationsActions.all;
    $scope.actionCreateDetail = medicationsActions.create;

    $scope.medication = {};
    
    $scope.medication.isImport = false;
    $scope.medication.originalSource = '';
		$scope.medication.originalComposition = '';

    if ($stateParams.importData) {
			$scope.medication = {
				...$stateParams.importData.data
			};
    }

    if (typeof $scope.medication.startDate == "undefined") {
      $scope.medication.startDate = new Date();
    }
    /* istanbul ignore next */
    this.backToDocs = function () {
      $state.go('documents-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: $stateParams.importData.documentIndex,
        page: 1
      });
    };

    //Create Medication
    $scope.routes = [
      'Po Per Oral',
      'IV Intra Venous',
      'PN Per Nasal',
      'PR Per Rectum',
      'SL Sub Lingual',
      'SC Sub Cutaneous',
      'IM Intra Muscular'
    ];
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('medications', {
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
    $scope.create = function (medicationForm, medication) {
      $scope.formSubmitted = true;

      if (medicationForm.$valid) {
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let startTime = now - today;

        let toAdd = {
          sourceId: '',
          doseAmount: medication.doseAmount,
          doseDirections: medication.doseDirections,
          doseTiming: medication.doseTiming,
          medicationCode: "123456789",
          medicationTerminology: medication.medicationTerminology,
          name: medication.name,
          route: medication.route,
          startDate: medication.startDate.getTime(),
          startTime: startTime,
          author: medication.author,
          dateCreated: medication.dateCreated,
          isImport: medication.isImport || false,
          originalSource: medication.originalSource || '',
          originalComposition: medication.originalComposition || ''
        };

        serviceFormatted.propsToString(toAdd, 'startDate', 'startTime', 'dateCreated', 'isImport');
        $scope.actionCreateDetail($stateParams.patientId, toAdd);
      }
    };
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.medication.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.medication.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const MedicationsCreateComponent = {
  template: templateMedicationsCreate,
  controller: MedicationsCreateController
};

MedicationsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default MedicationsCreateComponent;
