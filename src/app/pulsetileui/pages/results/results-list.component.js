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
let templateResultsList = require('./results-list.html');

class ResultsListController {
  constructor($scope, $state, $stateParams, $ngRedux, resultsActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    resultsActions.clear();
    this.actionLoadList = resultsActions.all;

    this.isShowExpandBtn = $state.router.globals.$current.name !== 'results';

    this.go = function (id, source) {
      $state.go('results-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };

    this.setCurrentPageData = function (store) {
      const state = store.results;

      if ((state.patientId !== $stateParams.patientId || !state.data) &&
        !state.isFetching && !state.error) {

        this.actionLoadList($stateParams.patientId);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        this.results = state.data;

        serviceFormatted.formattingTablesDate(this.results, ['dateCreated', 'sampleTaken'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['sampleTaken', 'testName', 'dateCreated', 'source'];
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

const ResultsListComponent = {
  template: templateResultsList,
  controller: ResultsListController
};

ResultsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'resultsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default ResultsListComponent;