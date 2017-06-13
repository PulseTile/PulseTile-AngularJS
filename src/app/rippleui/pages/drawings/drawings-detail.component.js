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
let templateDrawingsDetail= require('./drawings-detail.html');

class DrawingsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, drawingsActions, usSpinnerService, serviceRequests, $timeout, $window) {

    $scope.isEdit = false;
    $scope.isEditDetail = false;
    $scope.tempDrawingBase64 = '';

    /* istanbul ignore next */
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }

      if (data.drawings.dataGet) {
        $scope.isData = true;
        this.drawing = data.drawings.dataGet;
        usSpinnerService.stop('detail-spinner');
      }

      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    /* istanbul ignore next */
    this.edit = function () {
      $scope.isEdit = true;

      serviceRequests.publisher('showEditCanvas', {drawingBase64: this.drawing.drawingBase64});
    };

    /* istanbul ignore next */
    $scope.getCanvasImage64 = function (data) {
      $scope.tempDrawingBase64 = data.image64;
    };
    serviceRequests.subscriber('drawingCanvasChanged', $scope.getCanvasImage64);

    /* istanbul ignore next */
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };

    /* istanbul ignore next */
    $scope.confirmEdit = function () {
      if ($scope.tempDrawingBase64) {
        this.drawing.drawingBase64 = $scope.tempDrawingBase64;
        $scope.isEdit = false;
        let toUpdate = {
          name: this.drawing.name,
          author: this.drawing.author,
          drawingBase64: this.drawing.drawingBase64
        };

        this.drawingsUpdate($stateParams.patientId, $stateParams.detailsIndex, toUpdate);
      }
    }.bind(this);

    /* istanbul ignore next */
    this.editDetail = function () {
      $scope.isEditDetail = true;
      $scope.currentUser = this.currentUser;
      $scope.drawingEdit = Object.assign({}, this.drawing);
      $scope.patient = this.currentPatient;

      $scope.drawingEdit.dateCreated = new Date();
    };

    /* istanbul ignore next */
    this.cancelEditDetail = function () {
      $scope.isEditDetail = false;
    };

    /* istanbul ignore next */
    $scope.confirmEditDetail = function (drawingForm, drawing) {
      $scope.formSubmitted = true;

      if (drawingForm.$valid) {
        let toUpdate = {
          name: drawing.name,
          author: drawing.author,
          drawingBase64: drawing.drawingBase64
        };

        this.drawing = Object.assign(drawing, toUpdate);
        $scope.isEdit = false;
        
        // this.drawingsUpdate($stateParams.patientId, toUpdate);
        this.drawingsUpdate($stateParams.patientId, $stateParams.detailsIndex, toUpdate);
      }
    }.bind(this);

    /* istanbul ignore next */
    $scope.resizeDrawing = function () {
      serviceRequests.publisher('resizeDrawing', {});
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.drawingsLoad = drawingsActions.get;
    this.drawingsUpdate = drawingsActions.update;
    this.drawingsLoad($stateParams.patientId, $stateParams.detailsIndex);
  }
}

const DrawingsDetailComponent = {
  template: templateDrawingsDetail,
  controller: DrawingsDetailController
};

DrawingsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'drawingsActions', 'usSpinnerService', 'serviceRequests', '$timeout', '$window'];
export default DrawingsDetailComponent;