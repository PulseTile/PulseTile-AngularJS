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
  constructor($scope, $state, $stateParams, $ngRedux, vitalsActions, serviceRequests, usSpinnerService) {
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
  }
}

const VitalsListComponent = {
  template: templateVitalsList,
  controller: VitalsListController
};

VitalsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'vitalsActions', 'serviceRequests', 'usSpinnerService'];
export default VitalsListComponent;