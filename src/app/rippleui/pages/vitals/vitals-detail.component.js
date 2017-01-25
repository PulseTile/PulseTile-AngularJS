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
let templateVitalsDetail = require('./vitals-detail.html');

class VitalsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, vitalsActions, serviceRequests, usSpinnerService) {
    $scope.isEdit = false;

    /*
      TODO: Only for demo
    */
    this.vital = $stateParams.source;

    this.edit = function () {
      $scope.isEdit = true;

      $scope.vitalEdit = Object.assign({}, this.vital);
      $scope.vitalEdit.date = new Date();
      $scope.vitalEdit.dateCreated = new Date();
    };
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    $scope.confirmEdit = function (vitalForm, vital) {
      $scope.formSubmitted = true;
      if (vitalForm.$valid) {
        $scope.isEdit = false;
        this.vital = Object.assign(this.vital, $scope.vitalEdit);
        $scope.vitalsUpdate($scope.patient.id, $scope.vital);
      }
    }.bind(this);
    $scope.openDatepicker = function ($event, name) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[name] = true;
    };

    this.setCurrentPageData = function (data) {
      // if (data.vitals.dataGet) {
      //   this.vital = data.vitals.dataGet;
      //   usSpinnerService.stop('vitalDetail-spinner');
      // }
      // this.vital = {
      //   name: 'Influenza',
      //   date: new Date(),
      //   seriesNumber: 1,
      //   source: 'EtherCIS',
      //   comment: 'Hospital staff',
      //   author: 'ripple_osi',
      //   dateCreated: new Date()
      // };
      usSpinnerService.stop('vitalDetail-spinner');
      // if (data.patientsGet.data) {
      //   this.currentPatient = data.patientsGet.data;
      // }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    // this.vitalsLoad = vitalsActions.get;
    // this.vitalsLoad($stateParams.patientId, $stateParams.vitalIndex);
    // $scope.vitalsUpdate = vitalsActions.update;
  }
}

const VitalsDetailComponent = {
  template: templateVitalsDetail,
  controller: VitalsDetailController
};

VitalsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'vitalsActions', 'serviceRequests', 'usSpinnerService'];
export default VitalsDetailComponent;