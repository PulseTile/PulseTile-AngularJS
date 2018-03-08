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
let templateMain = require('./main.html');

class MainController {
  constructor($window, $rootScope, $scope, $state, $stateParams, serviceRequests, $timeout, deviceDetector, serviceThemes) {
    $rootScope.themeClass = serviceThemes.getActiveThemeClass();
    
    $scope.isTouchDevice = deviceDetector.detectDevice();
    $scope.isSidebar = false;
    $scope.isSecondPanel = false;
    $scope.fullPanelClass = '';
    $scope.isClassShowSidebar = false;
    $scope.breadcrumbs = [];

    /* istanbul ignore next */
    $scope.setBreadcrumbs = function (breadcrumbs) {
      if (serviceRequests.currentUserData.role === "PHR" && breadcrumbs) {
        if (breadcrumbs[0].state === 'patients-list') {
          breadcrumbs.shift();
        }
      }
      $scope.breadcrumbs = breadcrumbs || [];
    };

    /* istanbul ignore next */
    this.goBreadcrumb = function (state) {
      var requestHeader = {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      };

      $state.go(state, requestHeader);
    };
    
    /* istanbul ignore next */
    this.getPageComponents = function (data) {
      $scope.setBreadcrumbs(data.breadcrumbs);
    };
    serviceRequests.subscriber('routeState', this.getPageComponents);

    /* istanbul ignore next  */
    $scope.getFullPanelClass = function () {
      return $scope.fullPanelClass ? 'full-panel full-panel-' + $scope.fullPanelClass : '';
    };

    /* istanbul ignore next  */
    this.changeFullPanel = function (data) {
      if ($scope.fullPanelClass === data.panelName) {
        $scope.fullPanelClass = '';
      } else {
        $scope.fullPanelClass = data.panelName;
      }
    };
    serviceRequests.subscriber('changeFullPanel', this.changeFullPanel);

    /* istanbul ignore next */
    $scope.detectDevice = function () {
      return  $scope.isTouchDevice ? 'touch-device' : 'is-not-touch-device';
    };

    /* istanbul ignore next */
    $scope.getClasses = function () {
      var classTouchDevice = $scope.isTouchDevice ? 'touch-device' : 'is-not-touch-device';
      var classShowSidebar = $scope.isClassShowSidebar ? 'showSidebar' : '';
      return  classTouchDevice + ' ' + classShowSidebar;
    };

    /* istanbul ignore next */
    $scope.changeActiveTheme = function (data) {
      $rootScope.themeClass = serviceThemes.getThemeClassById(data.themeId);
    };
    serviceRequests.subscriber('changeActiveTheme', $scope.changeActiveTheme);

    /* istanbul ignore next */
    this.changeIsClassShowSidebar = function (data) {
      /* istanbul ignore if  */
      if (data.click) {
        $scope.isClassShowSidebar = !$scope.isClassShowSidebar;
      }
    };

    /* istanbul ignore next */
    this.hideSidebar = function () {
      $timeout(function() {
        $scope.isClassShowSidebar = false;
        angular.element(document).find('.wrapper').removeClass('showSidebar');
      }, 0);
    };

    /* istanbul ignore next */
    this.hideSidebarOnMobile = function () {
      if (window.innerWidth < 768) {
        this.hideSidebar();
      }
    };
    serviceRequests.subscriber('changeStateSidebar', this.changeIsClassShowSidebar);

    /* istanbul ignore next */
    this.checkIsViews = function () {
      let views = $state.router.globals.$current.views;

      if (!views) return;
      
      $scope.isSecondPanel = views.detail ? true : false;
      $scope.isSidebar = views.actions ? true : false;

      /* istanbul ignore if  */
      if ($scope.isSidebar === true && window.innerWidth > 767) {
        $scope.isClassShowSidebar = true;
      }
    };

    /* istanbul ignore next */
    this.setPositionForSidebar = function () {
        var page = angular.element(document);

        if (!page.find('.wrapper').length) return;

        var headerHeight = page.find('.header').outerHeight();
        var footerHeight = page.find('.footer').outerHeight();
        var sidebar = page.find('.sidebar');
        var sidebarUnderlay = page.find('.sidebar-underlay');
        var scrollPageTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var sidebarTop = headerHeight - scrollPageTop;

        sidebarTop = sidebarTop > 0 ? sidebarTop : 0;

        sidebar.css('top', sidebarTop + 'px');
        sidebarUnderlay.css('top', sidebarTop + 'px');

        /* istanbul ignore if  */
        if ($scope.isSidebar) {
          if (window.innerWidth < 768) {
            sidebar.css('bottom', 0);
            sidebarUnderlay.css('bottom', 0);
          } else {
            sidebar.css('bottom', footerHeight + 'px');
            sidebarUnderlay.css('bottom', footerHeight + 'px');
          }
        }
    };
    serviceRequests.subscriber('changePositionSidebar', function() {
      $timeout(function() {
        this.setPositionForSidebar();
      }.bind(this), 50);
    }.bind(this));
    
    angular.element(document).ready(function () {
      this.checkIsViews();
      $timeout(function() {
        this.setPositionForSidebar();
      }.bind(this), 0);
    }.bind(this));
    
    /* istanbul ignore next */
    $window.addEventListener('resize', function () {
      this.setPositionForSidebar();
    }.bind(this));
    $window.addEventListener('scroll', function () {
      this.setPositionForSidebar();
    }.bind(this));

    /* istanbul ignore next */
    $window.addEventListener('orientationchange', function () {
      $scope.fullPanelClass = '';
      serviceRequests.publisher('resetFullPanel');
    }.bind(this));

    /* istanbul ignore next */
    $rootScope.$on('$locationChangeStart', function(e) {
      $scope.fullPanelClass = '';
      this.hideSidebarOnMobile();

      $timeout(function() {
        this.checkIsViews();
      }.bind(this), 0);
      
    }.bind(this));
  }
}
const MainComponent = {
  template: templateMain,
  controller: MainController
};

MainController.$inject = ['$window', '$rootScope', '$scope',  '$state', '$stateParams', 'serviceRequests', '$timeout', 'deviceDetector', 'serviceThemes'];
export default MainComponent;