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
let templateMedicationsDetail= require('./medications-detail.html');

class MedicationsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, medicationsActions, usSpinnerService, serviceRequests, serviceFormatted) {
    this.actionLoadList = medicationsActions.all;
    this.actionLoadDetail = medicationsActions.get;
    $scope.actionUpdateDetail = medicationsActions.update;

    usSpinnerService.spin('detail-spinner');
    this.actionLoadDetail($stateParams.patientId, $stateParams.detailsIndex);

    this.setCurrentPageData = function (store) {
      const state = store.medication;
      const { patientId, detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        this.medication = state.dataGet;
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


    //Edit Medication
    $scope.formDisabled = true;
    $scope.isShowSchedule = true;
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
    /* istanbul ignore next */
    this.editMedication = function () {
      $scope.isMedicationEdit = true;

      $scope.currentUser = this.currentUser;
      $scope.medicationEdit = Object.assign({}, this.medication);

      $scope.medicationEdit.startTime = new Date($scope.medicationEdit.startTime);
      $scope.medicationEdit.startDate = new Date($scope.medicationEdit.startDate);
      $scope.medicationEdit.dateCreated = new Date($scope.medicationEdit.dateCreated);
    };

    $scope.isPrescriptionEdit = false;
    /* istanbul ignore next */
    this.editPrescription = function () {
      $scope.isPrescriptionEdit = true;
      $scope.prescriptionEdit = {
        pStartDateTime: new Date(),
        finishCancelled: true,
        doseInterval: '',
        doseQuantity: ''
      };
    };
    /* istanbul ignore next */
    this.cancelEditMedication = function () {
      $scope.isMedicationEdit = false;
    };
    /* istanbul ignore next */
    $scope.confirmEditMedication = function (medicationForm, medication) {
      $scope.formSubmitted = true;
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startTime = now - today;
      
      let toAdd = {
        doseAmount: medication.doseAmount,
        doseDirections: medication.doseDirections,
        doseTiming: medication.doseTiming,
        medicationCode: medication.medicationCode,
        medicationTerminology: medication.medicationTerminology,
        name: medication.name,
        route: medication.route,
        startDate: new Date().getTime(),
        startTime: startTime,
        author: medication.author,
        dateCreated: medication.dateCreated,
        source: medication.source,
        sourceId: medication.sourceId,
				isImport: medication.isImport || false,
				originalSource: medication.originalSource || '',
				originalComposition: medication.originalComposition || ''
      };

      if (medicationForm.$valid) {
        $scope.isMedicationEdit = false;
        serviceFormatted.propsToString(toAdd, 'startDate', 'startTime', 'dateCreated', 'isImport');
        $scope.actionUpdateDetail($stateParams.patientId, medication.sourceId, toAdd);

      }
    }.bind(this);
    /* istanbul ignore next */
    this.cancelEditPrescription = function () {
      $scope.isPrescriptionEdit = false;
    };
    /* istanbul ignore next */
    $scope.confirmEditPrescription = function (medicationForm, medication) {
      $scope.isPrescriptionEdit = false;
    }.bind(this);
    /* istanbul ignore next */
    $scope.toggleShowSchedule = function () {
      $scope.isShowSchedule = !$scope.isShowSchedule;
    }
  }
}

const MedicationsDetailComponent = {
  template: templateMedicationsDetail,
  controller: MedicationsDetailController
};

MedicationsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'usSpinnerService', 'serviceRequests', 'serviceFormatted'];
export default MedicationsDetailComponent;