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
let templateUiKit= require('./ui-kit.html');

class UiKitController {
    constructor($scope, $state, serviceRequests, deviceDetector) {
      serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: null, name: 'ui-kit'});
      serviceRequests.publisher('headerTitle', {title: 'UI OVERVIEW', isShowTitle: true});

      $scope.isOpenSidebar = false;
      $scope.isTouchDevice = deviceDetector.detectDevice();
      $scope.fullPanelClass = '';
      $scope.paginateArr = [];
      $scope.logoFileParams = {};

      for (var i = 0; i < 20; i++) {
        $scope.paginateArr.push(i + 1);
      }

      $scope.toggleSidebar = function () {
        $scope.isOpenSidebar = !$scope.isOpenSidebar;
      };

      $scope.toggleFullPanelClass = function (panelName) {
        if ($scope.fullPanelClass == panelName) {
          $scope.fullPanelClass = '';
        } else {
          $scope.fullPanelClass = panelName;
        }
        return $scope.fullPanelClass ? 'full-panel full-panel-' + $scope.fullPanelClass : '';
      };
      $scope.getFullPanelClass = function () {
        return $scope.fullPanelClass ? 'full-panel full-panel-' + $scope.fullPanelClass : '';
      };

    }
}

const UiKitComponent = {
    template: templateUiKit,
    controller: UiKitController
};

UiKitController.$inject = ['$scope', '$state', 'serviceRequests', 'deviceDetector'];
export default UiKitComponent;