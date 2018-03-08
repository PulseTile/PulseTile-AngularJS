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
let templateHeightAndWeightList = require('./heightAndWeight-list.html');

class HeightAndWeightListController {
  constructor($scope, $state, $stateParams, $ngRedux, heightAndWeightActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    heightAndWeightActions.clear();
    this.actionLoadList = heightAndWeightActions.all;
    /* istanbul ignore next */
    this.go = function (id) {
      $state.go('heightAndWeights-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1
      });
    };
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.heightAndWeight;
      const pagesInfo = store.pagesInfo;
      const pluginName = 'heightAndWeight';

      if (serviceRequests.checkIsCanLoadingListData(state, pagesInfo, pluginName, $stateParams.patientId)) {
        this.actionLoadList($stateParams.patientId);
        serviceRequests.setPluginPage(pluginName);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        this.heightAndWeights = state.data;

        serviceFormatted.formattingTablesDate(this.heightAndWeights, ['weightRecorded', 'heightRecorded'], serviceFormatted.formatCollection.DDMMMYYYY);
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

const HeightAndWeightListComponent = {
  template: templateHeightAndWeightList,
  controller: HeightAndWeightListController
};

HeightAndWeightListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'heightAndWeightActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default HeightAndWeightListComponent;