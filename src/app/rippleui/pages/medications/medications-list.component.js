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
let templateMedicationsList = require('./medications-list.html');

class MedicationsListController {
  constructor($scope, $state, $stateParams, $ngRedux, medicationsActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    this.query = '';
    this.isFilter = false;
    this.isShowCreateBtn = $state.router.globals.$current.name !== 'medications-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'medications';


    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    this.toggleFilter = function () {
      this.isFilter = !this.isFilter;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }


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

    this.go = function (id, medicationSource) {
      serviceRequests.currentSort.order = this.order;
      serviceRequests.currentSort.reverse = this.reverse;
      serviceRequests.filter = this.query;
      $state.go('medications-detail', {
        patientId: $stateParams.patientId,
        medicationIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: medicationSource
      });
    };

    this.selected = function (medicationIndex) {
      return medicationIndex === $stateParams.medicationIndex;
    };


    this.create = function () {
      $state.go('medications-create', {
        patientId: $stateParams.patientId,
        filter: this.query,
        page: this.currentPage
      });
    };
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.medication.data) {
        this.medications = data.medication.data;
        // for (var i = 0; i < this.medications.length; i++) {
        //   this.medications[i].startDate = moment(this.medications[i].startDate).format('DD-MMM-YYYY');
        // }
        /*
          TODO: Remove. Only for demo
        */
        this.medications[0].warning = true;
        this.medications[1].danger = true;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.medicationsLoad = medicationsActions.all;
    this.medicationsLoad($stateParams.patientId);
  }
}

const MedicationsListComponent = {
  template: templateMedicationsList,
  controller: MedicationsListController
};

MedicationsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'serviceRequests', 'usSpinnerService'];
export default MedicationsListComponent;