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
    var openModal = function (row, requestBody) {
      $uibModal.open({
        template: require('app/rippleui/confirmation.html'),
        size: 'md',
        controller: function ($scope) {

          $scope.cancel = function () {
            $scope.$close(true);
          };

          $scope.ok = function () {
            $scope.$close(true);
            var ageArr = row.series.split('-');
            var ageFr = 0;
            var ageT = 0;

            if (ageArr.length === 2) {
              ageFr = ageArr[0];
              ageT = ageArr[1];
            } else {
              ageFr = 80;
              ageT = 130;
            }

            $state.go('patients-list-full', {
              queryType: 'Reports: ',
              ageFrom: ageFr,
              ageTo: ageT,
              orderColumn: 'name',
              orderType: 'ASC',
              pageNumber: 1,
              reportType: requestBody.reportType,
              searchString: requestBody.searchString
            });

          };
        }
      });
    };
    var ageChart = function (graphData) {
      $timeout(function () {
        $window.Morris.Bar({
          element: 'age-chart',
          resize: true,
          data: graphData,
          ykeys: ['value'],
          xkey: 'series',
          labels: ['Patients'],
          barColors: ['#7E28CD'],
          ymin: 0,
          ymax: 46,
          barGap: 4,
          barSizeRatio: 0.55,
          xLabelAngle: 50,
          redraw: true
        }).on('click', function (i, row) {
          openModal(row, requestBody);
        });
      }, 200);
    };
    var setDataRequest = function (result) {
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

        if (vm.resultSize !== 0) {
          ageChart(graphData);
        } else {
          vm.noResults = 'There are no results that match your search criteria';
        }

      }
        result.chart.data = 0;
    };

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
      getDataRequest: setDataRequest(state)
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