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
  constructor($scope, $state, $stateParams, $ngRedux, drawingsActions, usSpinnerService, serviceRequests) {

    $scope.isEdit = false;
    $scope.isEditDetail = false;

    /* istanbul ignore next */
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }

      // if (data.drawings.dataGet) {
        // this.drawing = data.drawings.dataGet;
        this.drawing = {
          sourceId: 1,
          name: 'Cardiac Catherization',
          date: new Date(),
          author: 'Dr Jhon Smith',
          source: 'Marand'
        };
        usSpinnerService.stop('detail-spinner');
      // }

      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    /* istanbul ignore next */
    this.edit = function () {
      $scope.isEdit = true;

      $scope.currentUser = this.currentUser;
      $scope.drawingEdit = Object.assign({}, this.drawing);
      $scope.patient = this.currentPatient;

      $scope.drawingEdit.date = new Date();
    };

    /* istanbul ignore next */
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };

    /* istanbul ignore next */
    $scope.confirmEdit = function (drawingForm, drawing) {
      $scope.formSubmitted = true;

      if (drawingForm.$valid && $scope.drawingEdit.records) {
        let toUpdate = {
          name: drawing.name,
          date: drawing.date,
          source: drawing.source
        };

        this.drawing = Object.assign(drawing, toUpdate);
        $scope.isEdit = false;
        
        this.drawingsUpdate($stateParams.patientId, toUpdate);
      }
    }.bind(this);



    /* istanbul ignore next */
    this.editDetail = function () {
      $scope.isEditDetail = true;
      // $scope.currentUser = this.currentUser;
      // $scope.drawingEdit = Object.assign({}, this.drawing);
      // $scope.patient = this.currentPatient;

      // $scope.drawingEdit.date = new Date();
    };

    /* istanbul ignore next */
    this.cancelEditDetail = function () {
      $scope.isEditDetail = false;
    };

    /* istanbul ignore next */
    $scope.confirmEditDetail = function (drawingForm, drawing) {
      $scope.formSubmitted = true;

      if (drawingForm.$valid && $scope.drawingEdit.records) {
        let toUpdate = {
          name: drawing.name,
          date: drawing.date,
          source: drawing.source
        };

        this.drawing = Object.assign(drawing, toUpdate);
        $scope.isEdit = false;
        
        this.drawingsUpdate($stateParams.patientId, toUpdate);
      }
    }.bind(this);


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

DrawingsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'drawingsActions', 'usSpinnerService', 'serviceRequests'];
export default DrawingsDetailComponent;