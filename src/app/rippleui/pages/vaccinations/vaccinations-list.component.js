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
let templateVaccinationsList = require('./vaccinations-list.html');

class VaccinationsListController {
  constructor($scope, $state, $stateParams, $ngRedux, vaccinationsActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.query = '';
    this.currentPage = 1;
    this.isFilter = false;

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'vaccinations-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'vaccinations';
    
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

    this.create = function () {
      $state.go('vaccinations-create', {
        patientId: $stateParams.patientId,
        filter: this.query,
        page: this.currentPage
      });
    };

    this.go = function (id, vaccination) {
      serviceRequests.currentSort.order = this.order;
      serviceRequests.currentSort.reverse = this.reverse;
      serviceRequests.filter = this.query || '';
      id = id || 1;
      $state.go('vaccinations-detail', {
        // patientId: $stateParams.patientId,
        // vaccinationIndex: id,
        // filter: this.query,
        // page: this.currentPage,
        // reportType: $stateParams.reportType,
        // searchString: $stateParams.searchString,
        // queryType: $stateParams.queryType

        patientId: $stateParams.patientId,
        vaccinationIndex: id,
        filter: this.query,
        page: this.currentPage,
        reportType: null,
        searchString: null,
        queryType: null,
        source: vaccination
      });
    };
    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    this.setCurrentPageData = function (data) {
      // if (data.vaccinations.data) {
      //   this.vaccinations = data.vaccinations.data;
      //   usSpinnerService.stop('patientSummary-spinner');
      // }
      var date = new Date();
      this.vaccinations = [
        {
          name: 'Inactivated Poliovirus Vaccine',
          source: 'Marand',
          seriesNumber: 1,
          comment: 'Hospital staff',
          date: date.setDate(date.getDate() - 1),
          author: 'ripple_osi',
          dataCreate: date.setDate(date.getDate() - 1)
        }, {
          name: 'Cell-Culture Influenza Vaccine',
          source: 'EtherCIS',
          seriesNumber: 2,
          comment: 'Hospital staff',
          date: date,
          author: 'ripple_osi',
          dataCreate: date
        }, {
          name: 'Varicella Vaccine',
          source: 'Marand',
          seriesNumber: 3,
          comment: 'Hospital staff',
          date: date.setDate(date.getDate() - 4),
          author: 'ripple_osi',
          dataCreate: date.setDate(date.getDate() - 4)
        }
      ];
      usSpinnerService.stop('patientSummary-spinner');
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    this.selected = function (vaccinationIndex) {
      return vaccinationIndex === $stateParams.vaccinationIndex;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      this.query.$ = $stateParams.filter;
    }

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    // this.vaccinationsLoad = vaccinationsActions.all;
    // this.vaccinationsLoad($stateParams.patientId);
  }
}

const VaccinationsListComponent = {
  template: templateVaccinationsList,
  controller: VaccinationsListController
};

VaccinationsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'vaccinationsActions', 'serviceRequests', 'usSpinnerService'];
export default VaccinationsListComponent;