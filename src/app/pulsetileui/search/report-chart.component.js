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
  constructor($scope, $state, $ngRedux, $stateParams, searchActions, serviceRequests, Patient, $window, $timeout, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-charts'});

    let _ = require('underscore');
    $scope.isResults = false;

    var goToPatients = function (row) {
      /* istanbul ignore next */
      var data =  { 
        patientsList: row.patients,
        searchDescription: $scope.getSearchParams(),
        searchString: $stateParams.searchString
      }
      if (row.patients.length === 0) {
        data.displayEmptyTable = true;
      }
      
      $state.go('patients-list', data);
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
          
          if (canvas) {
            ctx = canvas.getContext("2d");
            barChart = new $window.Chart(ctx, {
                type: 'bar',
                data: {
                  labels: labels,
                  datasets: [{data: datasets}]
                },
                options: {
                  capBezierPoints: false,
                  responsive: true,
                  maintainAspectRatio: false,
                  legend: {
                    display: false
                  },
                  elements: {
                    rectangle: {
                      borderColor: options.borderColor,
                      backgroundColor: options.backgroundColor,
                      borderWidth: 1
                    }
                  },
                  tooltips: {
                    enabled: true,
                    mode: 'label',
                    titleMarginBottom: 15,
                    bodySpacing: 10,
                    xPadding: 10,
                    yPadding: 10,
                    callbacks: {
                      label: function(tooltipItem) {
                        /* istanbul ignore next */
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
            });
            if (options.onClick) {
              canvas.onclick = options.onClick(barChart);
            }
          }
        }, 0);
      }
    };

    this.setDataRequest = function (result) {
      if (result.data && result.data.length) {
        $scope.isResults = true;

        var changedPatients = [];
        var patientsAgeData;
        var chartAgeData = {};
        var chartAgeDataKeys = ["11-18", "19-30", "31-60", "61-80", ">80"];

        for (let i = 0; i < chartAgeDataKeys.length; i++) {
          chartAgeData[chartAgeDataKeys[i]] = [];
        }

        angular.forEach(result.data, function (patient) {
          var curPatient = new Patient.patient(patient);
          changedPatients.push(curPatient);
        });

        patientsAgeData = _.chain(changedPatients)
          .filter(function (patient) {
            return !!patient.age;
          })
          .groupBy(function (patient) {
            return patient.ageRange;
          })
          .value();

        chartAgeData = Object.assign(chartAgeData, patientsAgeData);
        
        chartAgeData = _.chain(chartAgeData)
          .mapObject(function(patients, key) {
            return {
              series: key,
              value: patients.length,
              patients: patients
            };
          })
          .toArray()
          .value();

        createChart({
          id: "chart-age", 
          data: chartAgeData, 
          borderColor: 'rgba(126, 41, 205,1)',
          backgroundColor: 'rgba(126, 41, 205,0.3)',
          onClick: function (chart) {
            return function (ev) {
              var activePoint = chart.getElementAtEvent(ev)[0];

              if (activePoint) {
                goToPatients(chartAgeData[activePoint._index]);
              }
            }
          }
        });

      } else {
        $scope.isResults = false;
      }
    };

    var params = {};

    if ($stateParams.searchString !== undefined) {
      params = JSON.parse($stateParams.searchString);
    }

    
    /* istanbul ignore if  */
    if (params !== undefined) {
      if (params.dateOfBirth) {
        const dateOfBirth = new Date(params.dateOfBirth);
        params.dateOfBirth = new Date(dateOfBirth.getTime() - (60000 * dateOfBirth.getTimezoneOffset()));
      }
  
      searchActions.querySearch(params);
    } 

    /* istanbul ignore next */
    $scope.isSearchParams = function () {
      return !!$stateParams.searchString;
    };
    
    /* istanbul ignore next */
    $scope.getSearchParams = function () {
      if (!$scope.isSearchParams()) return '';
      
      var params = {};
      var paramsText = '';
      var paramsArr = [];

      if ($stateParams.searchString !== undefined) {
        params = JSON.parse($stateParams.searchString);
      }

      if (params.type) {
        paramsArr.push({
          key: 'Search Type',
          value: params.type
        });
      }

      if (params.queryContains && params.queryText) {
        paramsArr.push({
          key: 'Search Query',
          value: 'contains "' + params.queryText + '"'
        });
      }

      if ((params.minValue || params.minValue === 0) &&
           params.maxValue) {
        paramsArr.push({
          key: 'Age Range',
          value: params.minValue + '-' + params.maxValue
        });
      } else {
        if (params.dateOfBirth) {
          paramsArr.push({
            key: 'Date of Birth',
            value: serviceFormatted.formattingDate(params.dateOfBirth, serviceFormatted.formatCollection.DDMMMYYYY)
          });
        }
      }

      if (params.sexFemale || params.sexMale) {
        let genderText = '';

        if (params.sexFemale && params.sexMale) {
          genderText = 'All';
        } else if (params.sexFemale) {
          genderText = 'Female';
        } else {
          genderText = 'Male';
        }

        paramsArr.push({
          key: 'Gender',
          value: genderText
        });
      }

      for (var i = 0; i < paramsArr.length; i++) {
        if (i !== 0) {
          paramsText += ', ';
        }

        paramsText += paramsArr[i].key + ': ' + paramsArr[i].value;
      }
      

      return paramsText.length ? paramsText : '';
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getDataRequest: this.setDataRequest(state.search)
    }))(this);

    $scope.$on('$destroy', unsubscribe);
  }
}

const ReportChartComponent = {
  template: templateReportChart,
  controller: ReportChartController
};

ReportChartController.$inject = ['$scope', '$state', '$ngRedux', '$stateParams', 'searchActions', 'serviceRequests', 'Patient', '$window', '$timeout', 'serviceFormatted'];
export default ReportChartComponent;