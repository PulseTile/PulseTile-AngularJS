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
let templateEolcareplansList = require('./eolcareplans-list.html');

class EolcareplansListController {
  constructor($scope, $state, $stateParams, $ngRedux, eolcareplansActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.go = function (id) {
      $state.go('eolcareplans-detail', {
        patientId: $stateParams.patientId,
        eolcareplansIndex: id,
        filter: vm.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.eolcareplans.data) {
        this.eolcareplans = data.eolcareplans.data;

        if (this.eolcareplans.length > 0) {
          for (var i = 0; i < this.eolcareplans.length; i++) {
            this.eolcareplans[i].date = moment(this.eolcareplans[i].date).format('DD-MMM-YYYY');
          }
        }
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.eolcareplansLoad = eolcareplansActions.all;
    this.eolcareplansLoad($stateParams.patientId);
  }
}

const EolcareplansListComponent = {
  template: templateEolcareplansList,
  controller: EolcareplansListController
};

EolcareplansListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eolcareplansActions', 'serviceRequests', 'usSpinnerService'];
export default EolcareplansListComponent;