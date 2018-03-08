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

let templateClinicalnotesCreate = require('./clinicalnotes-create.html');

class ClinicalnotesCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalnotesActions, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = clinicalnotesActions.all;
    $scope.actionCreateDetail = clinicalnotesActions.create;

    $scope.clinicalNote = {};
    $scope.clinicalNote.dateCreated = new Date().toISOString().slice(0, 10);
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('clinicalNotes', {
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
    $scope.create = function (clinicalNoteForm, clinicalNote) {
      $scope.formSubmitted = true;

      if (clinicalNoteForm.$valid) {
        let toAdd = {
          clinicalNotesType: clinicalNote.clinicalNotesType,
          note: clinicalNote.note,
          dateCreated: clinicalNote.dateCreated,
          author: clinicalNote.author,
          source: 'openehr'
        };

        serviceFormatted.propsToString(toAdd, 'dateCreated');
        $scope.actionCreateDetail($stateParams.patientId, toAdd);
      }
    }.bind(this);

    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.clinicalnotes.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.clinicalNote.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const ClinicalnotesCreateComponent = {
  template: templateClinicalnotesCreate,
  controller: ClinicalnotesCreateController
};

ClinicalnotesCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalnotesActions', 'serviceRequests', 'serviceFormatted'];
export default ClinicalnotesCreateComponent;
