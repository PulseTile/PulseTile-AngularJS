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
let templateTransferOfCareList = require('./transfer-of-care-list.html');

class TransferOfCareListController {
  constructor($scope, $state, $stateParams, $ngRedux, transferOfCareActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    this.query = '';

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    this.go = function (id, transferfCareSource) {
      $state.go('transferOfCare-detail', {
        patientId: $stateParams.patientId,
        transferOfCareIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: transferfCareSource
      });
    };

    // this.create = function () {
      // TransferOfCareModal.openModal(this.currentPatient, {title: ''}, {}, this.currentUser);
    // };

    this.selected = function (transferOfCareIndex) {
      return transferOfCareIndex === $stateParams.transferOfCareIndex;
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.transferOfCare.data) {
        this.transferofCareComposition = data.transferOfCare.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.transferofCareLoad = transferOfCareActions.all;
    this.transferofCareLoad($stateParams.patientId);
  }
}

const TransferOfCareListComponent = {
  template: templateTransferOfCareList,
  controller: TransferOfCareListController
};

TransferOfCareListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions', 'serviceRequests', 'usSpinnerService'];
export default TransferOfCareListComponent;