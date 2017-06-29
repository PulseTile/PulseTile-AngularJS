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
let templateReportChart = require('./report-chart.html');

class ReportChartController {
  constructor($scope, $rootScope, $window, $uibModal, $state, $stateParams, searchReport, $timeout, $ngRedux, serviceRequests) {
    var vm = this;

    $rootScope.searchMode = true;
    $rootScope.reportMode = true;
    $rootScope.reportTypeSet = true;
    vm.resultSize = 0;
    vm.noResults = '';

    var requestBody;
    var graphData;
    vm.setDataRequest = function (result) {
      /* istanbul ignore if  */
      if (result.chart.data && !graphData) {
        graphData = [
          {
            series: '11-18',
            value: result.chart.data.agedElevenToEighteen
          },
          {
            series: '19-30',
            value: result.chart.data.agedNineteenToThirty
          },
          {
            series: '31-60',
            value: result.chart.data.agedThirtyOneToSixty
          },
          {
            series: '61-80',
            value: result.chart.data.agedSixtyOneToEighty
          },
          {
            series: '>80',
            value: result.chart.data.agedEightyPlus
          }
        ];

        vm.resultSize = result.chart.data.all;

        /* istanbul ignore if  */
        if (vm.resultSize !== 0) {
          vm.ageChart(graphData);
        } else {
          vm.noResults = 'There are no results that match your search criteria';
        }

      }
        result.chart.data = 0;
    };

    /* istanbul ignore if  */
    if ($stateParams.searchString !== undefined) {
      var searchQuery = $stateParams.searchString.split(':');
      vm.reportType = searchQuery[0];
      vm.searchString = searchQuery[1];
      $rootScope.reportTypeString = vm.reportType;

      if (searchQuery.length === 1) {
        $state.go('patients-charts');
      }

      requestBody = {
        reportType: searchQuery[0],
        searchString: searchQuery[1]
      };
      searchReport.getChart(requestBody);
    } else {
      $state.go('patients-charts');
    }

    let unsubscribe = $ngRedux.connect(state => ({
      getDataRequest: vm.setDataRequest(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

  }
}

const ReportChartComponent = {
  template: templateReportChart,
  controller: ReportChartController
};

ReportChartController.$inject = ['$scope', '$rootScope', '$window', '$uibModal', '$state', '$stateParams', 'searchReport', '$timeout', '$ngRedux', 'serviceRequests'];
export default ReportChartComponent;