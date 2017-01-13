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
let templateDiagnosesList = require('./diagnoses-list.html');

class DiagnosesListController {
  constructor($scope, $state, $stateParams, $ngRedux, diagnosesActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    this.query = '';
    this.isFilter = false;
    this.isShowCreateBtn = $state.router.globals.$current.name !== 'diagnoses-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'diagnoses';

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.diagnoses.data) {
        this.diagnoses = data.diagnoses.data;
        for (var i = 0; i < this.diagnoses.length; i++) {
          this.diagnoses[i].dateOfOnset = moment(this.diagnoses[i].dateOfOnset).format('DD-MMM-YYYY');
        }
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };


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

    this.order = serviceRequests.currentSort.order || 'diagnoses';
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

    this.go = function (id, diagnosisSource) {
      serviceRequests.currentSort.order = this.order;
      serviceRequests.currentSort.reverse = this.reverse;
      serviceRequests.filter = this.query || '';
      $state.go('diagnoses-detail', {
        patientId: $stateParams.patientId,
        diagnosisIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: diagnosisSource
      });
    };

    this.create = function () {
      $state.go('diagnoses-create', {
        patientId: $stateParams.patientId,
        filter: this.query,
        page: this.currentPage
      });
    };

    this.selected = function (diagnosisIndex) {
      return diagnosisIndex === $stateParams.diagnosisIndex;
    };

    this.search = function (row) {
      return (
          row.problem.toLowerCase().indexOf(this.query.toLowerCase() || '') !== -1 ||
          row.dateOfOnset.toLowerCase().indexOf(this.query.toLowerCase() || '') !== -1 ||
          row.source.toLowerCase().indexOf(this.query.toLowerCase() || '') !== -1
      );
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    this.diagnosesLoad = diagnosesActions.all;
    this.diagnosesLoad($stateParams.patientId);
  }
}

const DiagnosesListComponent = {
  template: templateDiagnosesList,
  controller: DiagnosesListController
};

DiagnosesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'diagnosesActions', 'serviceRequests', 'usSpinnerService'];
export default DiagnosesListComponent;