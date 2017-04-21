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
let templateHeightAndWeightList = require('./heightAndWeight-list.html');

class HeightAndWeightListController {
  constructor($scope, $state, $stateParams, $ngRedux, heightAndWeightActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.go = function (id) {
      $state.go('heightAndWeights-detail', {
        patientId: $stateParams.patientId,
        heightAndWeightIndex: id,
        filter: this.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.heightAndWeight.data) {
        this.heightAndWeights = data.heightAndWeight.data;

        for (var i = 0; i < this.heightAndWeights.length; i++) {
          this.heightAndWeights[i].weightRecorded = moment(this.heightAndWeights[i].weightRecorded).format('DD-MMM-YYYY');
          this.heightAndWeights[i].heightRecorded = moment(this.heightAndWeights[i].heightRecorded).format('DD-MMM-YYYY');
        }
        usSpinnerService.stop("patientSummary-spinner");
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.heightAndWeightLoad = heightAndWeightActions.all;
    this.heightAndWeightLoad($stateParams.patientId);
  }
}

const HeightAndWeightListComponent = {
  template: templateHeightAndWeightList,
  controller: HeightAndWeightListController
};

HeightAndWeightListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'heightAndWeightActions', 'serviceRequests', 'usSpinnerService'];
export default HeightAndWeightListComponent;