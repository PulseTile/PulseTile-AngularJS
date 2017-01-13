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
  constructor($scope, $state, $stateParams, $ngRedux, resultsActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    this.query = '';
    this.isFilter = false;
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'results';

    this.toggleFilter = function () {
      this.isFilter = !this.isFilter;
    };

    this.sort = function (field) {
      var reverse = this.reverse;
      if (this.order === field) {
        this.reverse = !reverse;
      } else {
        this.order = field;
        this.reverse = false;
      }
    };

    this.sortClass = function (field) {
      if (this.order === field) {
        return this.reverse ? 'sorted desc' : 'sorted asc';
      }
    };

    this.order = serviceRequests.currentSort.order || 'name';
    this.reverse = serviceRequests.currentSort.reverse || false;
    if (serviceRequests.filter) {
      this.query = serviceRequests.filter;
      this.isFilter = true;
    }

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    this.go = function (id, resultSource) {
      serviceRequests.currentSort.order = this.order;
      serviceRequests.currentSort.reverse = this.reverse;
      serviceRequests.filter = this.query || '';

      $state.go('results-detail', {
        patientId: $stateParams.patientId,
        resultIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: resultSource
      });
    };

    this.selected = function (resultIndex) {
      return resultIndex === $stateParams.resultIndex;
    };

    this.search = function (row) {
      return (
          row.testName.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
          row.sampleTaken.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
          row.dateCreated.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
          row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    this.setCurrentPageData = function (data) {
      if (data.results.data) {
        this.results = data.results.data;

        for (var i = 0; i < this.results.length; i++) {
          this.results[i].sampleTaken = moment(this.results[i].sampleTaken).format('DD-MMM-YYYY');
          this.results[i].dateCreated = moment(this.results[i].dateCreated).format('DD-MMM-YYYY');
        }
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

ResultsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'resultsActions', 'serviceRequests', 'usSpinnerService'];
export default ResultsListComponent;