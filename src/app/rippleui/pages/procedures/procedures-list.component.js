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
let templateProceduresList = require('./procedures-list.html');

class ProceduresListController {
  constructor($scope, $state, $stateParams, $ngRedux, proceduresActions, serviceRequests, ProceduresModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    $scope.query = '';

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      $scope.query = $stateParams.filter;
    }

    this.go = function (id, allergySource) {
      $state.go('procedures-detail', {
        patientId: $stateParams.patientId,
        procedureId: id,
        filter: $scope.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: allergySource
      });
    };

    this.search = function (row) {
      return (
        row.name.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.date.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.time.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    this.selected = function (procedureId) {
      return procedureId === $stateParams.procedureId;
    };

    this.create = function () {
      ProceduresModal.openModal(this.currentPatient, {title: 'Create Procedure'}, {}, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.procedures.data) {
        this.procedures = data.procedures.data;

        for (var i = 0; i < this.procedures.length; i++) {
          if (angular.isNumber(this.procedures[i].date)) {
            this.procedures[i].date = moment(this.procedures[i].date).format('DD-MMM-YYYY');
          } else if (this.procedures[i].date === null) {
            this.procedures[i].date = '';
          }

          if (angular.isNumber(this.procedures[i].time)) {
            this.procedures[i].time = moment(this.procedures[i].time).format('HH:mm');
          } else if (this.procedures[i].time === null) {
            this.procedures[i].time = '';
          }
        }
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.proceduresLoad = proceduresActions.all;
    this.proceduresLoad($stateParams.patientId);
  }
}

const ProceduresListComponent = {
  template: templateProceduresList,
  controller: ProceduresListController
};

ProceduresListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'proceduresActions', 'serviceRequests', 'ProceduresModal', 'usSpinnerService'];
export default ProceduresListComponent;