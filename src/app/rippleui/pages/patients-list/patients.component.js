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
let templatePatients = require('./patients-list.html');

class PatientsController {
  constructor($scope, $state, $stateParams, $location, $ngRedux, patientsActions, serviceRequests, Patient, serviceFormatted, $timeout) {
    let vm = this;

    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-list'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Lists', isShowTitle: true});
    
    $scope.patientsTable = serviceRequests.patientsTable || {
      info: {
        title: 'PATIENT INFO',
        settings: {
          name: {
            select: true,
            title: 'Name',
            disabled: true,
            width: 200
          },
          address: {
            select: true,
            title: 'Address',
            width: 400
          },
          dateOfBirth: {
            select: true,
            title: 'Born',
            disabled: true,
            width: 200
          },
          gender: {
            select: true,
            title: 'Gender',
            disabled: true,
            width: 200
          }, 
          nhsNumber: {
            select: true,
            title: 'NHS No.',
            width: 200
          }
        }
      },
      date: {
        title: 'DATE / TIME',
        settings: {
          orders: {
            select: false,
            title: 'Orders',
            width: 150
          },
          results: {
            select: false,
            title: 'Results',
            width: 150
          },
          vitals: {
            select: false,
            title: 'Vitals',
            width: 150
          },
          diagnosis: {
            select: false,
            title: 'Diagnosis',
            width: 150
          }
        }
      },
      count: {
        title: 'COUNT',
        settings: {
          orders: {
            select: false,
            title: 'Orders',
            width: 150
          },
          results: {
            select: false,
            title: 'Results',
            width: 150
          },
          vitals: {
            select: false,
            title: 'Vitals',
            width: 150
          },
          diagnosis: {
            select: false,
            title: 'Diagnosis',
            width: 150
          }
        }
      }
    };
    $scope.patientsTableSettings = {};

    if (serviceRequests.patientsTable) {
      serviceRequests.patientsTable = $scope.patientsTable;
    }

    $scope.changeTableSettings = function () {
      serviceRequests.patientsTable = $scope.patientsTable;
      $scope.resizeFixedTables();
    };

    $scope.getpatientsTableSettings = function () {
      var newSettings = {};
      for (var key in $scope.patientsTable.info.settings) {
        newSettings[key] = $scope.patientsTable.info.settings[key];
        newSettings[key].type = 'info';
      }
      for (var key in $scope.patientsTable.date.settings) {
        newSettings[key + 'Date'] = $scope.patientsTable.date.settings[key];
        newSettings[key + 'Date'].type = 'date';
        newSettings[key + 'Count'] = $scope.patientsTable.count.settings[key];
        newSettings[key + 'Count'].type = 'count';
      }
      console.log('newSettings');
      console.log(newSettings);
      $scope.patientsTableSettings = newSettings;
    };
    $scope.getpatientsTableSettings();

    $scope.resizeFixedTables = function () {
      $timeout(function () {
        var $wrapTables = $('.wrap-patients-table');

        var $tableNames = $wrapTables.find('.table-patients-name');
        var $tableNamesRows = $tableNames.find('tr');

        var $tableControls = $wrapTables.find('.table-patients-controls');
        var $tableControlsRows = $tableControls.find('tr');

        var $tableFullRows = $('.table-patients-full tr');
        var $tds = $tableFullRows.eq(1).find('td');

        $tableNames.width($tds.eq(0).outerWidth());
        $tableControls.width($tds.eq($tds.length - 1).outerWidth());
        $tableFullRows.each(function (i, row, rows) {
          var height = $(row).height();
          $tableNamesRows.eq(i).height(height);
          $tableControlsRows.eq(i).height(height);
        });
      });
    }

    $scope.selectAllSettings = function (key) {
      var settings = $scope.patientsTable[key].settings

      for (var item in settings) {
        settings[item].select = true;
      }
      $scope.resizeFixedTables();
    };

    vm.go = function (patient, state) {
      if (state != undefined) {
        $state.go(state, {
          patientId: patient.id,
        });
      } else {
        $state.go('patients-summary', {
          patientId: patient.id,
          patientsList: vm.patients
        });
      }
    };

    vm.patientFilter = function (patient) {
      if (vm.filters.department) {
        return (patient.department === vm.filters.department);
      }

      if (vm.filters.ageRange) {
        return (patient.ageRange === vm.filters.ageRange);
      }

      return true;
    };

    vm.setPatients = function (patients) {
      var curPatients = [];

      angular.forEach(patients, function (patient) {
        var curPatient = new Patient.patient(patient);
        curPatients.push(curPatient);
      });

      vm.patients = curPatients.slice();
      serviceFormatted.formattingTablesDate(vm.patients, ['dateOfBirth'], serviceFormatted.formatCollection.DDMMMYYYY);
      serviceFormatted.filteringKeys = ['name', 'address', 'dateOfBirth', 'gender', 'nhsNumber'];
      
      $scope.resizeFixedTables();
    };
    $(window).on('resize', function () {
      $scope.resizeFixedTables();
    });

    if ($stateParams.patientsList.length === 0 && !$stateParams.displayEmptyTable) {
      vm.filters = {
        department: $stateParams.department,
        ageRange: $stateParams.ageRange
      };

      let unsubscribe = $ngRedux.connect(state => ({
        isFetching: state.patients.isFetching,
        error: state.patients.error,
        // patients: state.patients.data,
        getPatients: vm.setPatients(state.patients.data)
      }))(this);

      $scope.$on('$destroy', unsubscribe);

      this.loadPatientsList = patientsActions.loadPatients;
      this.loadPatientsList();
    } else {
      // vm.patients = $stateParams.patientsList;
      vm.filters = {
        advancedSearch: true,
        advancedSearchParams: $stateParams.advancedSearchParams
      };
      vm.setPatients($stateParams.patientsList);
      $location.url($location.path());

    }
  }
}

const PatientsComponent = {
  template: templatePatients,
  controller: PatientsController
};

PatientsController.$inject = ['$scope', '$state', '$stateParams', '$location', '$ngRedux', 'patientsActions', 'serviceRequests', 'Patient', 'serviceFormatted', '$timeout'];
export default PatientsComponent;