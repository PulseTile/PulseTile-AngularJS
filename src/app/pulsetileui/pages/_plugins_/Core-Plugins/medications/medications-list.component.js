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
let templateMedicationsList = require('./medications-list.html');

class MedicationsListController {
  constructor($scope, $state, $stateParams, $ngRedux, medicationsActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    medicationsActions.clear();
    this.actionLoadList = medicationsActions.all;

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'medications-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'medications';

    this.go = function (id, medicationSource) {
      $state.go('medications-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: medicationSource
      });
    };

    this.create = function () {
      $state.go('medications-create', {
        patientId: $stateParams.patientId
      });
    };

    this.setCurrentPageData = function (store) {
      const state = store.medication;
      const pagesInfo = store.pagesInfo;
      const pluginName = 'medications';

      if (serviceRequests.checkIsCanLoadingListData(state, pagesInfo, pluginName, $stateParams.patientId)) {
        this.actionLoadList($stateParams.patientId);
        serviceRequests.setPluginPage(pluginName);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        this.medications = state.data;

        serviceFormatted.filteringKeys = ['name', 'relationship', 'nextOfKin', 'source'];
        serviceFormatted.formattingTablesDate(this.medications, ['dateCreated'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['name', 'doseAmount', 'dateCreated', 'source'];
        /*
          TODO: Remove. Only for demo
        */
        if (this.medications[0]) {
          this.medications[0].warning = true;
        }
        if (this.medications[1]) {
          this.medications[1].danger = true;
        }
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

const MedicationsListComponent = {
  template: templateMedicationsList,
  controller: MedicationsListController
};

MedicationsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default MedicationsListComponent;