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
let templateVitalsList = require('./vitals-list.html');

class VitalsListController {
  constructor($scope, $state, $stateParams, $ngRedux, vitalsActions, serviceRequests, usSpinnerService, $window, $timeout) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.vitals;
    this.currentPage = 1;
    $scope.viewList;

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'vitals-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'vitals';

    


    this.sort = function (field) {
      var reverse = this.reverse;
      if (this.order === field) {
        this.reverse = !reverse;
      } else {
        this.order = field;
        this.reverse = false;
      }
    };

    this.sortClass = function (field) {
      if (this.order === field) {
        return this.reverse ? 'sorted desc' : 'sorted asc';
      }
    };

    this.order = serviceRequests.currentSort.order || 'id';
    this.reverse = serviceRequests.currentSort.reverse || false;


    this.create = function () {
      $state.go('vitals-create', {
        patientId: $stateParams.patientId,
        page: this.currentPage
      });
    };

    $scope.go = function (id, vital) {
      serviceRequests.currentSort.order = this.order;
      serviceRequests.currentSort.reverse = this.reverse;
      serviceRequests.viewList = $scope.viewList;

      $state.go('vitals-detail', {
        // patientId: $stateParams.patientId,
        // vitalIndex: id,
        // page: this.currentPage,
        // reportType: $stateParams.reportType,
        // searchString: $stateParams.searchString,
        // queryType: $stateParams.queryType

        patientId: $stateParams.patientId,
        vitalIndex: id,
        page: this.currentPage,
        reportType: null,
        searchString: null,
        queryType: null,
        source: vital
      });
    };
    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    function formatDate(date) {
      var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      
      var dd = date.getDate();
      if (dd < 10) dd = '0' + dd;

      var mm = month[date.getMonth()];

      var yy = date.getFullYear() % 100;
      if (yy < 10) yy = '0' + yy;

      var hh = date.getHours();
      if (hh < 10) hh = '0' + hh;

      var min = date.getMinutes();
      if (min < 10) min = '0' + min;

      return dd + '-' + mm + '-' + yy + ' ' + hh + ':' + min;
    }
    $scope.chartLoad = function(vitals) {
      var dataChart = {
        labels: []
      }
      var datasetsData = {
        diastolicBP: [],
        systolicBP: [],
        temperature: [],
        heartRate: [],
        respirationRate: [],
        oxygenSaturation: []
      }
     
      for (var i = 0; i < vitals.length; i++) {
        dataChart.labels.push(formatDate(new Date(vitals[i].dateCreate)));

        datasetsData.diastolicBP.push(vitals[i].diastolicBP);
        datasetsData.systolicBP.push(vitals[i].systolicBP);
        datasetsData.temperature.push(vitals[i].temperature);
        datasetsData.heartRate.push(vitals[i].heartRate);
        datasetsData.respirationRate.push(vitals[i].respirationRate);
        datasetsData.oxygenSaturation.push(vitals[i].oxygenSaturation);
      }

      dataChart.datasets = [
        {
          label: "DBP",
          backgroundColor: "rgba(5, 186, 195, 0.4)",
          borderColor: "rgba(5, 186, 195, 1)",
          pointBorderColor: "rgba(5, 186, 195, 1)",
          pointBackgroundColor: "rgba(5, 186, 195, 1)",
          data: datasetsData.diastolicBP,
        }, {
          label: "SBP",
          backgroundColor: "rgba(236, 109, 28, 0.4)",
          borderColor: "rgba(236, 109, 28, 1)",
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(236, 109, 28, 1)",
          pointBackgroundColor: "rgba(236, 109, 28, 1)",
          data: datasetsData.systolicBP,
        }, {
          label: "Temp",
          backgroundColor: "rgba(221, 43, 8, 0.4)",
          borderColor: "rgba(221, 43, 8, 1)",
          pointBorderColor: "rgba(221, 43, 8, 1)",
          pointBackgroundColor: "rgba(221, 43, 8, 1)",
          data: datasetsData.temperature,
        }, {
          label: "HR",
          backgroundColor: "rgba(70, 124, 174, 0.4)",
          borderColor: "rgba(70, 124, 174, 1)",
          pointBorderColor: "rgba(70, 124, 174, 1)",
          pointBackgroundColor: "rgba(70, 124, 174, 1)",
          data: datasetsData.heartRate,
        }, {
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
        }
      ]

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
          }
      }


      var canvas = document.getElementById("vitalNewsChart");
      var ctx = canvas.getContext("2d");
      var myLineChart = new $window.Chart(ctx, {
          type: 'line',
          data: dataChart,
          options: options
      });
     
      canvas.onclick = function(ev){
        var activePoint = myLineChart.getElementAtEvent(ev)[0];
        var vital;

        if (activePoint) {
          vital = this.vitals[activePoint._index];
          this.go(vital.sourceId, vital);
        }
      }.bind(this);
    };

    this.setCurrentPageData = function (data) {
      console.log('data');
      console.log(data);
      // if (data.vitals.data) {
      //   this.vitals = data.vitals.data;
      //   usSpinnerService.stop('patientSummary-spinner');
      // }
      /*
        Only for demo
      */

      var date = new Date();
      $scope.vitals = [
        {
          sourceId: '1',  
          source: 'Marand',
          author: 'ripple_osi',
          dateCreate: Date.parse(new Date()),
          respirationRate: 25,
          oxygenSaturation: 97,
          oxygenSupplemental: false,
          systolicBP: 90,
          diastolicBP: 60,
          heartRate: 45,
          temperature: 35.4,
          levelOfConsciousness: 'A',
          newsScore: 3
        }, {
          sourceId: '2',
          source: 'EtherCIS',
          author: 'ripple_osi',
          dateCreate: Date.parse(new Date(date.setDate(date.getDate()-1))),
          respirationRate: 29,
          oxygenSaturation: 115,
          oxygenSupplemental: false,
          systolicBP: 60,
          diastolicBP: 78,
          heartRate: 99,
          temperature: 36.6,
          levelOfConsciousness: 'V',
          newsScore: 3
        }, {
          sourceId: '3',
          source: 'Marand',
          author: 'ripple_osi',
          dateCreate: Date.parse(new Date(date.setDate(date.getDate()-4))),
          respirationRate: 35,
          oxygenSaturation: 69,
          oxygenSupplemental: false,
          systolicBP: 92,
          diastolicBP: 69,
          heartRate: 74,
          temperature: 39.9,
          levelOfConsciousness: 'P',
          newsScore: 2
        }, {
          sourceId: '4',
          source: 'EtherCIS',
          author: 'ripple_osi',
          dateCreate: Date.parse(new Date(date.setDate(date.getDate()-5))),
          respirationRate: 25,
          oxygenSaturation: 97,
          oxygenSupplemental: true,
          systolicBP: 93,
          diastolicBP: 63,
          heartRate: 45,
          temperature: 40.0,
          levelOfConsciousness: 'U',
          newsScore: 1
        },
      ];
      
      usSpinnerService.stop('patientSummary-spinner');
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    this.selected = function (vitalIndex) {
      return vitalIndex === $stateParams.vitalIndex;
    };

    $scope.isViewList = function (viewName) {
      return $scope.viewList === viewName;
    }
    $scope.changeViewList = function (viewName) {
      $scope.viewList = viewName;
      if (viewName === 'chartNews') {
        $timeout(function(){
          $scope.chartLoad($scope.vitals);
        }, 0);
      }
    };
    $scope.changeViewList(serviceRequests.viewList || 'tableNews');


    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    this.vitalsLoad = vitalsActions.all;
    this.vitalsLoad($stateParams.patientId);

   
  }
}

const VitalsListComponent = {
  template: templateVitalsList,
  controller: VitalsListController
};

VitalsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'vitalsActions', 'serviceRequests', 'usSpinnerService', '$window', '$timeout'];
export default VitalsListComponent;