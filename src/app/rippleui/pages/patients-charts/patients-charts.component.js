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
let templatePatientsCharts = require('./patients-charts.html');

class PatientsChartsController {
  constructor($scope, $state, $window, patientsActions, $ngRedux, serviceRequests, $timeout, Patient) {
    serviceRequests.publisher('headerTitle', {title: 'System Dashboard', isShowTitle: true});
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-charts'});
   
    //click on "Spine Lookup"
    this.goToLookUp = function () {
      $state.go('patients-lookup');
    };
    var getOption = function (borderColor, bagroundColor) {
      return {
          capBezierPoints: false,
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          elements: {
            rectangle: {
              backgroundColor: bagroundColor,
              borderColor: borderColor,
              borderWidth: 1,
            }
          },
          tooltips: {
            mode: 'label',
            titleMarginBottom: 15,
            bodySpacing: 10,
            xPadding: 10,
            yPadding: 10,
            callbacks: {
              label: function(tooltipItem) {
                return '  Patients : ' + tooltipItem.yLabel;
              }
            }
          },
          scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true
              }]
          }
      }
    };

    var goToPatients = function (row, chartType) {
      /* istanbul ignore next  */
      switch (chartType) {
        case 'all':
          $state.go('patients-list');
          break;
        case 'age':
          $state.go('patients-list', { ageRange: row.series });
          break;
        case 'summary':
          if (row.series === 'All') {
            row.series = null;
          }
          $state.go('patients-list', { department: row.series });
          break;
        default:
          $state.go('patients-list');
          break;
      }
    };


    var ageChart = function (summaries) {
      /* istanbul ignore next  */
      $timeout(function () {
        $window.Morris.Bar({
          element: 'chart-age',
          resize: true,
          data: summaries.age,
          ykeys: ['value'],
          xkey: 'series',
          labels: ['Patients'],
          hideHover: true,
          barColors: ['#7e29cd'],
          ymin: 0,
          ymax: 46,
          barGap: 4,
          barSizeRatio: 0.55,
          xLabelAngle: 50,
          redraw: true
        }).on('click', function (i, row) {
          goToPatients(row, 'age');
        });
      }, 200);
    };

    var departmentChart = function (summaries) {
      /* istanbul ignore next  */
      $timeout(function () {
        $window.Morris.Bar({
          element: 'chart-department',
          resize: true,
          data: summaries.department,
          ykeys: ['value'],
          xkey: 'series',
          labels: ['Patients'],
          hideHover: true,
          barColors: ['#24a174'],
          ymin: 0,
          ymax: 40,
          barGap: 4,
          barSizeRatio: 0.55,
          xLabelAngle: 50,
          redraw: true
        }).on('click', function (i, row) {
          goToPatients(row, 'summary');
        });
      }, 200);
    };

    var createChart = function (options) {
      /* istanbul ignore next  */
      if (options && options.id && options.data) {
        var canvas, ctx, barChart;
        var labels = [];
        var datasets = [];

        if (options.data) {
          for (var i = 0; i < options.data.length; i++) {
            labels.push(options.data[i].series);
            datasets.push(options.data[i].value);
          }
        }

        $timeout(function () {
          canvas = document.getElementById(options.id);
          ctx = canvas.getContext("2d");
          barChart = new $window.Chart(ctx, {
              type: 'bar',
              data: {
                labels: labels,
                datasets: [{data: datasets}]
              },
              options: getOption(options.borderColor, options.bagroundColor)
          });
          if (options.onClick) {
            canvas.onclick = options.onClick(barChart);
          }
        }, 0);
      }
    };

    var self = this;

    let _ = require('underscore');

    this.goToPatientsList = function () {
      $state.go('patients-list');
    };



    this.getPatients = function (patients) {
      /* istanbul ignore if  */
      if (patients) {
        var summaries = {};
        var changedPatients = [];
        var chartAge;
        var chartDepartment;
        var chartDepartment2;

        angular.forEach(patients, function (patient) {
          var curPatient = new Patient.patient(patient);
          changedPatients.push(curPatient);
        });
        
        summaries.age = _.chain(changedPatients)
          .filter(function (patient) {
            return !!patient.age;
          })
          .countBy(function (patient) {
            return patient.ageRange;
          })
          .map(function (value, key) {
            return {
              series: key,
              value: value
            };
          })
          .sortBy(function (value) {
            return value.series
          })
          .value();

        summaries.department = _.chain(changedPatients)
          .filter(function (patient) {
            return !!patient.department;
          })
          .countBy(function (patient) {
            return patient.department;
          })
          .map(function (value, key) {
            return {
              series: key,
              value: value
            };
          })
          .sortBy(function (value) {
            return value.series;
          })
          .value();

        chartAge = createChart({
          id: "chart-age", 
          data: summaries.age, 
          borderColor: 'rgba(126, 41, 205,1)',
          bagroundColor: 'rgba(126, 41, 205,0.3)',
          onClick: function (chart) {
            return function (ev) {
              var activePoint = chart.getElementAtEvent(ev)[0];
              console.log('activePoint');
              console.log(activePoint);
            }
          }
        });
        createChart({
          id: "chart-department", 
          data: summaries.department, 
          borderColor: 'rgba(36, 161, 116,1)',
          bagroundColor: 'rgba(36, 161, 116,0.3)'
        });
        createChart({
          id: "chart-geography", 
          data: summaries.department, 
          borderColor: 'rgba(255,99,132,1)',
          bagroundColor: 'rgba(255,99,132,0.3)'
        });

        return summaries;
      } else {
        return true;
      }
    };

    // Clear previous chart
    this.toggleChart = function () {
      // angular.element(document.querySelector('#chart-age')).empty();
      // angular.element(document.querySelector('#chart-department')).empty();
      // angular.element(document.querySelector('#chart-geography')).empty();
      // angular.element(document.querySelector('#chart-age')).off('click');
      // angular.element(document.querySelector('#chart-department')).off('click');
      // angular.element(document.querySelector('#chart-geography')).off('click');

      let unsubscribe = $ngRedux.connect(state => ({
        setPatients: self.getPatients(state.patients.data)
      }))(this);

      $scope.$on('$destroy', unsubscribe);

      this.loadPatientsList = patientsActions.loadPatients;
      this.loadPatientsList();
    };

    this.toggleChart();
  }
}

const PatientsChartsComponent = {
  template: templatePatientsCharts,
  controller: PatientsChartsController
};

PatientsChartsController.$inject = ['$scope', '$state', '$window', 'patientsActions', '$ngRedux', 'serviceRequests', '$timeout', 'Patient'];
export default PatientsChartsComponent;
