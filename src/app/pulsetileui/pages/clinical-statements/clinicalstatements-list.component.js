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

let templateClinicalstatementsList = require('./clinicalstatements-list.html');

class ClinicalstatementsListController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'clinicalStatements-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    clinicalstatementsActions.clear();
    this.actionLoadList = clinicalstatementsActions.all;

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'clinicalstatements-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'clinicalstatements';
    /* istanbul ignore next */
    this.create = function () {
      $state.go('clinicalstatements-create', {
        patientId: $stateParams.patientId,
        page: $scope.currentPage || 1
      });
    };
    /* istanbul ignore next */
    this.go = function (id, source) {
      $state.go('clinicalstatements-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.clinicalstatements;
      const pagesInfo = store.pagesInfo;
      const pluginName = 'clinicalStatements';

      if (serviceRequests.checkIsCanLoadingListData(state, pagesInfo, pluginName, $stateParams.patientId)) {
        this.actionLoadList($stateParams.patientId);
        serviceRequests.setPluginPage(pluginName);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        this.clinicalStatements = state.data;

        serviceFormatted.formattingTablesDate(this.clinicalStatements, ['dateCreated'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['type', 'author', 'dateCreated', 'source'];
      }
      if (state.data || state.error) {
        usSpinnerService.stop('list-spinner');
        setTimeout(() => { usSpinnerService.stop('list-spinner') }, 0);
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

const ClinicalstatementsListComponent = {
  template: templateClinicalstatementsList,
  controller: ClinicalstatementsListController
};

ClinicalstatementsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default ClinicalstatementsListComponent;