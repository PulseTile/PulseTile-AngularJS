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
let templateProceduresCreate = require('./procedures-create.html');

class ProceduresCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, proceduresActions, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = proceduresActions.all;
    $scope.actionCreateDetail = proceduresActions.create;

    $scope.procedure = {};
    $scope.procedure.dateSubmitted = new Date();
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('procedures', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    /* istanbul ignore next */
    this.cancel = function () {
      this.goList();
    };
    /* istanbul ignore next */
    $scope.create = function (procedureForm, procedure) {
      $scope.formSubmitted = true;

      if (procedureForm.$valid) {
        serviceFormatted.propsToString(procedure);
        $scope.actionCreateDetail($stateParams.patientId, procedure);
      }
    };
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.procedures.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.procedure.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const ProceduresCreateComponent = {
  template: templateProceduresCreate,
  controller: ProceduresCreateController
};

ProceduresCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'proceduresActions', 'serviceRequests', 'serviceFormatted'];
export default ProceduresCreateComponent;