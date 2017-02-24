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
let templateMain = require('./main.html');

class MainController {
  constructor($window, $rootScope, $scope, $state, $stateParams, serviceRequests, $timeout, deviceDetector) {
    $scope.isTouchDevice = deviceDetector.detectDevice();
    $scope.isSidebar = false;
    $scope.isSecondPanel = false;
    $scope.fullPanelClass = '';
    $scope.isClassShowSidebar = false;
    $scope.breadcrumbs = [];

    $scope.setBreadcrumbs = function (breadcrumbs) {
      if (serviceRequests.currentUserData.role === "PHR" && breadcrumbs) {
        breadcrumbs.shift();
      }
      $scope.breadcrumbs = breadcrumbs || [];
    };

    this.goBreadcrumb = function (state) {
      var requestHeader = {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      };

      $state.go(state, requestHeader);
    };
    
    this.getPageComponents = function (data) {
      $scope.setBreadcrumbs(data.breadcrumbs);
      // $scope.userContextViewExists = ('banner' in data.state);
      // $scope.actionsExists = ('actions' in data.state);
    };
    serviceRequests.subscriber('routeState', this.getPageComponents);

    $scope.getFullPanelClass = function () {
      return $scope.fullPanelClass ? 'full-panel full-panel-' + $scope.fullPanelClass : '';
    };
    this.changeFullPanel = function (data) {
      /* istanbul ignore if  */
      if ($scope.fullPanelClass === data.panelName) {
        $scope.fullPanelClass = '';
      } else {
        $scope.fullPanelClass = data.panelName;
      }
    };
    serviceRequests.subscriber('changeFullPanel', this.changeFullPanel);

    $scope.detectDevice = function () {
      return  $scope.isTouchDevice ? 'touch-device' : 'is-not-touch-device';
    };

    $scope.getClasses = function () {
      var classTouchDevice = $scope.isTouchDevice ? 'touch-device' : 'is-not-touch-device';
      var classShowSidebar = $scope.isClassShowSidebar ? 'showSidebar' : '';
      return  classTouchDevice + ' ' + classShowSidebar;
    };

    this.changeisClassShowSidebar = function (data) {
      /* istanbul ignore if  */
      if (data.click) {
        $scope.isClassShowSidebar = !$scope.isClassShowSidebar;
      }
    };
    this.hideSidebarOnMobile = function () {
      if (window.innerWidth < 768) {
        $timeout(function() {
          $scope.isClassShowSidebar = false;
          angular.element(document).find('.wrapper').removeClass('showSidebar');
        }, 0);
      }
    };
    serviceRequests.subscriber('changeStateSidebar', this.changeisClassShowSidebar);

    this.checkIsViews = function() {
      let views = $state.router.globals.$current.views;

      if (!views) return;
      
      $scope.isSecondPanel = views.detail ? true : false;
      $scope.isSidebar = views.actions ? true : false;

    };

    this.setHeightSidebarForMobile = function() {
      var page = angular.element(document);

      if (!page.find('.wrapper').length) return;

      var wrapperHeight = page.find('.wrapper').outerHeight();
      var headerHeight = page.find('.header').outerHeight();
      var sidebar = page.find('.sidebar');

      /* istanbul ignore if  */
      if ($scope.isSidebar) {
        if (window.innerWidth < 768) {
          sidebar.css('height', wrapperHeight - headerHeight + 'px');
        } else {
          sidebar.css('height', 'auto');
        }
      }
    };
    serviceRequests.subscriber('setHeightSidebar', this.setHeightSidebarForMobile);
    
    angular.element(document).ready(function () {
      this.checkIsViews();
      this.setHeightSidebarForMobile();
    }.bind(this));
    
    $window.addEventListener('resize', function () {
      this.setHeightSidebarForMobile();
    }.bind(this));

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

MainController.$inject = ['$window', '$rootScope', '$scope',  '$state', '$stateParams', 'serviceRequests', '$timeout', 'deviceDetector'];
export default MainComponent;