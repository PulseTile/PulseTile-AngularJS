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
    constructor($scope, $state, serviceRequests, deviceDetector, ConfirmationDocsModal) {
      serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: null, name: 'ui-kit'});
      serviceRequests.publisher('headerTitle', {title: 'UI OVERVIEW', isShowTitle: true});

      $scope.isOpenSidebar = false;
      $scope.isTouchDevice = deviceDetector.detectDevice();
      $scope.fullPanelClass = '';
      $scope.logoFileParams = {};

      // Pagination
        $scope.paginateArr = [];
        for (var i = 0; i < 20; i++) {
          $scope.paginateArr.push(i + 1);
        }
      // Pagination

      // Custom Select
        $scope.themes =   [
          {
            id: 'green',
            name: 'Green Theme',
            baseColor: '#0D672F'
          }, {
            id: 'red',
            name: 'Red Theme',
            baseColor: 'red',
          }, {
            id: 'blue',
            name: 'Blue Theme',
            baseColor: 'blue',
          }, {
            id: 'brown',
            name: 'Brown Theme',
            baseColor: 'brown',
          }, {
            id: 'yellow',
            name: 'Yellow Theme',
            baseColor: 'yellow',
          },
        ];
        $scope.selectedTheme = {
          id: 'green',
          name: 'Green Theme',
          baseColor: '#0D672F'
        };
      // Custom Select

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

      // Selectable
        $scope.suggestions = [{
          text: 'Item 1',
          code: 1
        }, {
          text: 'Item 2',
          code: 2
        }, {
          text: 'Item 3',
          code: 3
        }, {
          text: 'Item 4',
          code: 4
        }, {
          text: 'Item 5',
          code: 5
        }]
        $scope.chosenOrders = [];
        $scope.idSelectedLeft = null;
        $scope.idSelectedRight = null;

        $scope.setSelectedLeft = function (idSelectedLeft) {
            $scope.idSelectedRight = null;
            $scope.idSelectedLeft = idSelectedLeft;
        };

        $scope.setSelectedRight = function (idSelectedRight) {
            $scope.idSelectedLeft = null;
            $scope.idSelectedRight = idSelectedRight;
        };

        $scope.toggleSelectedItem = function (idSelected) {
            if ($scope.isInSuggestionsList(idSelected)) {
                $scope.setSelectedLeft(idSelected);
                for (var i = 0; i < $scope.suggestions.length; i++) {
                    if ($scope.suggestions[i].code === $scope.idSelectedLeft) {
                        $scope.chosenOrders.push($scope.suggestions[i]);
                        $scope.suggestions.splice(i, 1);
                    }
                }
            } else {
                $scope.setSelectedRight(idSelected);
                for (var a = 0; a < $scope.chosenOrders.length; a++) {
                    if ($scope.chosenOrders[a].code === $scope.idSelectedRight) {
                        $scope.suggestions.push($scope.chosenOrders[a]);
                        $scope.chosenOrders.splice(a, 1);
                    }
                }
            }
            if ($scope.chosenOrders.length === 0) {
                $scope.firstPage = true;
            }
        };

        $scope.isInSuggestionsList = function (idSelected) {
            for (var b = 0; b < $scope.suggestions.length; b++) {
                if ($scope.suggestions[b].code === idSelected) {
                    return true;
                }
            }
            return false;
        };

        $scope.chooseItem = function () {
            for (var d = 0; d < $scope.suggestions.length; d++) {
                if ($scope.suggestions[d].code === $scope.idSelectedLeft) {
                    $scope.chosenOrders.push($scope.suggestions[d]);
                    $scope.suggestions.splice(d, 1);
                }
            }
        };
        $scope.chooseAll = function () {
            var d;
            for (d = $scope.suggestions.length - 1; d >= 0; d--) {
                $scope.chosenOrders.push($scope.suggestions[d]);
                $scope.suggestions.splice(d, 1);
            }
        };
        $scope.cancelItem = function () {
            for (var c = 0; c < $scope.chosenOrders.length; c++) {
                if ($scope.chosenOrders[c].code === $scope.idSelectedRight) {
                    $scope.suggestions.push($scope.chosenOrders[c]);
                    $scope.chosenOrders.splice(c, 1);
                }
            }
        };
        $scope.cancelAll = function () {
            for (var d = $scope.chosenOrders.length - 1; d >= 0; d--) {
                $scope.suggestions.push($scope.chosenOrders[d]);
                $scope.chosenOrders.splice(d, 1);
            }
        };
      // Selectable


      // Modal
        this.openModal = function (patient, state) {
          ConfirmationDocsModal.openModal(function () {});
        };
      // Modal

      // Slider Range
        $scope.agesSteps = [];
        var step;

        for (var i = 0; i < 100; i += 5) {
          step = {
            value: i
          };
          if (i % 10 === 0) {
            step.legend = i.toString();
          }
          $scope.agesSteps.push(step);
        }
        $scope.agesSteps.push({
          value: 100,
          legend: '100+'
        });

        $scope.sliderRange = {
          minValue: 0,
          maxValue: 100,
          options: {
            floor: 0,
            ceil: 100,
            step: 5,
            showTicks: true,
            showTicksValues: false,
            stepsArray: $scope.agesSteps
          },
        };
      // Slider Range

      // Scrollbar
        $scope.configScrollbar = {
          mouseWheel: { enable: true },
          contentTouchScroll: 50,
          documentTouchScroll: true,
        }
      // Scrollbar
    }
}

const UiKitComponent = {
    template: templateUiKit,
    controller: UiKitController
};

UiKitController.$inject = ['$scope', '$state', 'serviceRequests', 'deviceDetector', 'ConfirmationDocsModal'];
export default UiKitComponent;