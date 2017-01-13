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
  constructor($scope, $window, $rootScope, $state, $stateParams, $ngRedux, searchReport, Patient, serviceRequests, patientsActions) {
    serviceRequests.publisher('headerTitle', {title: 'Search results', isShowTitle: true});

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
    this.query = '';
    this.isFilter = false;

    function getPageInfo(info) {
      var from = (15 * info.page - 14);
      var to = 0;
      var totalPages = 0;

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

    function getData() {
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
        $rootScope.subHeader = $stateParams.queryType + $stateParams.searchString;
        var searchPatientQuery = {
          orderType: $stateParams.orderType,
          pageNumber: $stateParams.pageNumber,
          searchString: $stateParams.searchString
        };

        searchReport.searchByPatient(searchPatientQuery);
        searchType = 'patient';
      }
    }

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

    this.processCounts = function (countString) {
      return countString === null ? 0 : countString;
    };

    this.processDateFormat = function (dateString) {
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
      this.pageInfoText = getPageInfo(this.pagingInfo);
    };

    this.setDataRequest = function (result) {
      if (result.data) {
        switch (searchType) {
          case 'settings': {
            this.patients = result.data.patientDetails;
            this.pagingInfo.totalItems = result.data.totalPatients;

            if (this.pagingInfo.totalItems === 0) {
              this.noResults = 'There are no results that match your search criteria';
            } else {
              this.processData();
            }

            break;
          }
          case 'table': {
            this.patients = result.data.patientDetails;
            this.pagingInfo.totalItems = result.data.totalPatients;

            if (this.pagingInfo.totalItems === 0) {
              this.noResults = 'There are no results that match your search criteria';
            } else {
              this.processData();
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

              if (this.pagingInfo.totalItems === 0) {
                this.noResults = 'There are no results that match your search criteria';
              } else {
                this.processData();
              }
            break;
          }
          default: {
            break;
          }
        }
      }
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

    // $scope.$watch('this.pagingInfo.page', function (page) {
    //   // this.pagingInfo.page = page;
    //   $stateParams.pageNumber = page;
    //   getData();
    // });

    this.clickGetItem = false;
    this.go = function (patient) {
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
      error: state.user.error,
      user: state.user.data,
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
    };

    getData();
  }
}

const PatientsSummaryComponent = {
  template: templatePatientsListFull,
  controller: PatientsListFullController
};

PatientsListFullController.$inject = ['$scope', '$window', '$rootScope', '$state', '$stateParams', '$ngRedux', 'searchReport', 'Patient', 'serviceRequests', 'patientsActions'];
export default PatientsSummaryComponent;