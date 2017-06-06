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
let templateUiKit = require('./ui-kit.html');

class UiKitController {
    constructor($scope, $state, serviceRequests, deviceDetector, ConfirmationDocsModal, serviceVitalsSigns, $window, $timeout) {
      serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: null, name: 'ui-kit'});
      serviceRequests.publisher('headerTitle', {title: 'UI OVERVIEW', isShowTitle: true});

      $scope.isOpenSidebar = false;
      $scope.isTouchDevice = deviceDetector.detectDevice();
      $scope.fullPanelClass = '';
      $scope.logoFileParams = {};

      /* istanbul ignore next */
      $scope.isMobileScreen = function () {
        if (window.innerWidth > 767) {
          return false;
        }
        
        return true;
      };

      /* istanbul ignore next */
      $scope.scrollTo = function (id) {
        var $elm = $('#' + id);
        
        $("body").animate({scrollTop: $elm.offset().top - 60}, "slow");
        
        if ($scope.isMobileScreen()) {
          $scope.isOpenSidebar = false;
        }
      }

      // Pagination
        $scope.paginateArr = [];
        for (var i = 0; i < 20; i++) {
          $scope.paginateArr.push(i + 1);
        }
      // Pagination

      // Custom Select
        $scope.themes =   [
          {
            id: 'green',
            name: 'Green Theme',
            baseColor: '#0D672F'
          }, {
            id: 'red',
            name: 'Red Theme',
            baseColor: 'red',
          }, {
            id: 'blue',
            name: 'Blue Theme',
            baseColor: 'blue',
          }, {
            id: 'brown',
            name: 'Brown Theme',
            baseColor: 'brown',
          }, {
            id: 'yellow',
            name: 'Yellow Theme',
            baseColor: 'yellow',
          },
        ];
        $scope.selectedTheme = {
          id: 'green',
          name: 'Green Theme',
          baseColor: '#0D672F'
        };
      // Custom Select

      /* istanbul ignore next */
      $scope.toggleSidebar = function () {
        $scope.isOpenSidebar = !$scope.isOpenSidebar;
      };

      /* istanbul ignore next */
      $scope.toggleFullPanelClass = function (panelName) {
        if ($scope.fullPanelClass == panelName) {
          $scope.fullPanelClass = '';
        } else {
          $scope.fullPanelClass = panelName;
        }
        return $scope.fullPanelClass ? 'full-panel full-panel-' + $scope.fullPanelClass : '';
      };
      /* istanbul ignore next */
      $scope.getFullPanelClass = function () {
        return $scope.fullPanelClass ? 'full-panel full-panel-' + $scope.fullPanelClass : '';
      };

      // Selectable
        $scope.suggestions = [{
          text: 'Item 1',
          code: 1
        }, {
          text: 'Item 2',
          code: 2
        }, {
          text: 'Item 3',
          code: 3
        }, {
          text: 'Item 4',
          code: 4
        }, {
          text: 'Item 5',
          code: 5
        }]
        $scope.chosenOrders = [];
        $scope.idSelectedLeft = null;
        $scope.idSelectedRight = null;

        /* istanbul ignore next */
        $scope.setSelectedLeft = function (idSelectedLeft) {
            $scope.idSelectedRight = null;
            $scope.idSelectedLeft = idSelectedLeft;
        };

        /* istanbul ignore next */
        $scope.setSelectedRight = function (idSelectedRight) {
            $scope.idSelectedLeft = null;
            $scope.idSelectedRight = idSelectedRight;
        };

        /* istanbul ignore next */
        $scope.toggleSelectedItem = function (idSelected) {
            if ($scope.isInSuggestionsList(idSelected)) {
                $scope.setSelectedLeft(idSelected);
                for (var i = 0; i < $scope.suggestions.length; i++) {
                    if ($scope.suggestions[i].code === $scope.idSelectedLeft) {
                        $scope.chosenOrders.push($scope.suggestions[i]);
                        $scope.suggestions.splice(i, 1);
                    }
                }
            } else {
                $scope.setSelectedRight(idSelected);
                for (var a = 0; a < $scope.chosenOrders.length; a++) {
                    if ($scope.chosenOrders[a].code === $scope.idSelectedRight) {
                        $scope.suggestions.push($scope.chosenOrders[a]);
                        $scope.chosenOrders.splice(a, 1);
                    }
                }
            }
            if ($scope.chosenOrders.length === 0) {
                $scope.firstPage = true;
            }
        };

        /* istanbul ignore next */
        $scope.isInSuggestionsList = function (idSelected) {
            for (var b = 0; b < $scope.suggestions.length; b++) {
                if ($scope.suggestions[b].code === idSelected) {
                    return true;
                }
            }
            return false;
        };

        /* istanbul ignore next */
        $scope.chooseItem = function () {
            for (var d = 0; d < $scope.suggestions.length; d++) {
                if ($scope.suggestions[d].code === $scope.idSelectedLeft) {
                    $scope.chosenOrders.push($scope.suggestions[d]);
                    $scope.suggestions.splice(d, 1);
                }
            }
        };
        /* istanbul ignore next */
        $scope.chooseAll = function () {
            var d;
            for (d = $scope.suggestions.length - 1; d >= 0; d--) {
                $scope.chosenOrders.push($scope.suggestions[d]);
                $scope.suggestions.splice(d, 1);
            }
        };
        /* istanbul ignore next */
        $scope.cancelItem = function () {
            for (var c = 0; c < $scope.chosenOrders.length; c++) {
                if ($scope.chosenOrders[c].code === $scope.idSelectedRight) {
                    $scope.suggestions.push($scope.chosenOrders[c]);
                    $scope.chosenOrders.splice(c, 1);
                }
            }
        };
        /* istanbul ignore next */
        $scope.cancelAll = function () {
            for (var d = $scope.chosenOrders.length - 1; d >= 0; d--) {
                $scope.suggestions.push($scope.chosenOrders[d]);
                $scope.chosenOrders.splice(d, 1);
            }
        };
      // Selectable


      // Modal
        /* istanbul ignore next */
        this.openModal = function (patient, state) {
          ConfirmationDocsModal.openModal(function () {});
        };
      // Modal

      // Slider Range
        $scope.agesSteps = [];
        var step;

        for (var i = 0; i < 100; i += 5) {
          step = {
            value: i
          };
          if (i % 10 === 0) {
            step.legend = i.toString();
          }
          $scope.agesSteps.push(step);
        }
        $scope.agesSteps.push({
          value: 100,
          legend: '100+'
        });

        $scope.sliderRange = {
          minValue: 0,
          maxValue: 100,
          options: {
            floor: 0,
            ceil: 100,
            step: 5,
            showTicks: true,
            showTicksValues: false,
            stepsArray: $scope.agesSteps
          },
        };
      // Slider Range

      // Scrollbar
        $scope.configScrollbar = {
          mouseWheel: { enable: true },
          contentTouchScroll: 50,
          documentTouchScroll: true,
        }
      // Scrollbar

      // Timeline
        $scope.eventsTimeline = { 
          "1490745600000":[{"sourceId":"dcf0fb6e-1b66-4a36-aa85-1445242184f5","source":"marand","serviceTeam":"test","dateOfAppointment":1490745600000,"timeOfAppointment":36000000,"sideDateInTimeline":"left","type":"Appointment"},{"sourceId":"0946c543-b607-46c7-82ad-0ec435e69e16","source":"marand","serviceTeam":"test4","dateOfAppointment":1490745600000,"timeOfAppointment":36000000,"sideDateInTimeline":"right","type":"Appointment"},{"sourceId":"a3e90b6c-e020-4eaa-a912-f353e586ac4e","source":"marand","serviceTeam":11111,"dateOfAppointment":1490745600000,"timeOfAppointment":36000000,"sideDateInTimeline":"left","type":"Appointment"}],
          "1490227200000":[{"sourceId":"0cbf0731-d250-4f9b-9a51-2c59690378f1","source":"marand","serviceTeam":"test1142","dateOfAppointment":1490227200000,"timeOfAppointment":43200000,"sideDateInTimeline":"left","type":"Appointment"},{"sourceId":"6d4b6bf1-b4f0-47eb-ad96-5fb2fd8ab340","source":"marand","serviceTeam":"eeeee2","dateOfAppointment":1490227200000,"timeOfAppointment":43200000,"sideDateInTimeline":"right","type":"Appointment"},{"sourceId":"162819dc-7bea-4790-bb63-98e3218961d7","source":"marand","serviceTeam":"test2","dateOfAppointment":1490227200000,"timeOfAppointment":43200000,"sideDateInTimeline":"left","type":"Appointment"},{"sourceId":"5f3d8770-244c-4fb6-8c62-0fa0d4a794aa","source":"marand","serviceTeam":"qwerty1","dateOfAppointment":1490227200000,"timeOfAppointment":43200000,"sideDateInTimeline":"right","type":"Appointment"}],
          "1490140800000":[{"sourceId":"0ec243f9-aa81-4f05-acb8-63e184350815","source":"marand","serviceTeam":"test","dateOfAppointment":1490140800000,"timeOfAppointment":43200000,"sideDateInTimeline":"left","type":"Appointment"},{"sourceId":"418e3708-9fd5-4e20-be8d-1b66a3fa7fde","source":"marand","serviceTeam":"test","dateOfAppointment":1490140800000,"timeOfAppointment":43200000,"sideDateInTimeline":"right","type":"Appointment"}],
          "1490054400000":[{"sourceId":"0c99cd60-8a7f-4741-8cb1-3f725b85f58b","source":"marand","serviceTeam":11,"dateOfAppointment":1490054400000,"timeOfAppointment":43200000,"sideDateInTimeline":"left","type":"Appointment"},{"sourceId":"7612f9bf-a09b-4745-9bba-1dd10627b049","source":"marand","serviceTeam":"test","dateOfAppointment":1490054400000,"timeOfAppointment":43200000,"sideDateInTimeline":"right","type":"Appointment"},{"sourceId":"572df48c-2a24-44a2-be7a-003abb28c824","source":"marand","serviceTeam":"test3","dateOfAppointment":1490054400000,"timeOfAppointment":43200000,"sideDateInTimeline":"left","type":"Appointment"},{"sourceId":"99b5c419-77e5-4e9a-8830-baa7939c5ee1","source":"marand","serviceTeam":"test123","dateOfAppointment":1490054400000,"timeOfAppointment":43200000,"sideDateInTimeline":"right","type":"Appointment"}],
          "1489968000000":[{"sourceId":"9422bae6-4341-4710-ba1c-a7d68f052e5d","source":"marand","serviceTeam":"RippleT5","dateOfAppointment":1489968000000,"timeOfAppointment":50400000,"sideDateInTimeline":"left","type":"Appointment"},{"sourceId":"fc2766d3-11c6-4d1a-8f10-cee148924754","source":"marand","serviceTeam":"test","dateOfAppointment":1489968000000,"timeOfAppointment":43200000,"sideDateInTimeline":"right","type":"Appointment"}],
          "1489881600000":[{"sourceId":"dfedd65b-b22a-4af9-9ee8-1992905d5578","source":"marand","serviceTeam":"qq55","dateOfAppointment":1489881600000,"timeOfAppointment":43200000,"sideDateInTimeline":"left","type":"Appointment"}],
          "1489795200000":[{"sourceId":"46083222-e6d4-4bd7-8513-903321754876","source":"marand","serviceTeam":"qq44","dateOfAppointment":1489795200000,"timeOfAppointment":43200000,"sideDateInTimeline":"right","type":"Appointment"}],
          "1489708800000":[{"sourceId":"268bd303-abd9-4912-bef7-73c3fe4c863b","source":"marand","serviceTeam":"test417","dateOfAppointment":1489708800000,"timeOfAppointment":50400000,"sideDateInTimeline":"left","type":"Appointment"},{"sourceId":"4f300390-0ab3-4626-8e33-d48b6a291f8d","source":"marand","serviceTeam":"test1","dateOfAppointment":1489708800000,"timeOfAppointment":43200000,"sideDateInTimeline":"right","type":"Appointment"},{"sourceId":"28277ffa-1eea-4997-b6c1-5babb4413814","source":"marand","serviceTeam":"eeeee","dateOfAppointment":1489708800000,"timeOfAppointment":43200000,"sideDateInTimeline":"left","type":"Appointment"},{"sourceId":"7b9d8385-5e06-4af4-af20-3ba632a67a4a","source":"marand","serviceTeam":"qq33","dateOfAppointment":1489708800000,"timeOfAppointment":43200000,"sideDateInTimeline":"right","type":"Appointment"},{"sourceId":"97a14306-6d58-4b69-868f-a45b259f0e47","source":"marand","serviceTeam":"qq22","dateOfAppointment":1489708800000,"timeOfAppointment":43200000,"sideDateInTimeline":"left","type":"Appointment"}],
        };
      // Timeline

      // Vitals News 
        $scope.popoverLabels = serviceVitalsSigns.getLabels();
        $scope.vital = {
          respirationRate: 23,
          heartRate: 45,
          newsScore: 12
        }
        /* istanbul ignore next */
        $scope.getHighlighterClass = function (vitalName) {
          return serviceVitalsSigns.getHighlighterClass($scope.vitalStatuses[vitalName]);
        };
      // Vitals News 

      // Info of Patient
        $scope.patientInfo = {
          name: 'Ivor Cox',
          dateOfBirth: '06-Jun-1944',
          telephone: '(011981) 32362',
          gender: 'Male',
          nhsNumber: '999 999 9000',
          gpName: 'Goff Carolyn D.',
          gpAddress: 'Hamilton Practice, 5544 Ante Street, Hamilton, Lanarkshire, N06 5LP',
        } 
        $scope.mobileShowInfo = '';

        /* istanbul ignore next */
        this.showInfo = function() {
          if ($scope.mobileShowInfo === 'show') {
            $scope.mobileShowInfo = '';
          } else {
            $scope.mobileShowInfo = 'show';
          }
        }
      // Info of Patient
      
      // Charts
        // Bar
        /* istanbul ignore next  */
        var canvas, ctx, myChart;
        canvas = document.getElementById("chart-department");
        
        if (canvas) {
          ctx = canvas.getContext("2d");
          myChart = new $window.Chart(ctx, {
              type: 'bar',
              data: {
                  labels: ["Community Care","Hospital","Mental Health","Neighbourhood","Primary Care"],
                  datasets: [{data: [25, 16, 9, 20, 29]}]
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
                    borderColor: 'rgba(36, 161, 116,1)',
                    backgroundColor: 'rgba(36, 161, 116,0.3)',
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
        }
        
        // Line
        var dataChartLine = {
          labels: ["03-Aug-15 01:11","01:23","01:23","01:23","01:23","01:23","01:23","06:11","06:23","06:23"],
          datasets:[
            {"label":"Resp","backgroundColor":"rgba(13, 141, 5, 0.4)","borderColor":"rgba(13, 141, 5, 1)","pointBorderColor":"rgba(13, 141, 5, 1)","pointBackgroundColor":"rgba(13, 141, 5, 1)","data":[25,23,23,23,23,23,23,25,23,23]},
            {"label":"SpO2","backgroundColor":"rgba(219, 0, 120, 0.4)","borderColor":"rgba(219, 0, 120, 1)","pointBorderColor":"rgba(219, 0, 120, 1)","pointBackgroundColor":"rgba(219, 0, 120, 1)","data":[97,97,97,97,97,97,97,97,97,97]},
            {"label":"HR","backgroundColor":"rgba(70, 124, 174, 0.4)","borderColor":"rgba(70, 124, 174, 1)","pointBorderColor":"rgba(70, 124, 174, 1)","pointBackgroundColor":"rgba(70, 124, 174, 1)","data":[45,45,45,45,45,45,45,45,45,45]},
            {"label":"SBP","backgroundColor":"rgba(236, 109, 28, 0.4)","borderColor":"rgba(236, 109, 28, 1)","borderJoinStyle":"miter","pointBorderColor":"rgba(236, 109, 28, 1)","pointBackgroundColor":"rgba(236, 109, 28, 1)","data":[90,92,92,92,92,92,92,90,92,92]},
            {"label":"DBP","backgroundColor":"rgba(5, 186, 195, 0.4)","borderColor":"rgba(5, 186, 195, 1)","pointBorderColor":"rgba(5, 186, 195, 1)","pointBackgroundColor":"rgba(5, 186, 195, 1)","data":[60,64,64,64,64,64,64,60,64,64]},
            {"label":"Temp","backgroundColor":"rgba(221, 43, 8, 0.4)","borderColor":"rgba(221, 43, 8, 1)","pointBorderColor":"rgba(221, 43, 8, 1)","pointBackgroundColor":"rgba(221, 43, 8, 1)","data":[35.4,35.4,35.4,35.4,35.4,35.4,35.4,35.4,35.4,35.4]}
          ]
        };

        var optionsChartLine = {
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
                  /* istanbul ignore next */
                  return '  ' + data.datasets[tooltipItem.datasetIndex].label + ' : ' + tooltipItem.yLabel;
                }
              }
            },
            scales: {
              yAxes: [{
                  ticks: {
                      stepSize: 5
                  }
              }],
              xAxes: [{
                ticks: {
                    maxRotation: 90,
                    minRotation: 90
                }
              }]
            }
        };
        /* istanbul ignore next  */
        var canvasLineChart, ctxLineChart, myLineChart

        canvasLineChart = document.getElementById("vitalNewsChart");

        if (canvasLineChart) {
          ctxLineChart = canvas.getContext("2d");
          myLineChart = new $window.Chart(ctxLineChart, {
              type: 'line',
              data: dataChartLine,
              options: optionsChartLine
          });
        }
      //Charts

      angular.element(document).ready(function () {
        $timeout(function() {
          if (!$scope.isMobileScreen()) {
            $scope.isOpenSidebar = true;
          } else {
            $scope.isOpenSidebar = false;
          }
        }, 100);
      }.bind(this));
    }
}

const UiKitComponent = {
    template: templateUiKit,
    controller: UiKitController
};

UiKitController.$inject = ['$scope', '$state', 'serviceRequests', 'deviceDetector', 'ConfirmationDocsModal', 'serviceVitalsSigns', '$window', '$timeout'];
export default UiKitComponent;