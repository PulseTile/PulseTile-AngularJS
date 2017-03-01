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

let templateClinicalstatementsList = require('./clinicalstatements-list.html');

class ClinicalstatementsListController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'clinicalStatements-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    $scope.query = '';
    this.isFilter = false;
    this.isShowCreateBtn = $state.router.globals.$current.name !== 'clinicalStatements-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'clinicalStatements';


    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.clinicalStatements.data) {
        this.clinicalStatements = data.clinicalStatements.data;
      }
      usSpinnerService.stop("patientSummary-spinner");

      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    this.toggleFilter = function () {
      this.isFilter = !this.isFilter;
    };
    
    this.create = function () {
      $state.go('clinicalStatements-create', {
        patientId: $stateParams.patientId,
        filter: this.query,
        page: this.currentPage
      });
    };
    
    this.go = function (id, clinicalStatementSource) {
      $state.go('clinicalStatements-detail', {
        patientId: $stateParams.patientId,
        clinicalStatementIndex: id,
        filter: $scope.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: JSON.stringify(clinicalStatementSource)
      });
    };

    this.pageChangeHandler = function (newPage) {
      $scope.currentPage = newPage;
    };

    if ($stateParams.page) {
      $scope.currentPage = $stateParams.page;
    }

    this.search = function (row) {
      return (
        row.author.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.dateCreated.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    if ($stateParams.filter) {
      $scope.query = $stateParams.filter;
    }


    this.selected = function (clinicalStatementIndex) {
      return clinicalStatementIndex === $stateParams.clinicalStatementIndex;
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalstatementsLoad = clinicalstatementsActions.all;
    this.clinicalstatementsLoad($stateParams.patientId);
  }
}

const ClinicalstatementsListComponent = {
  template: templateClinicalstatementsList,
  controller: ClinicalstatementsListController
};

ClinicalstatementsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'serviceRequests', 'usSpinnerService'];
export default ClinicalstatementsListComponent;