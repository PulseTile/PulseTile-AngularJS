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
let templateGenericMdtCreate= require('./generic-mdt-create.html');

class GenericMdtCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, genericmdtActions, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = genericmdtActions.all;
    $scope.actionCreateDetail = genericmdtActions.create;

    $scope.genericMdt = {};
    $scope.genericMdt.dateSubmitted = new Date();
    $scope.genericMdt.relationshipCode = 'at0039';
    $scope.genericMdt.relationshipTerminology = 'local';
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('genericMdt', {
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
    $scope.create = function (mdtForm, genericMdt) {
      $scope.formSubmitted = true;

      if (mdtForm.$valid) {
        serviceFormatted.propsToString(genericMdt);
        $scope.actionCreateDetail($stateParams.patientId, genericMdt);
      }
    };
    /* istanbul ignore next */
    this.setCurrentPageData = function (data) {
      if (data.genericmdt.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.genericMdt.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const GenericMdtCreateComponent = {
  template: templateGenericMdtCreate,
  controller: GenericMdtCreateController
};

GenericMdtCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'genericmdtActions', 'serviceRequests', 'serviceFormatted'];
export default GenericMdtCreateComponent;