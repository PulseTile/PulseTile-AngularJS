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

let templateClinicalnotesDetail = require('./clinicalnotes-detail.html');

class ClinicalnotesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, personalnotesActions, serviceRequests, usSpinnerService) {
    
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.personalnotes.dataGet) {
        this.personalNote = data.personalnotes.dataGet;
        this.dateCreated = moment(this.personalNote.dateCreated).format('DD-MMM-YYYY');
        usSpinnerService.stop("clinicalNoteDetail-spinner");
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalnotesLoad = personalnotesActions.get;
    this.clinicalnotesLoad($stateParams.patientId, $stateParams.personalNoteIndex, $stateParams.source);
  
    //Edit Clinical Note
    
    $scope.isEdit = false;
    
    this.edit = function () {
      $scope.isEdit = true;

      $scope.currentUser = this.currentUser;
      $scope.personalNoteEdit = Object.assign({}, this.personalNote);
      $scope.patient = this.currentPatient;
      
      $scope.personalNoteEdit.dateCreated = new Date(this.personalNote.dateCreated).toISOString().slice(0, 10);
    };
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };

    $scope.confirmEdit = function (personalNoteForm, personalNote) {
      $scope.formSubmitted = true;

      if (personalNoteForm.$valid) {
        let toUpdate = {
          noteType: personalNote.noteType,
          notes: personalNote.notes,
          author: personalNote.author,
          source: personalNote.source,
          sourceId: personalNote.sourceId
        };
        
        this.personalNote = Object.assign(personalNote, $scope.personalNoteEdit);
        $scope.isEdit = false;
        personalnotesActions.update($scope.patient.id, toUpdate);
        setTimeout(function () {
          $state.go('personalNotes-detail', {
            patientId: $scope.patient.id,
            personalNoteIndex: personalNote.sourceId
          });
        }, 1000);
      }
    };
  }
}

const ClinicalnotesDetailComponent = {
  template: templateClinicalnotesDetail,
  controller: ClinicalnotesDetailController
};

ClinicalnotesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'personalnotesActions', 'serviceRequests', 'usSpinnerService'];
export default ClinicalnotesDetailComponent;