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
  constructor($scope, $state, $stateParams, $ngRedux, vitalsActions, serviceRequests, usSpinnerService, $window) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.query = '';
    this.currentPage = 1;
    this.isFilter = false;

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'vitals-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'vitals';
    
    this.toggleFilter = function () {
      this.isFilter = !this.isFilter;
    };

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
    if (serviceRequests.filter) {
      this.query = serviceRequests.filter;
      this.isFilter = true;
    }

    this.create = function () {
      $state.go('vitals-create', {
        patientId: $stateParams.patientId,
        filter: this.query,
        page: this.currentPage
      });
    };

    this.go = function (id, vital) {
      serviceRequests.currentSort.order = this.order;
      serviceRequests.currentSort.reverse = this.reverse;
      serviceRequests.filter = this.query || '';
      $state.go('vitals-detail', {
        // patientId: $stateParams.patientId,
        // vitalIndex: id,
        // filter: this.query,
        // page: this.currentPage,
        // reportType: $stateParams.reportType,
        // searchString: $stateParams.searchString,
        // queryType: $stateParams.queryType

        patientId: $stateParams.patientId,
        vitalIndex: id,
        filter: this.query,
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

    this.setCurrentPageData = function (data) {
      // if (data.vitals.data) {
      //   this.vitals = data.vitals.data;
      //   usSpinnerService.stop('patientSummary-spinner');
      // }
      /*
        Only for demo
      */
      var date = new Date();
      this.vitals = [
        {
          sourceId: '1',
          seriesNumber: 1,
          source: 'Marand',
          author: 'ripple_osi',
          dateCreate: Date.parse(new Date()),
          vitalsSigns: {
            respirationRate: {
              value: 25,
              status: 'warning'
            },
            oxygenSaturation: {
              value: 97,
              status: 'danger'
            },
            oxygenSupplemental: {
              value: 'N'
            },
            systolicBP: {
              value: 90,
              status: 'danger'
            }, 
            distolicBP: {
              value: 60,
              status: 'danger'
            },
            heartRate: {
              value: 45,
              status: 'success'
            },
            temperature: {
              value: 35.4,
              status: 'success'
            },
            levelOfConsciousness: {
              value: 'A'
            },
            newsScore: {
              value: 3,
              status: 'danger'
            }
          }
        }, {
          sourceId: '2',
          seriesNumber: 2,
          source: 'EtherCIS',
          author: 'ripple_osi',
          dateCreate: Date.parse(new Date(date.setDate(date.getDate()-1))),
          vitalsSigns: {
            respirationRate: {
              value: 29,
              status: 'warning'
            },
            oxygenSaturation: {
              value: 115,
              status: 'success'
            },
            oxygenSupplemental: {
              value: 'N'
            },
            systolicBP: {
              value: 60,
              status: 'warning'
            }, 
            distolicBP: {
              value: 78,
              status: 'warning'
            },
            heartRate: {
              value: 99,
              status: 'danger'
            },
            temperature: {
              value: 36.6,
              status: 'success'
            },
            levelOfConsciousness: {
              value: 'B'
            },
            newsScore: {
              value: 3
            }
          }
        }, {
          sourceId: '3',
          seriesNumber: 3,
          source: 'Marand',
          author: 'ripple_osi',
          dateCreate: Date.parse(new Date(date.setDate(date.getDate()-4))),
          vitalsSigns: {
            respirationRate: {
              value: 35,
              status: 'danger'
            },
            oxygenSaturation: {
              value: 69,
              status: 'warning'
            },
            oxygenSupplemental: {
              value: 'N'
            },
            systolicBP: {
              value: 92,
              status: 'warning'
            }, 
            distolicBP: {
              value: 69,
              status: 'warning'
            },
            heartRate: {
              value: 74,
              status: 'danger'
            },
            temperature: {
              value: 39.9,
              status: 'success'
            },
            levelOfConsciousness: {
              value: 'C'
            },
            newsScore: {
              value: 2,
              status: 'warning'
            }
          }
        }, {
          sourceId: '4',
          seriesNumber: 4,
          source: 'EtherCIS',
          author: 'ripple_osi',
          dateCreate: Date.parse(new Date(date.setDate(date.getDate()-5))),
          vitalsSigns: {
            respirationRate: {
              value: 25,
              status: 'success'
            },
            oxygenSaturation: {
              value: 97,
              status: 'success'
            },
            oxygenSupplemental: {
              value: 'N'
            },
            systolicBP: {
              value: 93,
              status: 'success'
            }, 
            distolicBP: {
              value: 63,
              status: 'success'
            },
            heartRate: {
              value: 45,
              status: 'success'
            },
            temperature: {
              value: 40.0,
              status: 'success'
            },
            levelOfConsciousness: {
              value: 'D'
            },
            newsScore: {
              value: 1,
              status: 'success'
            }
          }
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

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      this.query.$ = $stateParams.filter;
    }

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    // this.vitalsLoad = vitalsActions.all;
    // this.vitalsLoad($stateParams.patientId);



    /*
      Chart only for demo
    */
    var data = {
        labels: [
          "12-Jan-16 0:00", 
          "12-Jan-16 01:00", 
          "12-Jan-16 02:00", 
          "12-Jan-16 03:00", 
        ],
        datasets: [
          {
              label: "DBP",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(236, 109, 28, 0.4)",
              borderColor: "rgba(236, 109, 28, 1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(236, 109, 28, 1)",
              pointBackgroundColor: "rgba(236, 109, 28, 1)",
              pointBorderWidth: 5,
              pointRadius: 1,
              pointHoverRadius: 1,
              pointHitRadius: 8,
              data: [ 52, 54, 61, 60 ],
          },
          {
              label: "SBP",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(236, 109, 28, 0.4)",
              borderColor: "rgba(236, 109, 28, 1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(236, 109, 28, 1)",
              pointBackgroundColor: "rgba(236, 109, 28, 1)",
              pointBorderWidth: 5,
              pointRadius: 1,
              pointHoverRadius: 1,
              pointHitRadius: 8,
              data: [113, 85, 94, 119 ],
          },
          {
              label: "Temp",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(221, 43, 8, 0.4)",
              borderColor: "rgba(221, 43, 8, 1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(221, 43, 8, 1)",
              pointBackgroundColor: "rgba(221, 43, 8, 1)",
              pointBorderWidth: 5,
              pointRadius: 1,
              pointHoverRadius: 1,
              pointHitRadius: 8,
              data: [36.8, 36.8, 36.2, 36.4 ],
          },
          {
              label: "HR",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(70, 124, 174, 0.4)",
              borderColor: "rgba(70, 124, 174, 1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(70, 124, 174, 1)",
              pointBackgroundColor: "rgba(70, 124, 174, 1)",
              pointBorderWidth: 5,
              pointRadius: 1,
              pointHoverRadius: 1,
              pointHitRadius: 8,
              data: [119, 105, 111, 111 ],
          },
          {
              label: "Resp",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(13, 141, 5, 0.4)",
              borderColor: "rgba(13, 141, 5, 1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(13, 141, 5, 1)",
              pointBackgroundColor: "rgba(13, 141, 5, 1)",
              pointBorderWidth: 5,
              pointRadius: 1,
              pointHoverRadius: 1,
              pointHitRadius: 8,
              data: [23, 22, 25, 25 ],
          },
          {
              label: "SpO2",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(219, 0, 120, 0.4)",
              borderColor: "rgba(219, 0, 120, 1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(219, 0, 120, 1)",
              pointBackgroundColor: "rgba(219, 0, 120, 1)",
              pointBorderWidth: 5,
              pointRadius: 1,
              pointHoverRadius: 1,
              pointHitRadius: 8,
              data: [92, 94, 96, 97 ],
          }
        ],
        apiCalls: ["/api/1/", "/api/2/", "/api/3/", "/api/4/"] 
        /* apiCalls used to link each point within data array to an api call */
    };

    var options = {
        capBezierPoints: false,
        responsive: true,
        maintainAspectRatio: false,
        // scales: {
        //   xAxes: [{
        //     afterTickToLabelConversion: function(data){
        //       var xLabels = data.ticks;

        //       xLabels.forEach(function (labels, i) {
        //         if (i % 2 == 1){
        //           xLabels[i] = '';
        //         }
        //       });
        //     } 
        //   }]   
        // },
        tooltips: {
          mode: 'label',
          titleMarginBottom: 15,
          bodySpacing: 10,
          xPadding: 10,
          yPadding: 10,
          callbacks: {
            label: function(tooltipItem, data) {
              return '  ' + data.datasets[tooltipItem.datasetIndex].label + ' : ' + tooltipItem.yLabel;
            }
          },
          onClick: function(event, legendItem) {
            debugger
          }
        },
    }

    var ctx = document.getElementById("vitalNewsChart").getContext("2d");
    var myLineChart = new $window.Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
    ctx.onclick = function(evt){
        var activePoints = myLineChart.getElementsAtEvent(evt);
        // => activePoints is an array of points on the canvas that are at the same position as the click event.
    };


    // // Click Event
    // canvas.onclick = function (evt) {
    //     var points = chart.getPointsAtEvent(evt);
    //     var index = chart.datasets[0].points.indexOf(points[0]);
    //     $('#targetDiv').html( 'Go to <a href="' + data.apiCalls[index] + '" target="_blank">' + data.apiCalls[index] + '</a>' );
    // };
  }
}

const VitalsListComponent = {
  template: templateVitalsList,
  controller: VitalsListController
};

VitalsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'vitalsActions', 'serviceRequests', 'usSpinnerService', '$window'];
export default VitalsListComponent;