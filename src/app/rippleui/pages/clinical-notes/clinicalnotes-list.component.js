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

let templateClinicalnotesList = require('./clinicalnotes-list.html');

class ClinicalnotesListController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalnotesActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    $scope.query = '';
    this.isFilter = false;
    this.isShowCreateBtn = $state.router.globals.$current.name !== 'clinicalNotes-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'clinicalNotes';


    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.clinicalnotes.data) {
        this.clinicalNotes = data.clinicalnotes.data;
        // for (var i = 0; i < this.clinicalNotes.length; i++) {
        //   this.clinicalNotes[i].dateCreated = moment(this.clinicalNotes[i].dateCreated).format('DD-MMM-YYYY');
        // }
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
      $state.go('clinicalNotes-create', {
        patientId: $stateParams.patientId,
        filter: this.query,
        page: this.currentPage
      });
    };
    
    this.go = function (id, personalNoteSource) {
      $state.go('clinicalNotes-detail', {
        patientId: $stateParams.patientId,
        personalNoteIndex: id,
        filter: $scope.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: JSON.stringify(personalNoteSource)
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
        row.noteType.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.author.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.dateCreated.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    if ($stateParams.filter) {
      $scope.query = $stateParams.filter;
    }


    this.selected = function (personalNoteIndex) {
      return personalNoteIndex === $stateParams.personalNoteIndex;
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalnotesLoad = clinicalnotesActions.all;
    this.clinicalnotesLoad($stateParams.patientId);
  }
}

const ClinicalnotesListComponent = {
  template: templateClinicalnotesList,
  controller: ClinicalnotesListController
};

ClinicalnotesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalnotesActions', 'serviceRequests', 'usSpinnerService'];
export default ClinicalnotesListComponent;