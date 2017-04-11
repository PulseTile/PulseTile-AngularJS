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
let templateProceduresCreate = require('./procedures-create.html');

class ProceduresCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, proceduresActions, serviceRequests) {
    $scope.procedure = {};
    $scope.procedure.dateSubmitted = new Date();

    this.setCurrentPageData = function (data) {
      if (data.procedures.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        $scope.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.procedure.author = $scope.currentUser.email;
      }
    };

    this.goList = function () {
      $state.go('procedures', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.cancel = function () {
      this.goList();
    };

    $scope.create = function (procedureForm, procedure) {
      $scope.formSubmitted = true;

      if (procedureForm.$valid) {

        $scope.proceduresCreate($scope.currentPatient.id, procedure);
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.proceduresCreate = proceduresActions.create;
  }
}

const ProceduresCreateComponent = {
  template: templateProceduresCreate,
  controller: ProceduresCreateController
};

ProceduresCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'proceduresActions', 'serviceRequests'];
export default ProceduresCreateComponent;