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
let templateAllergiesDetail = require('./allergies-detail.html');

class AllergiesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, allergiesActions, serviceRequests, usSpinnerService, serviceFormatted) {
    this.actionLoadList = allergiesActions.all;
    this.actionLoadDetail = allergiesActions.get;
    $scope.actionUpdateDetail = allergiesActions.update;

    usSpinnerService.spin('detail-spinner');
    this.actionLoadDetail($stateParams.patientId, $stateParams.detailsIndex);

    $scope.isEdit = false;
    $scope.isEditMeta = false;
    
    /* istanbul ignore next */
    this.edit = function () {
      $scope.isEdit = true;
      $scope.allergyEdit = Object.assign({}, this.allergy);
      $scope.allergyEdit.dateCreated = new Date(this.allergy.dateCreated);
    };
    /* istanbul ignore next */
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    /* istanbul ignore next */
    $scope.confirmEdit = function (allergyForm, allergies) {
      $scope.formSubmitted = true;

      let toAdd = {
        sourceId: allergies.sourceId,
        cause: allergies.cause,
        causeCode: allergies.causeCode,
        causeTerminology: allergies.causeTerminology,
        reaction: allergies.reaction,
        source: allergies.source,
				isImport: allergies.isImport || false,
				originalSource: allergies.originalSource || '',
				originalComposition: allergies.originalComposition || ''
      };

      if (allergyForm.$valid) {
        $scope.isEdit = false;
				serviceFormatted.propsToString(toAdd, 'isImport');
        $scope.actionUpdateDetail($stateParams.patientId, allergies.sourceId, toAdd);
      }
    }.bind(this);

    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.allergies;
      const { patientId, detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        this.allergy = state.dataGet;
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

const AllergiesDetailComponent = {
  template: templateAllergiesDetail,
  controller: AllergiesDetailController
};

AllergiesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'allergiesActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default AllergiesDetailComponent;