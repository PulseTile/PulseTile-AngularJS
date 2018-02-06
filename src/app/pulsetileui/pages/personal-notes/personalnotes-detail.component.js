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

let templatePersonalnotesDetail = require('./personalnotes-detail.html');

class PersonalnotesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, personalnotesActions, serviceRequests, usSpinnerService, serviceFormatted) {
    this.actionLoadList = personalnotesActions.all;
    this.actionLoadDetail = personalnotesActions.get;
    $scope.actionUpdateDetail = personalnotesActions.update;

    usSpinnerService.spin('detail-spinner');
    this.actionLoadDetail($stateParams.patientId, $stateParams.detailsIndex);
  
    //Edit Clinical Note
    $scope.isEdit = false;

    /* istanbul ignore next */
    this.edit = function () {
      $scope.isEdit = true;
      $scope.personalNoteEdit = Object.assign({}, this.personalNote);
      $scope.personalNoteEdit.dateCreated = new Date(this.personalNote.dateCreated);
    };
    /* istanbul ignore next */
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    /* istanbul ignore next */
    $scope.confirmEdit = function (personalNoteForm, personalNote) {
      $scope.formSubmitted = true;

      /* istanbul ignore if  */
      if (personalNoteForm.$valid) {
        let toUpdate = {
          noteType: personalNote.noteType,
          notes: personalNote.notes,
          author: personalNote.author,
          source: personalNote.source,
          sourceId: personalNote.sourceId,
          dateCreated: new Date().getTime()
        };
        
        $scope.isEdit = false;
        serviceFormatted.propsToString(toUpdate);
        $scope.actionUpdateDetail($stateParams.patientId, personalNote.sourceId, toUpdate);
      }
    };
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.personalnotes;
      const { patientId, detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        this.personalNote = state.dataGet;
        this.dateCreated = moment(this.personalNote.dateCreated).format('DD-MMM-YYYY');
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
  }
}

const PersonalnotesDetailComponent = {
  template: templatePersonalnotesDetail,
  controller: PersonalnotesDetailController
};

PersonalnotesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'personalnotesActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default PersonalnotesDetailComponent;