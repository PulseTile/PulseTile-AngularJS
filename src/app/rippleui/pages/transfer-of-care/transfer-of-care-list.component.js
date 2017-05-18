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
  constructor($scope, $state, $stateParams, $ngRedux, transferOfCareActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'transferOfcare-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'transferOfcare';

    /* istanbul ignore next */
    this.create = function () {
      $state.go('transferOfCare-create', {
        patientId: $stateParams.patientId
      });
    };

    /* istanbul ignore next */
    this.go = function (id, source) {
      $state.go('transferOfCare-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };

    /* istanbul ignore next */
    this.setCurrentPageData = function (data) {
      if (data.transferOfCare.data) {
        this.transferOfCares = data.transferOfCare.data;

        this.transferOfCares = this.transferOfCares.map(function (el, index) {
          el.transfer = "Transfer #" + (index + 1);
          return el; 
        });

        serviceFormatted.formattingTablesDate(this.transferOfCares, ['transferDateTime'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['transfer', 'from', 'to', 'transferDateTime', 'source'];

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

    this.transferOfCareLoad = transferOfCareActions.all;
    this.transferOfCareLoad($stateParams.patientId);
  }
}

const TransferOfCareListComponent = {
  template: templateTransferOfCareList,
  controller: TransferOfCareListController
};

TransferOfCareListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default TransferOfCareListComponent;