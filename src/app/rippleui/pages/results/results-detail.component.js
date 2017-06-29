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
let templateResultsDetail= require('./results-detail.html');

class ResultsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, resultsActions, usSpinnerService) {

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.results.dataGet) {
        this.result = data.results.dataGet;
        usSpinnerService.stop('resultsDetail-spinner');
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.resultsLoad = resultsActions.get;
    this.resultsLoad($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source);
  }
}

const ResultsDetailComponent = {
  template: templateResultsDetail,
  controller: ResultsDetailController
};

ResultsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'resultsActions', 'usSpinnerService'];
export default ResultsDetailComponent;