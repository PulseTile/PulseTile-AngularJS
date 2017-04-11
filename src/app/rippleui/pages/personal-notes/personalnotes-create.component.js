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

let templatePersonalnotesCreate = require('./personalnotes-create.html');

class PersonalnotesCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, personalnotesActions, serviceRequests) {
    $scope.personalNote = {};
    $scope.personalNote.dateCreated = new Date().toISOString().slice(0, 10);
    
    this.setCurrentPageData = function (data) {
      if (data.personalnotes.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.personalNote.author = $scope.currentUser.email;
      }
    };

    this.goList = function () {
      $state.go('personalNotes', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    
    this.cancel = function () {
      this.goList();
    };
    
    $scope.create = function (personalNoteForm, personalNote) {
      $scope.formSubmitted = true;

      if (personalNoteForm.$valid) {
        let toAdd = {
          noteType: personalNote.noteType,
          notes: personalNote.notes,
          dateCreated: personalNote.dateCreated,
          author: personalNote.author,
          source: 'openehr'
        };

        $scope.personalnotesCreate(this.currentPatient.id, toAdd);
      }
    }.bind(this);

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.personalnotesCreate = personalnotesActions.create;
  }
}

const PersonalnotesCreateComponent = {
  template: templatePersonalnotesCreate,
  controller: PersonalnotesCreateController
};

PersonalnotesCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'personalnotesActions', 'serviceRequests'];
export default PersonalnotesCreateComponent;
