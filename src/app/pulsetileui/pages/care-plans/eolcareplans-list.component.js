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
let templateEolcareplansList = require('./eolcareplans-list.html');

class EolcareplansListController {
  constructor($scope, $state, $stateParams, $ngRedux, eolcareplansActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    eolcareplansActions.clear();
    this.actionLoadList = eolcareplansActions.all;

    this.go = function (id) {
      $state.go('eolcareplans-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        filter: vm.query,
        page: $scope.currentPage || 1
      });
    };

    this.setCurrentPageData = function (store) {
      const state = store.eolcareplans;
      const pagesInfo = store.pagesInfo;
      const pluginName = 'eolcareplans';

      if (serviceRequests.checkIsCanLoadingListData(state, pagesInfo, pluginName, $stateParams.patientId)) {
        this.actionLoadList($stateParams.patientId);
        serviceRequests.setPluginPage(pluginName);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        this.eolcareplans = state.data;

        serviceFormatted.filteringKeys = ['name', 'type', 'date', 'source'];
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

const EolcareplansListComponent = {
  template: templateEolcareplansList,
  controller: EolcareplansListController
};

EolcareplansListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eolcareplansActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default EolcareplansListComponent;