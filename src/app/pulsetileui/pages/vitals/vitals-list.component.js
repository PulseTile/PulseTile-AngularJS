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
let templateVitalsList = require('./vitals-list.html');

class VitalsListController {
  constructor($scope, $state, $stateParams, $ngRedux, vitalsActions, serviceRequests, usSpinnerService, $window, $timeout, serviceVitalsSigns, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    vitalsActions.clear();
    this.actionLoadList = vitalsActions.all;

    $scope.chart = null;
    $scope.vitals;
    $scope.viewList = 'tableNews';

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'vitals-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'vitals';
    /* istanbul ignore next */
    this.create = function () {
      $state.go('vitals-create', {
        patientId: $stateParams.patientId
      });
    };
    /* istanbul ignore next */
    $scope.go = function (id, vital) {
      serviceRequests.viewList = $scope.viewList;

      $state.go('vitals-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: vital
      });
    }.bind(this);
    /* istanbul ignore next */
    function formatDate(date) {
      var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      
      var dd = date.getDate();
      if (dd < 10) dd = '0' + dd;

      var mm = month[date.getMonth()];

      var yy = date.getFullYear() % 100;
      if (yy < 10) yy = '0' + yy;

      var hh = date.getHours();
      if (hh < 10) hh = '0' + hh;

      var min = date.getMinutes();
      if (min < 10) min = '0' + min;

      return {
        date: dd + '-' + mm + '-' + yy,
        time: hh + ':' + min
      };
    }
    /* istanbul ignore next */
		$scope.getChartDataSet = function(vitals) {
			var tempDate;
			var lastDate = '';
			var dataChart = {
				labels: []
			};
			var datasetsData = {
				diastolicBP: [],
				systolicBP: [],
				temperature: [],
				heartRate: [],
				respirationRate: [],
				oxygenSaturation: []
			};

			/* istanbul ignore next  */
			for (var i = 0; i < vitals.length; i++) {
				tempDate = formatDate(new Date(+vitals[i]['dataCreatedSource']));

				if (lastDate === tempDate.date) {
					dataChart.labels.push(tempDate.time);
				} else {
					lastDate = tempDate.date;
					dataChart.labels.push(tempDate.date + ' ' + tempDate.time);
				}

				datasetsData.diastolicBP.push(vitals[i].diastolicBP);
				datasetsData.systolicBP.push(vitals[i].systolicBP);
				datasetsData.temperature.push(vitals[i].temperature);
				datasetsData.heartRate.push(vitals[i].heartRate);
				datasetsData.respirationRate.push(vitals[i].respirationRate);
				datasetsData.oxygenSaturation.push(vitals[i].oxygenSaturation);
			}

			dataChart.datasets = [
				{
					label: "Resp",
					backgroundColor: "rgba(13, 141, 5, 0.4)",
					borderColor: "rgba(13, 141, 5, 1)",
					pointBorderColor: "rgba(13, 141, 5, 1)",
					pointBackgroundColor: "rgba(13, 141, 5, 1)",
					data: datasetsData.respirationRate,
				}, {
					label: "SpO2",
					backgroundColor: "rgba(219, 0, 120, 0.4)",
					borderColor: "rgba(219, 0, 120, 1)",
					pointBorderColor: "rgba(219, 0, 120, 1)",
					pointBackgroundColor: "rgba(219, 0, 120, 1)",
					data: datasetsData.oxygenSaturation,
				}, {
					label: "HR",
					backgroundColor: "rgba(70, 124, 174, 0.4)",
					borderColor: "rgba(70, 124, 174, 1)",
					pointBorderColor: "rgba(70, 124, 174, 1)",
					pointBackgroundColor: "rgba(70, 124, 174, 1)",
					data: datasetsData.heartRate,
				}, {
					label: "SBP",
					backgroundColor: "rgba(236, 109, 28, 0.4)",
					borderColor: "rgba(236, 109, 28, 1)",
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(236, 109, 28, 1)",
					pointBackgroundColor: "rgba(236, 109, 28, 1)",
					data: datasetsData.systolicBP,
				}, {
					label: "DBP",
					backgroundColor: "rgba(5, 186, 195, 0.4)",
					borderColor: "rgba(5, 186, 195, 1)",
					pointBorderColor: "rgba(5, 186, 195, 1)",
					pointBackgroundColor: "rgba(5, 186, 195, 1)",
					data: datasetsData.diastolicBP,
				}, {
					label: "Temp",
					backgroundColor: "rgba(221, 43, 8, 0.4)",
					borderColor: "rgba(221, 43, 8, 1)",
					pointBorderColor: "rgba(221, 43, 8, 1)",
					pointBackgroundColor: "rgba(221, 43, 8, 1)",
					data: datasetsData.temperature,
				}
			];
			return dataChart;
    };
    /* istanbul ignore next */
    $scope.chartLoad = function(vitals) {
      var dataChart = $scope.getChartDataSet(vitals);
      var options = {
          capBezierPoints: false,
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              fill: false,
              tension: 0,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderWidth: 5,
              pointRadius: 1,
              pointHoverBorderWidth: 8,
              pointHoverRadius: 1,
              pointHitRadius: 8,
            }
          },
          tooltips: {
            mode: 'label',
            titleMarginBottom: 15,
            bodySpacing: 10,
            xPadding: 10,
            yPadding: 10,
            caretSize: 0,
            callbacks: {
              label: function(tooltipItem, data) {
                return '  ' + data.datasets[tooltipItem.datasetIndex].label + ' : ' + tooltipItem.yLabel;
              }
            }
          },
          scales: {
            xAxes: [{
              ticks: {
                  maxRotation: 90,
                  minRotation: 90
              }
            }]
          }
      };

      var canvas = document.getElementById("vitalNewsChart");
      var ctx = canvas.getContext("2d");
			$scope.chart = new $window.Chart(ctx, {
          type: 'line',
          data: dataChart,
          options: options
      });
     
      canvas.onclick = function(ev){
        var activePoint = $scope.chart.getElementAtEvent(ev)[0];
        var vital;

        if (activePoint) {
          vital = $scope.vitals[activePoint._index];
          this.go(vital.sourceId, vital);
        }
      }.bind(this);
    };
    /* istanbul ignore next */
    $scope.getVitalsForChart = function () {
			var currentPage = $scope.currentPage || 1;
			var vitals = angular.copy($scope.dateForChart);
			vitals = vitals.map(function(item) {
			  item['dataCreatedSource'] = item['dateCreated'];
			  return item;
      });
			serviceFormatted.formattingTablesDate(vitals, ['dateCreated'], serviceFormatted.formatCollection.DDMMMYYYY);
			var filteringVitals = vitals.filter(function (item) {
        return serviceFormatted.formattedSearching(item, $scope.queryFilter);
			});
			return filteringVitals.slice((currentPage - 1) * 10, currentPage * 10);
    };
    /* istanbul ignore next */
    $scope.chartUpdate = function() {
      if ($scope.isViewList('chartNews') && $scope.chart) {
        var vitals = $scope.getVitalsForChart();
        var dataChart = $scope.getChartDataSet(vitals);
				$scope.chart.data.datasets = dataChart.datasets;
				$scope.chart.data.labels = dataChart.labels;
				$scope.chart.update();
      }
    };
    /* istanbul ignore next */
    $scope.isViewList = function (viewName) {
      return $scope.viewList === viewName;
    };

    /* istanbul ignore next */
    $scope.changeViewList = function (viewName) {
      var vitalsForChart;
      $scope.viewList = viewName;

      if ($scope.dateForChart) {
        if (viewName === 'chartNews') {
          vitalsForChart = $scope.getVitalsForChart();

          $timeout(function(){
            $scope.chartLoad(vitalsForChart);
          }, 0);
        }
      }
    }.bind(this);
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.vitals;
      const pagesInfo = store.pagesInfo;
      const pluginName = 'vitals';

      if (serviceRequests.checkIsCanLoadingListData(state, pagesInfo, pluginName, $stateParams.patientId)) {
        this.actionLoadList($stateParams.patientId);
        serviceRequests.setPluginPage(pluginName);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        $scope.dateForChart = serviceVitalsSigns.modificateVitalsArr(state.data);
        $scope.vitals = angular.copy(state.data);

        serviceFormatted.formattingTablesDate($scope.vitals, ['dateCreated'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['id', 'dateCreated', 'newsScore', 'source'];

        $scope.changeViewList(serviceRequests.viewList || 'tableNews');
      }
      if (state.data || state.error) {
        usSpinnerService.stop('list-spinner');
        setTimeout(() => { usSpinnerService.stop('list-spinner') }, 0);
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const VitalsListComponent = {
  template: templateVitalsList,
  controller: VitalsListController
};

VitalsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'vitalsActions', 'serviceRequests', 'usSpinnerService', '$window', '$timeout', 'serviceVitalsSigns', 'serviceFormatted'];
export default VitalsListComponent;