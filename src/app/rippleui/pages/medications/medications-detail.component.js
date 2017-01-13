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
let templateMedicationsDetail= require('./medications-detail.html');

class MedicationsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, medicationsActions, usSpinnerService) {
    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.medication.dataGet) {
        this.medication = data.medication.dataGet;
        usSpinnerService.stop('medicationsDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
      if (data.medication.dataUpdate !== null) {
        $scope.medicationsLoad($stateParams.patientId);
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.medicationsLoad = medicationsActions.get;
    this.medicationsLoad($stateParams.patientId, $stateParams.medicationIndex, $stateParams.source);

    //Edit Medication

    $scope.routes = [
      'Po Per Oral',
      'IV Intra Venous',
      'PN Per Nasal',
      'PR Per Rectum',
      'SL Sub Lingual',
      'SC Sub Cutaneous',
      'IM Intra Muscular'
    ];
    
    $scope.isMedicationEdit = false;
    this.editMedication = function () {
      $scope.isMedicationEdit = true;

      $scope.currentUser = this.currentUser;
      $scope.medicationEdit = Object.assign({}, this.medication);
      $scope.patient = this.currentPatient;

      $scope.medicationEdit.startTime = new Date($scope.medicationEdit.startTime);
      $scope.medicationEdit.startDate = new Date($scope.medicationEdit.startDate);
      $scope.medicationEdit.dateCreated = new Date($scope.medicationEdit.dateCreated);
    };

    $scope.isPrescriptionEdit = false;
    this.editPrescription = function () {
      $scope.isPrescriptionEdit = true;
    };


    $scope.openDatepicker = function ($event, name) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[name] = true;
    };
    this.cancelEditMedication = function () {
      $scope.isMedicationEdit = false;
    };
    $scope.confirmEditMedication = function (medicationForm, medication) {
      
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
        this.medication = Object.assign(this.medication, $scope.medicationEdit);
        $scope.isMedicationEdit = false;
        $scope.medicationsUpdate($scope.patient.id, toAdd);

      }
    }.bind(this);

    this.cancelEditPrescription = function () {
      $scope.isPrescriptionEdit = false;
    };
    $scope.confirmEditPrescription = function (medicationForm, medication) {
      $scope.isPrescriptionEdit = false;
    }.bind(this);

    $scope.medicationsLoad = medicationsActions.all;
    $scope.medicationsUpdate = medicationsActions.update;
  }
}

const MedicationsDetailComponent = {
  template: templateMedicationsDetail,
  controller: MedicationsDetailController
};

MedicationsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'usSpinnerService'];
export default MedicationsDetailComponent;