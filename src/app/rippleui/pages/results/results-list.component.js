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
let templateResultsList = require('./results-list.html');

class ResultsListController {
  constructor($scope, $state, $stateParams, $ngRedux, resultsActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.isShowExpandBtn = $state.router.globals.$current.name !== 'results';

    this.go = function (id, source) {
      $state.go('results-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };

    this.setCurrentPageData = function (data) {
      if (data.results.data) {
        this.results = data.results.data;

        serviceFormatted.formattingTablesDate(this.results, ['dateCreated', 'sampleTaken'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['sampleTaken', 'testName', 'dateCreated', 'source'];
        
        usSpinnerService.stop('resultsSummary-spinner');
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.resultsLoad = resultsActions.all;
    this.resultsLoad($stateParams.patientId);
  }
}

const ResultsListComponent = {
  template: templateResultsList,
  controller: ResultsListController
};

ResultsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'resultsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default ResultsListComponent;