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
let templateHeightAndWeightDetail= require('./heightAndWeight-detail.html');

class HeightAndWeightDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, heightAndWeightActions, usSpinnerService, serviceRequests) {

    $scope.formDisabled = true;
    /* istanbul ignore next */
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.heightAndWeight.dataGet) {
        this.heightAndWeight = data.heightAndWeight.dataGet;
        usSpinnerService.stop("heightAndWeightsDetail-spinner");
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.heightAndWeightLoad = heightAndWeightActions.get;
    this.heightAndWeightLoad($stateParams.patientId, $stateParams.heightAndWeightIndex);
  }
}

const HeightAndWeightDetailComponent = {
  template: templateHeightAndWeightDetail,
  controller: HeightAndWeightDetailController
};

HeightAndWeightDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'heightAndWeightActions', 'usSpinnerService', 'serviceRequests'];
export default HeightAndWeightDetailComponent;