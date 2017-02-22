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
  constructor($scope, $state, $stateParams, $ngRedux, diagnosesActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'diagnoses-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'diagnoses';

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      
      if (data.diagnoses.data) {
        this.diagnoses = data.diagnoses.data;
        
        serviceFormatted.formattingTablesDate(this.diagnoses, ['dateOfOnset'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['problem', 'dateOfOnset', 'source'];
      }
      
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };
    
    this.go = function (id, diagnosisSource) {
      $state.go('diagnoses-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: diagnosisSource
      });
    };

    this.create = function () {
      $state.go('diagnoses-create', {
        patientId: $stateParams.patientId
      });
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

DiagnosesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'diagnosesActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default DiagnosesListComponent;