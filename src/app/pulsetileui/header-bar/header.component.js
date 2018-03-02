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
let templateHeader = require('./header-bar.tmpl.html');

class HeaderController {

  constructor($rootScope, $scope, $state, $stateParams, $ngRedux, patientsActions, serviceRequests, serviceThemes, $window) {

    $scope.versionOfPulseTile = process.env.VERSION_APP;
    $scope.versionOfAngular = process.env.VERSION_ANGULAR;
    $scope.versionOfServer = '-';

    serviceRequests.subscriber('setVersionServer', (data) => {
      $scope.versionOfServer = data.version;
    });
    serviceRequests.publisher('getVersionServer');

    var self = this;
    $scope.title = '';
    $scope.isOpenSearch = false;

    $scope.logoB64 = serviceThemes.getLogoB64();

    $scope.isToogleSearchShow = false;
    $scope.searchShow = false;
    
    this.mainSearchEnabled = true;
    this.showAdvancedSearch = false;

    $scope.searchOption = null;
    $scope.searchOptionsList = [
      {
        name: 'Patient Search - Advanced',
        type: 'advanced'
      }, {
        name: 'Clinical Query',
        type: 'clinicalQuery'
      }
    ];


    /* istanbul ignore next */
    $scope.setUserData = function (data) {
      $scope.user = data.userData;
    };
    serviceRequests.subscriber('setUserData', $scope.setUserData);
    serviceRequests.publisher('getUserData');

    /* istanbul ignore next */
    $scope.changeLogo = function (data) {
      $scope.logoB64 = data.logoB64;
    };
    serviceRequests.subscriber('changeLogo', $scope.changeLogo);
    
    /* istanbul ignore next */
    this.closeAdvancedSearch = function() {
      $scope.isOpenSearch = false;
      $scope.searchOption = null;
    };

    /* istanbul ignore next */
    this.openAdvancedSearch = function(index) {
      if (!$scope.searchOptionsList[index].type.length) return;
      
      if (!$scope.searchOption || ($scope.searchOptionsList[index].type != $scope.searchOption.type)) {
        $scope.isOpenSearch = true;
        $scope.searchOption = $scope.searchOptionsList[index];
        serviceRequests.publisher('clearSearchParams', {});
        serviceRequests.publisher('openSearchPanel', {});
      }
    };

    /* istanbul ignore next */
    $scope.isActiveTypeSearch = function (type) {
      if ($scope.searchOption && $scope.searchOption.type === type) {
        return true;
      }

      return false;
    };

    /* istanbul ignore next */
    $scope.checkIsToggleSearch = function () {
      if (window.innerWidth < 768) {
        $scope.isToogleSearchShow = true;
      } else {
        $scope.isToogleSearchShow = false;
      }
    };
    /* istanbul ignore next */
    $scope.isShowSearch = function () {
      return $scope.searchShow || !$scope.isToogleSearchShow;
    };
    
    $scope.checkIsToggleSearch();
    
    serviceRequests.subscriber('closeAdvancedSearch', this.closeAdvancedSearch);
    
    /* istanbul ignore next */
    this.goBack = function () {
      if ($scope.title === 'PHR') return;

      switch ($state.router.globals.$current.name) {
        case 'patients-charts': 
        
          break;
        case 'patients-summary': 
          $state.go('patients-list');
          break;
        case 'patients-list': 
          if ($stateParams.searchString) {
            $state.go('search-report', {
              searchParams: JSON.parse($stateParams.searchString),
              searchString: $stateParams.searchString,
            });
          } else {
            $state.go('patients-charts');
          }
          break;
        case 'patients-list-full': 
        case 'search-report': 
          $state.go('patients-charts');
          break;
        default:
          $state.go('patients-summary', {
            patientId: $stateParams.patientId
          });
      }
    };
    
    /* istanbul ignore next */
    this.goLogo = function () {
      if ($scope.title === 'PHR') {
        $state.go('profile');
      } else {
        $state.go('patients-charts');
      }
    };
    
    /* istanbul ignore next */
    this.goProfile = function () {
      $state.go('profile');
    };

    /* istanbul ignore next */
    function deleteCookie(name) {
      document.cookie = name +
        '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    }
    /* istanbul ignore next */
    this.signout = function () {
      deleteCookie('JSESSIONID');
      
      localStorage.setItem('signout', true);
      location.reload();
    };



    $rootScope.searchMode = false;
    $rootScope.reportMode = false;
    $rootScope.settingsMode = false;
    $rootScope.patientMode = false;
    $rootScope.reportTypeSet = false;
    $rootScope.reportTypeString = '';

    $scope.search = {};
    $scope.search.searchExpression = '';

    /* istanbul ignore next */
    this.containsReportString = function () {
      return $scope.search.searchExpression.indexOf('rp ') === 0;
    };

    /* istanbul ignore next */
    this.containsSettingString = function () {
      return $scope.search.searchExpression.lastIndexOf('st ') === 0;
    };

    /* istanbul ignore next */
    this.containsPatientString = function () {
      return $scope.search.searchExpression.lastIndexOf('pt ') === 0;
    };

    /* istanbul ignore next */
    this.containsReportTypeString = function () {
      for (var i = 0; i < this.reportTypes.length; i++) {
        if ($scope.search.searchExpression.lastIndexOf(this.reportTypes[i]) !== -1) {
          return true;
        }
      }

      return false;
    };

    /* istanbul ignore next */
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

    /* istanbul ignore next */
    this.processReportMode = function () {
      if ($scope.search.searchExpression === 'rp ') {
        $scope.search.searchExpression = '';
      }
    };

    /* istanbul ignore next */
    this.processSettingMode = function () {
      if ($scope.search.searchExpression === 'st ') {
        $scope.search.searchExpression = '';
      }
    };

    /* istanbul ignore next */
    this.processPatientMode = function () {
      if ($scope.search.searchExpression === 'pt ') {
        $scope.search.searchExpression = '';
      }
    };

    /* istanbul ignore next */
    this.checkExpression = function (expression) {
      /* istanbul ignore if */
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

        /* istanbul ignore if */
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

    /* istanbul ignore next */
    this.searchFunction = function () {
      /* istanbul ignore if */
      if ($scope.search.searchExpression !== '') {
        $state.go('patients-list-full', {
          queryType: 'Patient: ',
          searchString: $scope.search.searchExpression,
          orderType: 'ASC',
          pageNumber: '1'
        });
      }
    };

    /* istanbul ignore next */
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

    /* istanbul ignore next */
    this.cancelReportType = function () {
      $rootScope.reportTypeString = '';
      $rootScope.reportTypeSet = false;
    };

    /* istanbul ignore next */
    this.getPageComponents = function (data) {
      $scope.userContextViewExists = ('banner' in data.state);
    };

    /* istanbul ignore next */
    this.clickSidebarBtn = function () {
      serviceRequests.publisher('changePositionSidebar');
      serviceRequests.publisher('changeStateSidebar', {click: true});
      serviceRequests.publisher('resizeDrawing', {});
    };

    /* istanbul ignore next */
    this.getPopulateHeaderSearch = function (expression) {
      $scope.search.searchExpression = expression.headerSearch.toLowerCase();;
      $scope.searchFocused = true;
    };

    /* istanbul ignore next */
    this.getPageHeader = function (data) {
      $scope.pageHeader = data.title;
      $scope.isPageHeader = data.isShowTitle;
    };

    /* istanbul ignore next */
    this.checkIsShowPreviousBtn = function () {
      $scope.isShowPreviousBtn = $state.router.globals.$current.name !== 'patients-charts';
    };

    serviceRequests.subscriber('routeState', this.getPageComponents);
    serviceRequests.subscriber('populateHeaderSearch', this.getPopulateHeaderSearch);
    serviceRequests.subscriber('headerTitle', this.getPageHeader);

    angular.element(document).ready(function () {
      this.checkIsShowPreviousBtn()
    }.bind(this));

    /* istanbul ignore next */
    $rootScope.$on('$locationChangeStart', function() {
      var currentState = $state.router.globals.$current.name;
      
      this.checkIsShowPreviousBtn();
  
      if (currentState !== 'patients-list-full') {
        this.cancelSearchMode();
      }
    }.bind(this));

    /* istanbul ignore next */
    $window.addEventListener('resize', function () {
      $scope.checkIsToggleSearch();
    });
  }

}

const HeaderComponent = {
  template: templateHeader,
  controller: HeaderController
};

HeaderController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'serviceRequests', 'serviceThemes', '$window'];
export default HeaderComponent;
