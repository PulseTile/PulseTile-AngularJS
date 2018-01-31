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
let templateGenericMdtList = require('./generic-mdt-list.html');

class GenericMdtListController {
  constructor($scope, $state, $stateParams, $ngRedux, genericmdtActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    genericmdtActions.clear();
    this.actionLoadList = genericmdtActions.all;

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'genericMdt-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'genericMdt';

    this.go = function (id) {
      $state.go('genericMdt-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1
      });
    };

    this.create = function () {
      $state.go('genericMdt-create', {
        patientId: $stateParams.patientId
      });
    };

    this.setCurrentPageData = function (store) {
      const state = store.genericmdt;

      if ((state.patientId !== $stateParams.patientId || !state.data) &&
        !state.isFetching && !state.error) {

        this.actionLoadList($stateParams.patientId);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        this.genericMdtComposition = state.data;

        serviceFormatted.formattingTablesDate(this.genericMdtComposition, ['dateOfRequest', 'dateOfMeeting'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['serviceTeam', 'dateOfRequest', 'dateOfMeeting', 'source'];
        usSpinnerService.stop('list-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const GenericMdtListComponent = {
  template: templateGenericMdtList,
  controller: GenericMdtListController
};

GenericMdtListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'genericmdtActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default GenericMdtListComponent;