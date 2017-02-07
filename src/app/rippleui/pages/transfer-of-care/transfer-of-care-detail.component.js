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
let templateTransferOfCareDetail= require('./transfer-of-care-detail.html');

class TransferOfCareDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, transferOfCareActions, usSpinnerService, serviceRequests) {

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.transferOfCare.dataGet) {
        this.transferOfCare = data.transferOfCare.dataGet;
        this.allergies = data.transferOfCare.dataGet.allergies;
        this.contacts = data.transferOfCare.dataGet.contacts;
        this.problems = data.transferOfCare.dataGet.problems;
        this.medications = data.transferOfCare.dataGet.medications;
        this.dateOfTransfer = data.transferOfCare.dataGet.dateOfTransfer;
        usSpinnerService.stop('transferDetail-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.transferOfCareLoad = transferOfCareActions.get;
    this.transferOfCareLoad($stateParams.patientId, $stateParams.transferOfCareIndex);
  }
}

const TransferOfCareDetailComponent = {
  template: templateTransferOfCareDetail,
  controller: TransferOfCareDetailController
};

TransferOfCareDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions', 'usSpinnerService', 'serviceRequests'];
export default TransferOfCareDetailComponent;