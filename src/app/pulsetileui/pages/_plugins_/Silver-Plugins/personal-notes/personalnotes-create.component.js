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

let templatePersonalnotesCreate = require('./personalnotes-create.html');

class PersonalnotesCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, personalnotesActions, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = personalnotesActions.all;
    $scope.actionCreateDetail = personalnotesActions.create;

    $scope.personalNote = {};
    $scope.personalNote.dateCreated = new Date().toISOString().slice(0, 10);
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('personalNotes', {
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
        serviceFormatted.propsToString(toAdd, 'dateCreated');
        $scope.actionCreateDetail($stateParams.patientId, toAdd);
      }
    }.bind(this);
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.personalnotes.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.personalNote.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const PersonalnotesCreateComponent = {
  template: templatePersonalnotesCreate,
  controller: PersonalnotesCreateController
};

PersonalnotesCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'personalnotesActions', 'serviceRequests', 'serviceFormatted'];
export default PersonalnotesCreateComponent;
