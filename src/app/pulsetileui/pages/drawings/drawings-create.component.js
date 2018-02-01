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
let templateCreate = require('./drawings-create.html');

class DrawingsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, drawingsActions, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = drawingsActions.all;
    $scope.actionCreateDetail = drawingsActions.create;

    $scope.drawingEdit = {};
    $scope.drawingEdit.dateCreated = new Date();
    $scope.drawingEdit.drawingBase64 = null;

    /* istanbul ignore next */
    this.goList = function () {
      $state.go('drawings', {
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
    this.create = function (drawingForm, drawingEdit) {
      $scope.formSubmitted = true;

      if (drawingForm.$valid && $scope.drawingEdit.drawingBase64) {
        let toAdd = {
          drawingBase64: drawingEdit.drawingBase64,
          name: drawingEdit.name,
          author: drawingEdit.author,
          dateCreated: new Date().getTime(),
          dateUpdated: new Date().getTime(),
        };
        serviceFormatted.propsToString(toAdd);
        $scope.actionCreateDetail($stateParams.patientId, toAdd);
      }
    }.bind(this);

    /* istanbul ignore next */
    $scope.getCanvasImage64 = function (data) {
      $scope.drawingEdit.drawingBase64 = data.image64;
    };
    serviceRequests.subscriber('drawingCanvasChanged', $scope.getCanvasImage64);

    /* istanbul ignore next */
    $scope.resizeDrawing = function () {
      serviceRequests.publisher('resizeDrawing', {});
    };

    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.drawings.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.drawingEdit.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const DrawingsCreateComponent = {
  template: templateCreate,
  controller: DrawingsCreateController
};

DrawingsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'drawingsActions', 'serviceRequests', 'serviceFormatted'];
export default DrawingsCreateComponent;