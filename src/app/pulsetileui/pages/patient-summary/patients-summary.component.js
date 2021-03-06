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
let templatePatientsSummary = require('./patients-summary.html');
const LOADING_TEXT = 'Loading ...';

class PatientsSummaryController {
  constructor($scope, $state, $stateParams, $ngRedux, $location, patientsActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('headerTitle', {title: 'Patients Summary'});
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-summary'});

    $scope.listsDashboards = {
      problems: {
        show: true,
        title: 'Problems',
        toState: 'diagnoses',
        array: [{text: LOADING_TEXT}, {}, {}, {}]
      },
      contacts: {
        show: true,
        title: 'Contacts',
        toState: 'contacts',
        array: [{text: LOADING_TEXT}, {}, {}, {}]
      },
      allergies: {
        show: true,
        title: 'Allergies',
        toState: 'allergies',
        array: [{text: LOADING_TEXT}, {}, {}, {}]
      },
      medications: {
        show: true,
        title: 'Medications',
        toState: 'medications',
        array: [{text: LOADING_TEXT}, {}, {}, {}]
      },
      // transfers: {
      //   show: true,
      //   title: 'Transfer',
      //   toState: 'transferOfCare',
      //   array: [{text: LOADING_TEXT}, {}, {}, {}]
      // }
    };
    this.countPatientArr = 4;

    /* istanbul ignore if  */
    if (serviceRequests.showListDashboards) {
      for (var dashboard in serviceRequests.showListDashboards) {
        $scope.listsDashboards[dashboard].show = serviceRequests.showListDashboards[dashboard];
      }
    }
    /* istanbul ignore next */
    this.goToSection = function (state) {
      $state.go(state, {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType
      });
    };
    /* istanbul ignore next */
    $scope.changeDashboards = function () {
      var showListDashboards = {};

      for (var dashboard in $scope.listsDashboards) {
        showListDashboards[dashboard] = $scope.listsDashboards[dashboard].show;
      }
      serviceRequests.showListDashboards = showListDashboards;
    };
    /* istanbul ignore next */
    $scope.go = function (state, sourceId) {
      var headerRequest = {};
      headerRequest.patientId = $stateParams.patientId;
      headerRequest.detailsIndex = sourceId;

      $state.go(state +'-detail', headerRequest);
    };

    /* istanbul ignore next  */
    function fillPatientArray(arr, count) {
      for (var i = 0; i < count; i++) {
        arr.push({});
      }
      return arr;
    }
    /* istanbul ignore next  */
    this.setCurrentPageData = function (store) {
      const data = store.patientsGet.data;
      const pluginName = 'patientsSummary';

      if (serviceRequests.checkIsNotCurrentPage(store.pagesInfo, pluginName)) {
        serviceRequests.setPluginPage(pluginName);
      }

      /* istanbul ignore if  */
      if (!data || !data.nhsNumber) {
        return false;
      }
      this.patient = data;

      // Putting it all together dashboards
      for (var dashboard in $scope.listsDashboards) {
        $scope.listsDashboards[dashboard].array = null;
        $scope.listsDashboards[dashboard].array = this.patient[dashboard].slice(0, this.countPatientArr);
      }

      // Fill dashboards empty elements
      for (var dashboard in $scope.listsDashboards) {
        var arr = $scope.listsDashboards[dashboard].array;
        arr = fillPatientArray(arr, this.countPatientArr - arr.length);
      }

      this.transferofCareComposition = this.patient;
      
      var descendingTransferofCareComposition = [];
      for (var x = this.transferofCareComposition.transfers.length - 1; x >= 0; x--) {
        descendingTransferofCareComposition.push(this.transferofCareComposition.transfers[x]);
      }
      
      this.transferofCareComposition.transfers = descendingTransferofCareComposition;
      this.transferofCareComposition = this.transferofCareComposition.transfers.slice(0, 5);

      /* istanbul ignore next */
      usSpinnerService.stop('patientSummary-spinner');
    };

    let unsubscribe = $ngRedux.connect(state => ({
      patient: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
    
    // this.loadPatient = patientsActions.getPatient;
    // this.loadPatient($stateParams.patientId);
  }
}

const PatientsSummaryComponent = {
  template: templatePatientsSummary,
  controller: PatientsSummaryController
};

PatientsSummaryController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', '$location', 'patientsActions', 'serviceRequests', 'usSpinnerService'];
export default PatientsSummaryComponent;