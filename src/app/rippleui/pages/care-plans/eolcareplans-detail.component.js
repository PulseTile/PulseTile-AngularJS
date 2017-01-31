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
let templateEolcareplansDetail= require('./eolcareplans-detail.html');

class EolcareplansDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, eolcareplansActions, usSpinnerService, serviceRequests) {
    // this.edit = function () {
    //   EolcareplansModal.openModal(this.currentPatient, {title: 'Edit End of Life Care Document'}, this.eolcareplan, this.currentUser);
    // };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.eolcareplans.dataGet) {
        this.eolcareplan = data.eolcareplans.dataGet;
        usSpinnerService.stop('eolcareplansDetail-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.eolcareplansLoad = eolcareplansActions.get;
    this.eolcareplansLoad($stateParams.patientId, $stateParams.eolcareplansIndex);
  }
}

const EolcareplansDetailComponent = {
  template: templateEolcareplansDetail,
  controller: EolcareplansDetailController
};

EolcareplansDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eolcareplansActions', 'usSpinnerService', 'serviceRequests'];
export default EolcareplansDetailComponent;