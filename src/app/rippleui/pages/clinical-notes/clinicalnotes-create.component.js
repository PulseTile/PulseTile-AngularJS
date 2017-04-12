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

let templateClinicalnotesCreate = require('./clinicalnotes-create.html');

class ClinicalnotesCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalnotesActions, serviceRequests) {
    $scope.clinicalNote = {};
    $scope.clinicalNote.dateCreated = new Date().toISOString().slice(0, 10);
    
    this.setCurrentPageData = function (data) {
      if (data.clinicalnotes.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.clinicalNote.author = $scope.currentUser.email;
      }
    };

    this.goList = function () {
      $state.go('clinicalNotes', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    
    this.cancel = function () {
      this.goList();
    };
    
    $scope.create = function (clinicalNoteForm, clinicalNote) {
      $scope.formSubmitted = true;

      if (clinicalNoteForm.$valid) {
        let toAdd = {
          noteType: clinicalNote.noteType,
          notes: clinicalNote.notes,
          dateCreated: clinicalNote.dateCreated,
          author: clinicalNote.author,
          source: 'openehr'
        };

        $scope.clinicalnotesCreate(this.currentPatient.id, toAdd);
      }
    }.bind(this);

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.clinicalnotesCreate = clinicalnotesActions.create;
  }
}

const ClinicalnotesCreateComponent = {
  template: templateClinicalnotesCreate,
  controller: ClinicalnotesCreateController
};

ClinicalnotesCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalnotesActions', 'serviceRequests'];
export default ClinicalnotesCreateComponent;
