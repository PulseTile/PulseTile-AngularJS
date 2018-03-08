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
let templatePatients = require('./patients-list.html');

class PatientsController {
  constructor($scope, $state, $stateParams, $location, $ngRedux, patientsActions, serviceRequests, Patient, serviceFormatted, $timeout, $uibModal, ConfirmationModal, servicePatients) {
    let vm = this;
    
    $scope.patientsCounts = servicePatients.cachePatientsCounts;

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
            width: 150
          },
          address: {
            select: true,
            title: 'Address',
            width: 300
          },
          dateOfBirth: {
            select: true,
            title: 'Born',
            disabled: true,
            width: 105
          },
          gender: {
            select: true,
            title: 'Gender',
            disabled: true,
            width: 90
          }, 
          nhsNumber: {
            select: true,
            title: 'NHS No.',
            width: 115  
          }
        }
      },
      date: {
        title: 'DATE / TIME',
        settings: {
          orders: {
            select: true,
            title: 'Orders',
            width: 110
          },
          results: {
            select: true,
            title: 'Results',
            width: 110
          },
          vitals: {
            select: false,
            title: 'Vitals',
            width: 110
          },
          diagnoses: {
            select: false,
            title: 'Diagnosis',
            width: 130
          }
        }
      },
      count: {
        title: 'COUNT',
        settings: {
          orders: {
            select: true,
            title: 'Orders',
            width: 100
          },
          results: {
            select: true,
            title: 'Results',
            width: 100
          },
          vitals: {
            select: false,
            title: 'Vitals',
            width: 100
          },
          diagnoses: {
            select: false,
            title: 'Diagnosis',
            width: 120
          }
        }
      }
    };
    $scope.patientsTableSettings = {};

    if (serviceRequests.patientsTable) {
      serviceRequests.patientsTable = $scope.patientsTable;
    }
    /* istanbul ignore next */
    $scope.getSearchDescription = function () {
      if ($stateParams.searchDescription) {
        return $stateParams.searchDescription;
      }

      return false;
    };
    /* istanbul ignore next */
    $scope.getCounts = function (patient) {
      if (servicePatients.isQueryPatientsCounts(patient.nhsNumber)) {
        servicePatients.queryPatientCounts(patient.nhsNumber, patient);
      }
    };
    /* istanbul ignore next */
    $scope.changeTableSettings = function () {
      serviceRequests.patientsTable = $scope.patientsTable;
      $scope.resizeFixedTables();
    };

    $scope.hoveredTableRow = -1;
    /* istanbul ignore next */
    $scope.hoverTableRow = function (index) {
      $scope.hoveredTableRow = index;
    }.bind(this);
    /* istanbul ignore next */
    $scope.unHoverTableRow = function () {
      $scope.hoveredTableRow = -1;
    };
    /* istanbul ignore next */
    $scope.getHoveredTableRow = function (index) {
      return $scope.hoveredTableRow == index;
    };

    /* istanbul ignore next */
    $scope.getPatientsTableSettings = function () {
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
      $scope.patientsTableSettings = newSettings;
    };
    $scope.getPatientsTableSettings();
    /* istanbul ignore next */
    $scope.resizeFixedTables = function () {
      $timeout(function () {
        var $wrapTables = $('.wrap-patients-table');

        var $tableNames = $wrapTables.find('.table-patients-name');
        var $tableNamesRows = $tableNames.find('tr');

        var $tableControls = $wrapTables.find('.table-patients-controls');
        var $tableControlsRows = $tableControls.find('tr');

        var $tableFullRows = $('.table-patients-full tr');
        var $tds = $tableFullRows.eq(1).find('td');

        $tableNames.width($tds.eq(0).outerWidth() + 1);
        $tableControls.width($tds.eq($tds.length - 1).outerWidth());
        $tableFullRows.each(function (i, row, rows) {
          var height = $(row).height();
          $tableNamesRows.eq(i).height(height);
          $tableControlsRows.eq(i).height(height);
        });
      });
    };
    /* istanbul ignore next */
    $scope.selectAllSettings = function (key) {
      var settings = $scope.patientsTable[key].settings;
      var isSelectAll = true;

      for (var item in settings) {
        if (settings[item].select === false) {
          isSelectAll = false;
          break;
        }
      }

      for (var item in settings) {
        if (!settings[item].disabled) {
          settings[item].select = !isSelectAll;
        }
      }

      $scope.resizeFixedTables();
    };
    /* istanbul ignore next */
    vm.patientFilter = function (patient) {
      if (vm.filters.department) {
        return (patient.department === vm.filters.department);
      }

      if (vm.filters.ageRange) {
        return (patient.ageRange === vm.filters.ageRange);
      }

      return true;
    };
    /* istanbul ignore next */
    vm.setCurrentPageData = function (data) {
      if (data.patients.data) {
        var curPatients = [];
        angular.forEach(data.patients.data, function (patient) {
          var curPatient = new Patient.patient(patient);
          curPatients.push(curPatient);
        });
        servicePatients.clearCache();
        vm.patients = curPatients.slice();
        serviceFormatted.formattingTablesDate(vm.patients, ['dateOfBirth'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['name', 'address', 'dateOfBirth', 'gender', 'nhsNumber'];
        
        $scope.resizeFixedTables();
      }
    };
    /* istanbul ignore next */
    $(window).on('resize', function () {
      $scope.resizeFixedTables();
    });
    /* istanbul ignore next */
    vm.openModal = function (patient, state) {
      ConfirmationModal.openModal(patient, state);
    };
    /* istanbul ignore next */
    vm.openModalCell = function (patient, key) {
      var reg = /Count|Date/;
      var state = undefined;

      if (reg.test(key)) {
        state = key.replace(/Count|Date/, '');
      } 

      vm.openModal(patient, state);
    };
    /* istanbul ignore next */
    if ($stateParams.patientsList.length === 0 && !$stateParams.displayEmptyTable) {
      vm.filters = {
        department: $stateParams.department,
        ageRange: $stateParams.ageRange
      };

      let unsubscribe = $ngRedux.connect(state => ({
        isFetching: state.patients.isFetching,
        error: state.patients.error,
        // patients: state.patients.data,
        getPatients: vm.setCurrentPageData(state)
      }))(this);

      $scope.$on('$destroy', unsubscribe);

      this.loadPatientsList = patientsActions.loadPatients;
      this.loadPatientsList();
    } else {
      vm.filters = {
        advancedSearch: true,
        advancedSearchParams: $stateParams.advancedSearchParams
      };
      var data = {
        patients: {
          data: $stateParams.patientsList
        }
      }

      vm.setCurrentPageData(data);
      $location.url($location.path());
    }
  }
}

const PatientsComponent = {
  template: templatePatients,
  controller: PatientsController
};

PatientsController.$inject = ['$scope', '$state', '$stateParams', '$location', '$ngRedux', 'patientsActions', 'serviceRequests', 'Patient', 'serviceFormatted', '$timeout', '$uibModal', 'ConfirmationModal', 'servicePatients'];
export default PatientsComponent;