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
let templatePatientsBanner = require('./patients-banner.html');

class PatientsBannerController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions) {
    
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.patient = data.patientsGet.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getPatient:  this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.mobileShowInfo = '';

    this.showInfo = function() {
      if ($scope.mobileShowInfo === 'show') {
        $scope.mobileShowInfo = '';
      } else {
        $scope.mobileShowInfo = 'show';
      }
    }
  }
}

const PatientsBannerComponent = {
  template: templatePatientsBanner,
  controller: PatientsBannerController
};

PatientsBannerController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions'];
export default PatientsBannerComponent;