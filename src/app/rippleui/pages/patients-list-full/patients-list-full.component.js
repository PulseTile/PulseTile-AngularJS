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
let templatePatientsListFull = require('./patients-list-full.html');

class PatientsListFullController {
  constructor($scope, $window, $rootScope, $state, $stateParams, $ngRedux, searchReport, Patient, serviceRequests, patientsActions, $timeout, ConfirmationModal, serviceFormatted, searchActions, servicePatients) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-list-full'});
    serviceRequests.publisher('headerTitle', {title: 'Search results', isShowTitle: true});

    $scope.patientsCounts = servicePatients.cachePatientsCounts;

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

    $scope.getCounts = function (patient) {
      if (servicePatients.isQueryPatientsCounts(patient.nhsNumber)) {
        servicePatients.queryPatientCounts(patient.nhsNumber, patient);
      }
    };

    if (serviceRequests.patientsTable) {
      serviceRequests.patientsTable = $scope.patientsTable;
    }

    $scope.changeTableSettings = function () {
      serviceRequests.patientsTable = $scope.patientsTable;
      $scope.resizeFixedTables();
    };

    $scope.hoveredTableRow = -1;
    $scope.hoverTableRow = function (index) {
      $scope.hoveredTableRow = index;
    };
    $scope.unHoverTableRow = function () {
      $scope.hoveredTableRow = -1;
    };
    $scope.getHoveredTableRow = function (index) {
      return $scope.hoveredTableRow == index;
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

        $tableNames.width($tds.eq(0).outerWidth() + 1);
        $tableControls.width($tds.eq($tds.length - 1).outerWidth());
        $tableFullRows.each(function (i, row, rows) {
          var height = $(row).height();
          $tableNamesRows.eq(i).height(height);
          $tableControlsRows.eq(i).height(height);
        });
      });
    };

    $(window).on('resize', function () {
      $scope.resizeFixedTables();
    });

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

    this.openModal = function (patient, state) {
      ConfirmationModal.openModal({id: patient.nhsNumber }, state);
    };
    this.openModalCell = function (patient, key) {
      var reg = /Count|Date/;
      var state = undefined;

      if (reg.test(key)) {
        state = key.replace(/Count|Date/, '');
      } 

      this.openModal(patient, state);
    };

    var searchType;

    this.pagingInfo = {
      page: 1,
      totalItems: 0,
      orderType: 'ASC'
    };

    this.noResults = '';
    this.tab = 'patientInfo';
    this.tabName = 'Patient Info';
    this.patients = [];
    $rootScope.searchMode = true;

    this.getPageInfo = function (info) {
      var from = (15 * info.page - 14);
      var to = 0;
      var totalPages = 0;
      /* istanbul ignore if  */
      if (info.totalItems % 15 === 0) {
        totalPages = info.totalItems / 15;
      } else {
        totalPages = Math.floor(info.totalItems / 15) + 1;
      }

      if (info.page === totalPages) {
        to = from + info.totalItems % 15 - 1;
      } else {
        to = info.page * 15;
      }

      var total = from + ' to ' + to + ' of ' + info.totalItems;
      return total;
    };


    $scope.searchByDetails = function (queryParams, queryType) {
      /* istanbul ignore if */
      if (queryParams && queryParams.dateOfBirth) {
        queryParams.dateOfBirth = new Date(queryParams.dateOfBirth.getTime() - (60000 * queryParams.dateOfBirth.getTimezoneOffset()));
      }

      this.searchResult = queryType === 'advanced' ? searchActions.advancedSearch : searchActions.querySearch;
      this.searchResult(queryParams);
    };

    this.getData = function () {
      /* istanbul ignore if  */
      if ($stateParams.queryType === 'Setting: ') {
        $rootScope.settingsMode = true;
        $rootScope.reportMode = false;
        $rootScope.patientMode = false;
        $rootScope.subHeader = $stateParams.queryType + $stateParams.searchString;
        var patientListQuery = {
          searchString: $stateParams.searchString,
          orderType: $stateParams.orderType,
          pageNumber: $stateParams.pageNumber
        };
        searchReport.getSettingsTable(patientListQuery);
        searchType = 'settings';
        /* istanbul ignore if  */
      } else if ($stateParams.queryType === 'Reports: ') {
        $rootScope.reportMode = true;
        $rootScope.settingsMode = false;
        $rootScope.patientMode = false;
        $rootScope.reportTypeSet = true;
        $rootScope.reportTypeString = $stateParams.reportType;
        $rootScope.subHeader = $stateParams.queryType + $stateParams.reportType + ': ' + $stateParams.searchString + ' & Aged ' + $stateParams.ageFrom + ' to ' + $stateParams.ageTo;

        var patientReportListQuery = {
          ageFrom: $stateParams.ageFrom,
          ageTo: $stateParams.ageTo,
          orderType: $stateParams.orderType,
          pageNumber: $stateParams.pageNumber,
          reportType: $stateParams.reportType,
          searchString: $stateParams.searchString
        };

        searchReport.getTable(patientReportListQuery);
        searchType = 'table';
      } else {
        $rootScope.reportMode = false;
        $rootScope.settingsMode = false;
        $rootScope.reportTypeSet = false;
        $rootScope.patientMode = true;
         
        if ($stateParams.queryType === 'Patient: ') {
          searchType = 'patient';

          $rootScope.subHeader = $stateParams.queryType + $stateParams.searchString;
          var searchPatientQuery = {
            orderType: $stateParams.orderType,
            pageNumber: $stateParams.pageNumber,
            searchString: $stateParams.searchString
          };

          searchReport.searchByPatient(searchPatientQuery);

        } else {
          $rootScope.subHeader = 'Search Result';
          searchType = 'advanced';

          $scope.searchByDetails($stateParams.searchParams, $stateParams.queryType);
        }
      }
    }

    this.processCounts = function (countString) {
      return countString === null ? 0 : countString;
    };

    this.processDateFormat = function (dateString) {
      /* istanbul ignore if  */
      if (dateString === null) {
        return 'N/A';
      }
      dateString = moment(dateString);
      if (moment().diff(dateString, 'days') < 1) {
        return dateString.format('h:mm a');
      }
      if (moment().startOf('year') <= dateString) {
        return dateString.format('DD-MMM');
      }
      if (moment().startOf('year').subtract(1, 'year') < dateString) {
        return dateString.format('MMM-YY');
      }
      return dateString.format('YYYY');
    };

    this.processData = function () {
      /* istanbul ignore next  */
      for (var i = 0; i < this.patients.length; i++) {
        this.patients[i].ordersHeadline.latestEntry = this.processDateFormat(this.patients[i].ordersHeadline.latestEntry);
        this.patients[i].vitalsHeadline.latestEntry = this.processDateFormat(this.patients[i].vitalsHeadline.latestEntry);
        this.patients[i].medsHeadline.latestEntry = this.processDateFormat(this.patients[i].medsHeadline.latestEntry);
        this.patients[i].resultsHeadline.latestEntry = this.processDateFormat(this.patients[i].resultsHeadline.latestEntry);
        this.patients[i].treatmentsHeadline.latestEntry = this.processDateFormat(this.patients[i].treatmentsHeadline.latestEntry);
        this.patients[i].ordersHeadline.totalEntries = this.processCounts(this.patients[i].ordersHeadline.totalEntries);
        this.patients[i].vitalsHeadline.totalEntries = this.processCounts(this.patients[i].vitalsHeadline.totalEntries);
        this.patients[i].medsHeadline.totalEntries = this.processCounts(this.patients[i].medsHeadline.totalEntries);
        this.patients[i].resultsHeadline.totalEntries = this.processCounts(this.patients[i].resultsHeadline.totalEntries);
        this.patients[i].treatmentsHeadline.totalEntries = this.processCounts(this.patients[i].treatmentsHeadline.totalEntries);
      }
      this.pagingInfo.orderType = $stateParams.orderType;
      this.pagingInfo.page = $stateParams.pageNumber;
      this.pageInfoText = this.getPageInfo(this.pagingInfo);
    };

    this.setDataRequest = function (result) {
      /* istanbul ignore if  */
      if (result.data) {
        servicePatients.clearCache();

        switch (searchType) {
          case 'settings': {
            this.patients = result.data.patientDetails;
            this.pagingInfo.totalItems = result.data.totalPatients;

            if (this.pagingInfo.totalItems === 0) {
              this.noResults = 'There are no results that match your search criteria';
            } else {
              // this.processData();
            }

            break;
          }
          case 'table': {
            this.patients = result.data.patientDetails;
            this.pagingInfo.totalItems = result.data.totalPatients;

            if (this.pagingInfo.totalItems === 0) {
              this.noResults = 'There are no results that match your search criteria';
            } else {
              // this.processData();
            }

            break;
          }
          case 'patient': {
            // this.patients = result.data.patientDetails;
              var patients = [];

              angular.forEach(result.data.patientDetails, function (patient) {
                var curPatient = new Patient.patient(patient);
                patients.push(curPatient);
              });

              this.patients = patients;
              this.pagingInfo.totalItems = result.data.totalPatients;

              serviceFormatted.formattingTablesDate(this.patients, ['dateOfBirth'], serviceFormatted.formatCollection.DDMMMYYYY);
              serviceFormatted.filteringKeys = ['name', 'address', 'dateOfBirth', 'gender', 'nhsNumber'];

              if (this.pagingInfo.totalItems === 0) {
                this.noResults = 'There are no results that match your search criteria';
              } else {
                // this.processData();
              }
            break;
          }
          case 'advanced': {
            this.patients = result.data;

            serviceFormatted.formattingTablesDate(this.patients, ['dateOfBirth'], serviceFormatted.formatCollection.DDMMMYYYY);
            serviceFormatted.filteringKeys = ['name', 'address', 'dateOfBirth', 'gender', 'nhsNumber'];

            if (this.pagingInfo.totalItems === 0) {
              this.noResults = 'There are no results that match your search criteria';
            }
          }
          default: {
            break;
          }
        }
      }
      $scope.resizeFixedTables();
    };

    this.viewPatients = function () {
      this.tab = 'patientInfo';
      this.tabName = 'Patient Info';
    };

    this.viewDateTime = function () {
      this.tab = 'dateTime';
      this.tabName = 'Date / Time';
    };

    this.viewCounts = function () {
      this.tab = 'counts';
      this.tabName = 'Counts';
    };

    this.clickGetItem = false;
    this.go = function (patient) {
      /* istanbul ignore if  */
      if (!this.clickGetItem) {
        $state.go('patients-summary', {
          patientId: patient.nhsNumber,
          ageFrom: $stateParams.ageFrom,
          ageTo: $stateParams.ageTo,
          orderType: $stateParams.orderType,
          pageNumber: $stateParams.pageNumber,
          reportType: $stateParams.reportType,
          searchString: $stateParams.searchString,
          queryType: $stateParams.queryType
        });
      }
      this.clickGetItem = false;
    };

    this.goToSection = function (itemType, nhsNumber) {
      this.clickGetItem = true;
      var requestHeader = {
        patientId: nhsNumber,
        ageFrom: $stateParams.ageFrom,
        ageTo: $stateParams.ageTo,
        orderType: $stateParams.orderType,
        pageNumber: $stateParams.pageNumber,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      };

      var toState = '';

      switch (itemType) {
        case 'orders':
          toState = 'orders';
          break;
        case 'results':
          toState = 'results';
          break;
        case 'procedures':
          toState = 'procedures';
          break;
        case 'medications':
          toState = 'medications';
          break;
      }
      $state.go(toState, requestHeader);
    };

    this.getItem = function (itemType, nhsNumber, itemId) {
      this.clickGetItem = true;
      var requestHeader = {
        patientId: nhsNumber,
        ageFrom: $stateParams.ageFrom,
        ageTo: $stateParams.ageTo,
        orderType: $stateParams.orderType,
        pageNumber: $stateParams.pageNumber,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      };

      var toState = '';
      /* istanbul ignore next  */
      switch (itemType) {
      case 'orders':
        requestHeader.orderId = itemId;
        toState = 'orders-detail';
        break;
      case 'results':
        requestHeader.resultIndex = itemId;
        toState = 'results-detail';
        break;
      case 'procedures':
        requestHeader.procedureId = itemId;
        toState = 'procedures-detail';
        break;
      case 'medications':
        requestHeader.medicationIndex = itemId;
        toState = 'medications-detail';
        break;
      }
      $state.go(toState, requestHeader);
    };

    let unsubscribe = $ngRedux.connect(state => ({
      user: serviceRequests.currentUserData,
      getDataRequest: this.setDataRequest(state.search)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);

    /*
      TODO: Only for demo
    */
    this.setPatients = function (patients) {
      var curPatients = [];

      angular.forEach(patients.patients.data, function (patient) {
        var curPatient = new Patient.patient(patient);
        curPatients.push(curPatient);
      });

      this.patients = curPatients.slice();

      $scope.resizeFixedTables();
    };

    this.getData();
  }
}

const PatientsSummaryComponent = {
  template: templatePatientsListFull,
  controller: PatientsListFullController
};

PatientsListFullController.$inject = ['$scope', '$window', '$rootScope', '$state', '$stateParams', '$ngRedux', 'searchReport', 'Patient', 'serviceRequests', 'patientsActions', '$timeout', 'ConfirmationModal', 'serviceFormatted', 'searchActions', 'servicePatients'];
export default PatientsSummaryComponent;