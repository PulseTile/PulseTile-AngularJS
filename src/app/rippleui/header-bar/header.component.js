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

  constructor($rootScope, $scope, $state, $stateParams, $ngRedux, patientsActions, serviceRequests, socketService, $window) {

    var self = this;
    $scope.title = '';
    // $scope.searchActive = false;
    $scope.isOpenSearch = false;

    $scope.isToogleSearchShow = false;
    $scope.searchShow = false;
    
    this.mainSearchEnabled = true;
    this.showAdvancedSearch = false;

    $scope.searchOption = null;
    $scope.searchOptionsList = [
      // {
      //   name: 'Patient Search',
      //   // type: 'advanced'
      //   type: ''
      // }, 
      {
        name: 'Patient Search - Advanced',
        type: 'advanced'
      }, {
        name: 'Clinical Query',
        type: 'clinicalQuery'
      }
    ];
    
    this.closeAdvancedSearch = function() {
      $scope.isOpenSearch = false;
      $scope.searchOption = null;
    };

    this.openAdvancedSearch = function(index) {
      if (!$scope.searchOptionsList[index].type.length) return;
      
      if ($scope.searchOption && ($scope.searchOptionsList[index].type == $scope.searchOption.type)) {
        this.closeAdvancedSearch();
      } else {
        $scope.isOpenSearch = true;
        $scope.searchOption = $scope.searchOptionsList[index];
        serviceRequests.publisher('openSearchPanel', {});
      }
      
    };
    $scope.isActiveTypeSearch = function (type) {
      if ($scope.searchOption && $scope.searchOption.type === type) {
        return true;
      }

      return false;
    }

    $scope.checkIsToggleSearch = function () {
      if (window.innerWidth < 768) {
        $scope.isToogleSearchShow = true;
      } else {
        $scope.isToogleSearchShow = false;
      }
    };
    $scope.isShowSearch = function () {
      return $scope.searchShow || !$scope.isToogleSearchShow;
    };
    
    $scope.checkIsToggleSearch();
    
    serviceRequests.subscriber('closeAdvancedSearch', this.closeAdvancedSearch);
    
    this.goBack = function () {
      /* istanbul ignore if  */
      if ($scope.title === 'PHR') return;

      switch ($state.router.globals.$current.name) {
        case 'patients-charts': 
				  
          break;
        case 'patients-summary': 
          $state.go('patients-list');
          break;
        case 'patients-list': 
          $state.go('patients-charts');
          break;
        default:
          $state.go('patients-summary', {
            patientId: $stateParams.patientId
          });
      }
    };
    this.goChart = function () {
      /* istanbul ignore if  */
      if ($scope.title === 'PHR') return;

      $state.go('patients-charts');
    };
    
    this.goPatientList = function () {
      /* istanbul ignore if  */
      if ($scope.title === 'PHR') return;
      
      $state.go('patients-list');
    };
    
    this.goProfile = function () {
      $state.go('profile');
    };

    /* istanbul ignore next  */
    function deleteCookie(name) {
      document.cookie = name +
        '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    }
    this.signout = function () {
      deleteCookie('JSESSIONID');
      location.reload();
    };

    $scope.switchDirectByRole = function (currentUser) {
      /* istanbul ignore if  */
      if (!currentUser) return;
      // Direct different roles to different pages at login
      /* istanbul ignore next  */
      switch (currentUser.role) {
        case 'IDCR':
          $state.go('patients-charts');
          break;
        case 'PHR':
          //Trick for PHR user login
          $scope.loadPatient = patientsActions.getPatient;
          $scope.loadPatient(currentUser.nhsNumber);
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
      if (data) {
        $scope.title = data.role;
      }
      $scope.switchDirectByRole(data);
    };

    $scope.setLoginData = function (loginResult) {
      $scope.user = loginResult.data;
      $scope.setTitle(loginResult.data);
    };


    var socket = socketService.socket;
    var token = getCookie('JSESSIONID');

    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }

    $scope.login = function () {
      serviceRequests.login().then(function (result) {
        serviceRequests.currentUserData = result.data;
        $scope.setLoginData(result);

        let user = result;
        console.log('user---> ', user);
        socket.emit('user:init', {
          username: user.username,
          nhsNumber: user.nhsNumber,
          role: user.role,
          surname: user.family_name,
          name: user.given_name,
          token: token
        });

      });
    };

    socket.on('user:init', function(data) {
      console.log('user:init response - ', data);
      if (data.ok) {
        socketService.userInitResponse = data;
      }
    });

    var auth0;

    serviceRequests.initialise().then(function (result){

      /* istanbul ignore if  */
      if (result.data.token) {
        // reset the JSESSIONID cookie with the new incoming cookie

        document.cookie = "JSESSIONID=" + result.data.token;
        location.reload();
        return;
      }
      /* istanbul ignore if  */
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

    $rootScope.searchMode = false;
    $rootScope.reportMode = false;
    $rootScope.settingsMode = false;
    $rootScope.patientMode = false;
    $rootScope.reportTypeSet = false;
    $rootScope.reportTypeString = '';

    $scope.search = {};
    $scope.search.searchExpression = '';

    // this.searchBarEnabled = !$state.is('main-search');

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
      /* istanbul ignore next  */
      for (var i = 0; i < this.reportTypes.length; i++) {
        if ($scope.search.searchExpression.lastIndexOf(this.reportTypes[i]) !== -1) {
          return true;
        }
      }

      return false;
    };

    this.processReportTypeMode = function () {
      /* istanbul ignore next  */
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
      // $scope.search.searchExpression = expression.toLowerCase();
      /* istanbul ignore if  */
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

        /* istanbul ignore if  */
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
      /* istanbul ignore if  */
      if ($scope.search.searchExpression !== '') {
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

    this.getPageComponents = function (data) {
      $scope.userContextViewExists = ('banner' in data.state);
    };

    this.clickSidebarBtn = function () {
      serviceRequests.publisher('setHeightSidebar');
      serviceRequests.publisher('changeStateSidebar', {click: true});
    };

    this.getPopulateHeaderSearch = function (expression) {
      $scope.search.searchExpression = expression.headerSearch.toLowerCase();;
      $scope.searchFocused = true;
      // self.searchBarEnabled = expression.headerSearchEnabled;
      // $scope.searchBar = expression.headerSearchEnabled;
    };
    this.getPageHeader = function (data) {
      $scope.pageHeader = data.title;
      $scope.isPageHeader = data.isShowTitle;
      // $scope.searchBar = data.title === 'Welcome' ? false : true;
    };
    this.checkIsShowPreviousBtn = function () {
      $scope.isShowPreviousBtn = $state.router.globals.$current.name !== 'patients-charts';
    };

    serviceRequests.subscriber('routeState', this.getPageComponents);
    serviceRequests.subscriber('populateHeaderSearch', this.getPopulateHeaderSearch);
    serviceRequests.subscriber('headerTitle', this.getPageHeader);

    angular.element(document).ready(function () {
      this.checkIsShowPreviousBtn()
    }.bind(this));

    $rootScope.$on('$locationChangeStart', function() {
      this.checkIsShowPreviousBtn()
    }.bind(this));

    $window.addEventListener('resize', function () {
      $scope.checkIsToggleSearch();
    });
  }

}

const HeaderComponent = {
  template: templateHeader,
  controller: HeaderController
};

HeaderController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'serviceRequests', 'socketService', '$window'];
export default HeaderComponent;
