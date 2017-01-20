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
class MainController {
  constructor($window, $rootScope, $scope, $state, $stateParams, serviceRequests, $timeout) {
    $scope.isSidebar = false;
    $scope.isSecondPanel = false;
    $scope.fullPanelClass = '';
    $scope.classShowSidebar = '';
    $scope.breadcrumbs;

    $scope.setBreadcrumbs = function (breadcrumbs) {
      if (serviceRequests.currentUserData.role === "PHR" && breadcrumbs) {
        breadcrumbs.shift();
      }
      $scope.breadcrumbs = breadcrumbs || [];
    };

    this.goBreadcrumb = function (state) {
      serviceRequests.currentSort.order = '';
      serviceRequests.currentSort.reverse = false;
      serviceRequests.filter = '';
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
      if ($scope.fullPanelClass === data.panelName) {
        $scope.fullPanelClass = '';
      } else {
        $scope.fullPanelClass = data.panelName;
      }
    }
    serviceRequests.subscriber('changeFullPanel', this.changeFullPanel);

    this.changeClassShowSidebar = function (data) {
      if (data.click) {
        if ($scope.classShowSidebar === 'showSidebar') {
          $scope.classShowSidebar = '';
        } else {
          $scope.classShowSidebar = 'showSidebar';
        }
      }
    };
    this.hideSidebarOnMobile = function () {
      if (window.innerWidth < 768) {
        $scope.classShowSidebar = '';
      }
    };
    serviceRequests.subscriber('changeStateSidebar', this.changeClassShowSidebar);

    this.checkIsViews = function() {
      if ($state.router.globals.$current.views) {
        $scope.isSecondPanel = $state.router.globals.$current.views.detail ? true : false;
        $scope.isSidebar = $state.router.globals.$current.views.actions ? true : false;
      }
    };

    this.setHeightSidebarForMobile = function() {
      var page = angular.element(document);
      var wrapperHeight = page.find('.wrapper').outerHeight();
      var headerHeight = page.find('.header').outerHeight();
      var footerHeight = page.find('.footer').outerHeight();
      var sidebar = page.find('.sidebar');
      
      if ($scope.isSidebar) {
        if (window.innerWidth < 768) {
          sidebar.css('height', wrapperHeight - headerHeight - footerHeight + 'px');
        } else {
          sidebar.css('height', 'auto');
        }
      }
    }
    serviceRequests.subscriber('setHeightSidebar', this.setHeightSidebarForMobile);
    
    angular.element(document).ready(function () {
      this.checkIsViews();
      this.setHeightSidebarForMobile();
    }.bind(this));
    
    $window.addEventListener('resize', function () {
      this.setHeightSidebarForMobile();
      this.hideSidebarOnMobile();
    }.bind(this));

    $rootScope.$on('$locationChangeStart', function() {
      $scope.fullPanelClass = '';
      this.hideSidebarOnMobile();

      $timeout(function() {
        this.checkIsViews();
      }.bind(this), 0);
      
    }.bind(this));
  }
}
const MainComponent = {
  template: require('./main.html'),
  controller: MainController
};

MainController.$inject = ['$window', '$rootScope', '$scope',  '$state', '$stateParams', 'serviceRequests', '$timeout'];
export default MainComponent;