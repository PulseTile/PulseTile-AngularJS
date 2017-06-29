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
let templateVaccinationsList = require('./vaccinations-list.html');

class VaccinationsListController {
  constructor($scope, $state, $stateParams, $ngRedux, vaccinationsActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'vaccinations-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'vaccinations';
    
    this.create = function () {
      $state.go('vaccinations-create', {
        patientId: $stateParams.patientId
      });
    };

    this.go = function (id, source) {
      $state.go('vaccinations-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };
    
    this.setCurrentPageData = function (data) {
      if (data.vaccinations.data) {
        this.vaccinations = data.vaccinations.data;
        
        serviceFormatted.formattingTablesDate(this.vaccinations, ['dateCreated'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['vaccinationName', 'source', 'dateCreated'];

        usSpinnerService.stop('patientSummary-spinner');
      }
      
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    this.vaccinationsLoad = vaccinationsActions.all;
    this.vaccinationsLoad($stateParams.patientId);
  }
}

const VaccinationsListComponent = {
  template: templateVaccinationsList,
  controller: VaccinationsListController
};

VaccinationsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'vaccinationsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default VaccinationsListComponent;