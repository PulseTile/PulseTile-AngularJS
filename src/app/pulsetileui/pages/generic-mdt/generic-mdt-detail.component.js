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
let templateGenericMdtDetail= require('./generic-mdt-detail.html');

class GenericMdtDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, genericmdtActions, serviceRequests, usSpinnerService) {
    $scope.isEdit = false;
    
    this.edit = function () {
      $scope.isEdit = true;

      $scope.mdtEdit = Object.assign({}, this.genericMdt);
      $scope.mdtEdit.dateSubmitted = new Date();
    };
    
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    
    $scope.confirmEdit = function (mdtForm, genericMdt) {
      $scope.formSubmitted = true;
      if (mdtForm.$valid) {
        $scope.isEdit = false;
        this.genericMdt = Object.assign(this.genericMdt, $scope.mdtEdit);
        $scope.genericmdtUpdate(this.currentPatient.id, this.genericMdt);
      }
    }.bind(this);
    
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.genericmdt.dataGet) {
        this.genericMdt = data.genericmdt.dataGet;
        usSpinnerService.stop('mdtDetail-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.genericmdtLoad = genericmdtActions.get;
    this.genericmdtLoad($stateParams.patientId, $stateParams.detailsIndex);
    $scope.genericmdtUpdate = genericmdtActions.update;
  }
}

const GenericMdtDetailComponent = {
  template: templateGenericMdtDetail,
  controller: GenericMdtDetailController
};

GenericMdtDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'genericmdtActions', 'serviceRequests', 'usSpinnerService'];
export default GenericMdtDetailComponent;