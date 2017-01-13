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
let templateHeader = require('./header-bar.tmpl.html');

class HeaderController {
  constructor($rootScope, $scope, $state, $stateParams, $ngRedux, patientsActions, AdvancedSearch, serviceRequests) {

    var self = this;

    this.goHome = function () {
      if ($scope.title === 'PHR POC') return; 
      $state.go('patients-list');
    };
    this.goChart = function () {
      $state.go('patients-charts');
    };
    this.goProfile = function () {
      $state.go('profile');
    };
    function deleteCookie(name) {
        document.cookie = name + 
        '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    } 
    this.signout = function () {
      deleteCookie('JSESSIONID');
      location.reload();
    };

    $scope.switchDirectByRole = function (currentUser) {
      if (!currentUser) return;
      // Direct different roles to different pages at login
      switch (currentUser.role) {
        case 'IDCR':
          $state.go('main-search');
          break;
        case 'PHR':
          //Trick for PHR user login
          $scope.loadPatientsAll = patientsActions.loadPatients;
          $scope.loadPatient = patientsActions.getPatient;
          $scope.loadPatientsAll();
          $scope.loadPatient($stateParams.patientId);
          $state.go('patients-summary', {
            patientId: currentUser.nhsNumber
          });
          break;
        default:
          $state.go('patients-summary', {
            patientId: currentUser.nhsNumber
          });
      }
    };

    $scope.setTitle = function (data) {
      $scope.title = data ? data.role + ' POC' : '';
      $scope.switchDirectByRole(data);
    };

    $scope.setLoginData = function (loginResult) {
      $scope.user = loginResult.data;
      $scope.setTitle(loginResult.data);
    };

    $scope.login = function () {
      serviceRequests.login().then(function (result) {
        serviceRequests.currentUserData = result.data;
        $scope.setLoginData(result);
      });
    };

    var auth0;
    
    serviceRequests.initialise().then(function (result){
      
      if (result.data.token) {
        // reset the JSESSIONID cookie with the new incoming cookie

        document.cookie = "JSESSIONID=" + result.data.token;
        location.reload();
        return;
      }

      if (result.data.redirectTo === 'auth0') {
        console.log('running in UAT mode, so now login via auth0');

        if (!auth0) auth0 = new Auth0(result.data.config);
        auth0.login({
          connections: result.data.connections
        });
        return;

      }

      if (result.data.ok) {
        console.log('Cookie was for a valid session, so fetch the simulated user');
        $scope.login();
      }

    }, function (error){
      //for dev and testing
      $scope.login();
    });

    $rootScope.searchExpression = '';
    $rootScope.searchMode = false;
    $rootScope.reportMode = false;
    $rootScope.settingsMode = false;
    $rootScope.patientMode = false;
    $rootScope.reportTypeSet = false;
    $rootScope.reportTypeString = '';

    this.openAdvancedSearch = AdvancedSearch.openAdvancedSearch;
    $scope.search = {};
    $scope.search.searchExpression = $rootScope.searchExpression;
    this.searchBarEnabled = !$state.is('main-search');

    this.containsReportString = function () {
      return $scope.search.searchExpression.indexOf('rp ') === 0;
    };

    this.containsSettingString = function () {
      return $scope.search.searchExpression.lastIndexOf('st ') === 0;
    };

    this.containsPatientString = function () {
      return $scope.search.searchExpression.lastIndexOf('pt ') === 0;
    };

    this.containsReportTypeString = function () {
      for (var i = 0; i < this.reportTypes.length; i++) {
        if ($scope.search.searchExpression.lastIndexOf(this.reportTypes[i]) !== -1) {
          return true;
        }
      }

      return false;
    };

    this.processReportTypeMode = function () {
      for (var i = 0; i < this.reportTypes.length; i++) {
        if ($scope.search.searchExpression.lastIndexOf(this.reportTypes[i]) !== -1) {
          var arr = $scope.search.searchExpression.split(':');

          $rootScope.reportTypeString = arr[0];
          $rootScope.reportTypeSet = true;
          $scope.search.searchExpression = '';
        }
      }

      this.reportTypes = [];
    };

    this.processReportMode = function () {
      if ($scope.search.searchExpression === 'rp ') {
        $scope.search.searchExpression = '';
      }
    };

    this.processSettingMode = function () {
      if ($scope.search.searchExpression === 'st ') {
        $scope.search.searchExpression = '';
      }
    };

    this.processPatientMode = function () {
      if ($scope.search.searchExpression === 'pt ') {
        $scope.search.searchExpression = '';
      }
    };

    this.checkExpression = function (expression) {
      $scope.search.searchExpression = expression;

      // if (this.autoAdvancedSearch) {
      //   if ($scope.search.searchExpression.length >= 3) {
      //     AdvancedSearch.openAdvancedSearch($scope.search.searchExpression);
      //   }
      // } else 
      if ($rootScope.searchMode) {
        if ($rootScope.reportMode && !$rootScope.reportTypeSet) {
          this.reportTypes = [
            'Diagnosis: ',
            'Orders: '
            ];
        }

        if (this.containsReportTypeString() && !this.patientMode) {
          $rootScope.reportTypeSet = true;
          this.processReportTypeMode();
        }
      } else {
        this.reportTypes = [];
        $rootScope.searchMode = (this.containsReportString() || this.containsSettingString() || this.containsPatientString());
        $rootScope.reportMode = this.containsReportString();
        $rootScope.settingsMode = this.containsSettingString();
        $rootScope.patientMode = this.containsPatientString();

        if ($rootScope.reportMode) {
          if (this.containsReportTypeString) {
            this.processReportTypeMode();
          }
          this.processReportMode();
        }

        if ($rootScope.settingsMode) {
          this.processSettingMode();
        }

        if ($rootScope.patientMode) {
          this.processPatientMode();
        }
      }
    };

    this.searchFunction = function () {
      // if (this.autoAdvancedSearch) {
      //   AdvancedSearch.openAdvancedSearch();
      // }

      if ($rootScope.reportTypeSet && $scope.search.searchExpression !== '') {
        var tempExpression = $rootScope.reportTypeString + ': ' + $scope.search.searchExpression;
        $state.go('search-report', {
          searchString: tempExpression
        });
      }

      if ($rootScope.settingsMode && $scope.search.searchExpression !== '') {
        $state.go('patients-list-full', {
          queryType: 'Setting: ',
          searchString: $scope.search.searchExpression,
          orderType: 'ASC',
          pageNumber: '1'
        });
      }

      if ($rootScope.patientMode && $scope.search.searchExpression !== '') {
        $state.go('patients-list-full', {
          queryType: 'Patient: ',
          searchString: $scope.search.searchExpression,
          orderType: 'ASC',
          pageNumber: '1'
        });
      }
    };

    this.cancelSearchMode = function () {
      $rootScope.reportMode = false;
      $rootScope.searchMode = false;
      $rootScope.patientMode = false;
      $rootScope.settingsMode = false;
      $scope.search.searchExpression = '';
      this.reportTypes = '';
      $rootScope.reportTypeSet = false;
      $rootScope.reportTypeString = '';
    };

    this.cancelReportType = function () {
      $rootScope.reportTypeString = '';
      $rootScope.reportTypeSet = false;
    };

    this.currentNavTab = ''; // search, notifications or user

    this.changeNavTab = function(newTab){

      // Is tab already expanded?
      if( this.currentNavTab == newTab ){
        this.currentNavTab = '';
      } else {
        this.currentNavTab = newTab;
      }
    };
    
    this.activeNavTab = function(thisTab){
      if( thisTab == this.currentNavTab ){
        return 'active';
      }
    };
    
    this.getPageComponents = function (data) {
      $scope.userContextViewExists = ('banner' in data.state);
    };
    
    this.clickSidebarBtn = function () {
      serviceRequests.publisher('setHeightSidebar');
      serviceRequests.publisher('changeStateSidebar', {click: true});
    };

    this.getPopulateHeaderSearch = function (expression) {
      $scope.search.searchExpression = expression.headerSearch;
      $scope.searchFocused = true;
      self.searchBarEnabled = expression.headerSearchEnabled;
      $scope.searchBar = expression.headerSearchEnabled;
      self.currentNavTab = 'searchBar';
    };
    this.getPageHeader = function (data) {
      $scope.pageHeader = data.title;
      $scope.isPageHeader = data.isShowTitle;
      $scope.searchBar = data.title === 'Welcome' ? false : true;
    };
    this.checkIsShowPreviousBtn = function () {
      $scope.isShowPreviousBtn = $state.router.globals.$current.name !== 'main-search';
    }
    
    serviceRequests.subscriber('routeState', this.getPageComponents);
    serviceRequests.subscriber('populateHeaderSearch', this.getPopulateHeaderSearch);
    serviceRequests.subscriber('headerTitle', this.getPageHeader);

    angular.element(document).ready(function () {
      this.checkIsShowPreviousBtn()
    }.bind(this));
    
    $rootScope.$on('$locationChangeStart', function() {
      this.checkIsShowPreviousBtn()
    }.bind(this));
  }

}

const HeaderComponent = {
  template: templateHeader,
  controller: HeaderController
};

HeaderController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'AdvancedSearch', 'serviceRequests'];
export default HeaderComponent;
