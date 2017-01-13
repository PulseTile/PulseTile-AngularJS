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

let templateMedicationsCreate = require('./medications-create.html');

class MedicationsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, medicationsActions, serviceRequests, usSpinnerService) {

    this.setCurrentPageData = function (data) {
      if (data.medication.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        $scope.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

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

    $scope.openDatepicker = function ($event, name) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[name] = true;
    };
    $scope.patient = $scope.currentPatient;
    this.goList = function () {
      $state.go('medications', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    }
    this.cancel = function () {
      this.goList();
    };
    $scope.create = function (medicationForm, medication) {
      $scope.formSubmitted = true;

      let toAdd = {
        sourceId: '',
        doseAmount: medication.doseAmount,
        doseDirections: medication.doseDirections,
        doseTiming: medication.doseTiming,
        medicationCode: medication.medicationCode,
        medicationTerminology: medication.medicationTerminology,
        name: medication.name,
        route: medication.route,
        startDate: medication.startDate,
        startTime: medication.startTime,
        author: medication.author,
        dateCreated: medication.dateCreated
      };

      if (medicationForm.$valid) {

        $scope.medicationsCreate($scope.patient.id, toAdd);

      }
    };

    $scope.medicationsLoad = medicationsActions.all;
    $scope.medicationsCreate = medicationsActions.create;
  }
}

const MedicationsCreateComponent = {
  template: templateMedicationsCreate,
  controller: MedicationsCreateController
};

MedicationsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'serviceRequests', 'usSpinnerService'];
export default MedicationsCreateComponent;
