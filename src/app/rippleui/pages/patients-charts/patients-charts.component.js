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
  constructor($scope, $state, $window, patientsActions, $ngRedux, $uibModal, serviceRequests, $timeout, Patient) {
    serviceRequests.publisher('headerTitle', {title: 'System Dashboard', isShowTitle: true});
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-charts'});
    // Selected chart on page load

    //click on "View all Patients"
    var openModal = function (row, chartType) {
      $uibModal.open({
        template: require('app/rippleui/confirmation.html'),
        size: 'md',
        controller: function ($scope) {
          $scope.cancel = function () {
            $scope.$close(true);
          };

          $scope.ok = function () {
            $scope.$close(true);

            switch (chartType) {
              case 'all':
                $state.go('patients-list');
                break;
              case 'age':
                console.log('row.series');
                console.log(row.series);
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
        }
      });
    };

    //click on "Spine Lookup"
    this.goToLookUp = function () {
      $state.go('patients-lookup');
    };

    var goToPatients = function (row, chartType) {
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

    /*
      only for demo
    */
    var geographyChart = function (summaries) {
      $timeout(function () {
        $window.Morris.Bar({
          element: 'chart-geography',
          resize: true,
          data: summaries.age,
          ykeys: ['value'],
          xkey: 'series',
          labels: ['Patients'],
          hideHover: true,
          barColors: ['#ff6666'],
          ymin: 0,
          ymax: 40,
          barGap: 4,
          barSizeRatio: 0.55,
          xLabelAngle: 50,
          redraw: true
        }).on('click', function (i, row) {
          goToPatients(row, 'age');
        });
      }, 200);
    };

    var self = this;

    var swapArrayElements = function (arr, indexA, indexB) {
      var temp = arr[indexA];
      arr[indexA] = arr[indexB];
      arr[indexB] = temp;
    };

    let _ = require('underscore');

    this.goToPatientsList = function () {
      $state.go('patients-list');
    };



    this.getPatients = function (patients) {
      if (patients) {
        var summaries = {};
        var changedPatients = [];

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
          .reverse()
            .value();

        swapArrayElements(summaries.age, 3, 4);

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
            return value.department;
          })
          .value();

        ageChart(summaries);
        departmentChart(summaries);
        geographyChart(summaries);

        return summaries;
      } else {
        return true;
      }
    };

    // Clear previous chart
    this.toggleChart = function () {
      angular.element(document.querySelector('#chart-age')).empty();
      angular.element(document.querySelector('#chart-department')).empty();
      angular.element(document.querySelector('#chart-geography')).empty();
      angular.element(document.querySelector('#chart-age')).off('click');
      angular.element(document.querySelector('#chart-department')).off('click');
      angular.element(document.querySelector('#chart-geography')).off('click');

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

PatientsChartsController.$inject = ['$scope', '$state', '$window', 'patientsActions', '$ngRedux', '$uibModal', 'serviceRequests', '$timeout', 'Patient'];
export default PatientsChartsComponent;
