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
import cornerstoneJS from '../../cornerstone/cornerstone';
import cornerstoneWebImageLoaderJS from '../../cornerstone/cornerstoneWebImageLoader';
import cornerstoneToolsJS from '../../cornerstone/cornerstoneTools';

angular.module('ripple-ui.directives', [])

  .directive('focusElement', function($timeout) {
    /* istanbul ignore next  */
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.focusElement, function(value) {
          $timeout(function() {
            if(value === true) {
              jQuery(element).focus();
            }
          });
        });
      }
    }
  })
  .directive('mcAccordion', function() {
    /* istanbul ignore next  */
    return {
      link: function(scope, element, attrs) {
        scope.panelOpen = '';

        scope.openPanel = function (namePanel) {
          if (scope.panelOpen === namePanel) {
            // scope.panelOpen = '';
          } else {
            scope.panelOpen = namePanel;
            if (scope.showPanel && scope.showPanel.length) {
              scope.showPanel = namePanel;
            }
          }
        };
        scope.getOpenPanelClass = function (namePanel, openClass) {
          openClass = openClass ? openClass : 'open';
          return scope.panelOpen === namePanel ? openClass : '';
        };
        scope.$watch(attrs.mcOpenPanel, function() {
          scope.panelOpen = attrs.mcOpenPanel;
        });
      }
    }
  })
  .directive('mcSubAccordion', function() {
    /* istanbul ignore next  */
    return {
      scope: true,
      link: function(scope, element, attrs) {
        scope.toggleSubAccordion = function () {
          scope.isOpen = !scope.isOpen;
        };
        scope.getOpenSubAccordion = function () {
          return scope.isOpen ? 'open' : '';
        };
      }
    }
  })
  .directive('mcFullPanel', function() {
    /* istanbul ignore next  */
    return {
      controller: ['$scope', 'serviceRequests', function($scope, serviceRequests) {
        $scope.showPanel = '';

        $scope.getShowPanel = function (panelName) {
          if ($scope.showPanel === '') return true;

          return $scope.showPanel === panelName ? true : false;
        };
        $scope.changeFullPanel = function (fullPanelName, panelName) {
          if (panelName) {
            $scope.showPanel = $scope.showPanel === panelName ? '' : panelName;
            if (typeof $scope.panelOpen !== 'undefined') {
              $scope.panelOpen = panelName;
            }
          }
          serviceRequests.publisher('changeFullPanel', {panelName: fullPanelName});
        };
        $scope.resetFullPanel = function () {
          $scope.showPanel = '';
        };
        serviceRequests.subscriber('resetFullPanel', $scope.resetFullPanel);
      }]
    };
  })
  .directive('mcDropwrap', function() {
    /* istanbul ignore next  */
    return {
      link: function(scope, element, attrs) {
        scope.closeDropdown = function (ev) {
          var currentDropdown = angular.element(ev.target.closest('.dropdown'));
          var isOpenDropdown = currentDropdown.hasClass('open');

          angular.element('.dropdown').removeClass('open');

          if (isOpenDropdown) {
            currentDropdown.addClass('open');
          }
        };
      }
    }
  })
  .directive('mcDropdown', function() {
    /* istanbul ignore next  */
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.isOpen, function() {
            element[0].classList.toggle('open');
        });
        scope.toggleDropdown = function (ev) {
          $(ev.currentTarget).closest('.dropdown').toggleClass('open');
        };
      }
    }
  })
  .directive('cornerstoneImage', function () {
    /* istanbul ignore next  */
    return{
      restrict: 'E',
      template: '<div id="dicomImage" oncontextmenu="return false" unselectable="on" onselectstart="return false;" onmousedown="return false;" style="width: 100%; height: 512px; margin: auto"></div>',
      scope: {
        imageId: '@imageid'
      },
      link: function(scope, element, attributes) {
        
        var cornerstone = cornerstoneJS();
        var cornerstoneTools = cornerstoneToolsJS();
        var cornerstoneWebImageLoader = cornerstoneWebImageLoaderJS();
        var imgLoader = require('../../cornerstone/exampleImageIdLoader.js');

        var imageId = scope.imageId;
        
        var element = $('#dicomImage').get(0);
        
        cornerstone.enable(element);
        
        cornerstone.loadImage(imageId).then(function(image) {
          cornerstone.displayImage(element, image);
          
          cornerstoneTools.mouseWheelInput.enable(element);
        });
      }
    };

  })
  .directive('mcPopover', function() {
    /* istanbul ignore next  */
    return {
      controller: ['$scope', '$element', '$window', function($scope, $element, $window) {
        var popoverWidth = 266;
        var page = angular.element(document);

        $scope.togglePopover = function (ev) {
          var placement;
          var popoverWrap = angular.element(ev.currentTarget.parentElement);
          var popover = popoverWrap.find('.popover');
          var pageWidth = page.width();
          var offsetPopoverWrap = popoverWrap.offset();
          var freePlaceRight = pageWidth - (offsetPopoverWrap.left + popoverWrap.width());
          var freePlaceLeft = offsetPopoverWrap.left;

          if (freePlaceRight > popoverWidth) {
            placement = 'right';
          } else if (freePlaceLeft > popoverWidth) {
            placement = 'left';
          } else {
            placement = 'top';
          }
          popover.removeClass('right left top');
          popover.addClass(placement);
          popover.toggleClass('in');
        };
        $window.addEventListener('resize', function () {
          angular.element('.popover').removeClass('in');
        });
        document.addEventListener('click', function (ev) {
          var currentPopoverWrap = angular.element(ev.target.closest('.popover-wrap'));
          var isOpenPopover = false;
          var currentPopover;

          if (currentPopoverWrap) {
            currentPopover = currentPopoverWrap.find('.popover');
            isOpenPopover = currentPopover.hasClass('in');
          }

          angular.element('.popover').removeClass('in');

          if (isOpenPopover) {
            currentPopover.addClass('in');
          }
        });
      }]
    }
  })
  .directive('filtering', function() {
    /* istanbul ignore next  */
    return {
      restrict: 'A',
      controller: ['$scope', '$element', '$timeout', 'serviceFormatted', 'serviceStateManager', '$state',
        function($scope, $element, $timeout, serviceFormatted, serviceStateManager, $state) {
          var filterData = serviceStateManager.getFilter();
          var filterEl;

          $scope.isFilterOpen = filterData.isOpen;
          $scope.queryFilter = filterData.query;

          $scope.toggleFilter = function () {
            $scope.isFilterOpen = !$scope.isFilterOpen;

            if ($scope.isFilterOpen) {
              $timeout(function(){
                filterEl = document.getElementById('filter');
                if(filterEl) {
                  filterEl.focus();
                }
              }, 0);
            } else {
              $scope.queryFilter = '';
            }

            serviceStateManager.setFilter({
              isOpen: $scope.isFilterOpen,
              query: $scope.queryFilter
            });
          };

          $scope.$watch('queryFilter', function(queryFilterValue) {
            serviceStateManager.setFilter({
              isOpen: $scope.isFilterOpen,
              query: queryFilterValue
            });
          });
          $scope.queryFiltering = function (row) {
            return serviceFormatted.formattedSearching(row, $scope.queryFilter);
          };
      }]
    }
  })
  .directive('tableSettings', function() {
    /* istanbul ignore next  */
    return {
      restrict: 'A',
      controller: ['$scope', '$element','$attrs', '$stateParams', 'serviceStateManager',
        function($scope, $element, $attrs, $stateParams, serviceStateManager) {
          var tableSettingsData = serviceStateManager.getTableSettings();

          $scope.order = tableSettingsData.order;
          $scope.reverse = tableSettingsData.reverse;
          $scope.currentPage = tableSettingsData.currentPage;

          $scope.pageChangeHandler = function (newPage) {
            $scope.currentPage = newPage;
            serviceStateManager.setTableSettings({
              currentPage: newPage
            });
          };

          $scope.sort = function (field) {
            var reverse = $scope.reverse;
            if ($scope.order === field) {
              $scope.reverse = !reverse;
            } else {
              $scope.order = field;
              $scope.reverse = false;
            }

            serviceStateManager.setTableSettings({
              order: $scope.order,
              reverse: $scope.reverse
            });
          };

          $scope.sortClass = function (field) {
            if ($scope.order === field) {
              return $scope.reverse ? 'sorted desc' : 'sorted asc';
            }
          };

          $scope.selectedRow = function (detailsIndex) {
            return detailsIndex === $stateParams.detailsIndex;
          };

          $scope.$watch($attrs.order, function() {
            if ($scope.order === '') {
              $scope.order = $attrs.order;
              serviceStateManager.setTableSettings({
                order: $attrs.order,
              });
            }
          });
      }]
    }
  })
  .directive('mcDatepicker', function() {
    /* istanbul ignore next  */
    return {
      restrict: 'A',
      controller: ['$scope', function($scope) {
        $scope.datepickers = {};

        $scope.openDatepicker = function ($event, name) {
          $event.preventDefault();
          $event.stopPropagation();

          if ($scope.datepickers[name]) {
            $scope.datepickers[name] = false;
          } else {
            $scope.datepickers = {};
            $scope.datepickers[name] = true;
          }

          return false;
        };
        $scope.removeFocus = function ($event) {
          $event.currentTarget.blur();

          return false;
        };
      }]
    }
  })
  .directive('mcMultiViews', function() {
    /* istanbul ignore next  */
    return {
      restrict: 'A',
      controller: ['$scope','$attrs', 'serviceStateManager',
        function($scope, $attrs, serviceStateManager) {
          var viewSettingsData = serviceStateManager.getViewsSettings();

          $scope.activeView = viewSettingsData.activeView;

          $scope.isActiveView = function (viewName) {
            return $scope.activeView === viewName;
          };

          $scope.changeActiveView = function (viewName) {
            $scope.activeView = viewName;
            serviceStateManager.setViewsSettings({
              activeView: viewName
            });
          };

          $scope.$watch($attrs.defaultView, function() {
            if ($scope.activeView === '') {
              $scope.changeActiveView($attrs.defaultView)
            }
          });
      }]
    }
  })
  .directive('contenteditabled', ['$sce', function($sce) {
    /* istanbul ignore next  */
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;

        ngModel.$render = function() {
          element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
        };

        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$evalAsync(read);
        });
        read(); // initialize

        // Write data to the model
        function read() {
          var html = element.html();
          if ( attrs.stripBr && html == '<br>' ) {
              html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    };
  }])
  .directive('mcInputFile', function() {
    /* istanbul ignore next  */
    return {
      // scope: true,
      link: function(scope, element, attrs) {
        scope.clickInputFile = function (idInputFile) {
          document.getElementById(idInputFile).click();
        };
      }
    }
  }) 
  .directive('mcUploadfile', function () {
    /* istanbul ignore next  */
    return {
      restrict: 'A',
      scope: {
        params: '=uploadfileParams',
        typesFile: '@uploadfileAccept',
      },
      link: function(scope, element) {
        function clearParams () {
          if (!scope.params) {
            scope.params = {};
          }
          scope.params.path = '';
          scope.params.name = '';
          scope.params.file = null;
          scope.params.isErrorType = false;
          scope.params.imgencode = '';
        }
        clearParams();

        function errorInput () {
          clearParams();
          scope.params.isErrorType = true;
        }

        scope.params.isErrorType = false;
        var typesArr = scope.typesFile.replace(' ', '').split(',');


        element.on('change', function (changeEvent) {
          if (changeEvent.target.files.length) {

            var loadFile = changeEvent.target.files[0];
            var loadFileType = loadFile.type;

            if (typesArr.indexOf(loadFileType) !== -1) {
              scope.params.path = changeEvent.target.value;
              scope.params.name = loadFile.name;
              scope.params.file = loadFile;
              scope.params.isErrorType = false;
              scope.params.imgencode = changeEvent.target.result;

            } else {
              changeEvent.target.value = '';
              errorInput();
            }
          } else {
            errorInput();
          }
          scope.$apply();
        });
      }
    };
  })
  .directive('mcTextareaWithButton', function () {
    return{
      restrict: 'E',
      transclude: {
        button: '?mcButton',
        field: '?mcField'
      },
      template:
      '              <div class="input-holder">\n' +
      '                <div class="control-group right buttoned-control-group" ng-transclude="button">\n' +
      '                </div>\n' +
      '                <div ng-transclude="field"></div>\n' +
      '              </div>\n'
    }
  });