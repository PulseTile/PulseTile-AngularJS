import cornerstoneJS from '../../cornerstone/cornerstone';
import cornerstoneMathJS from '../../cornerstone/cornerstoneMath';
import cornerstoneToolsJS from '../../cornerstone/cornerstoneTools';

angular.module('ripple-ui.directives', [])

  .directive('focusElement', function($timeout) {
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
            scope.panelOpen = '';
          } else {
            scope.panelOpen = namePanel;
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
  .directive('mcFullPanel', function() {
    /* istanbul ignore next  */
    return {
      controller: ['$scope', 'serviceRequests', function($scope, serviceRequests) {
        $scope.showPanel = '';
        $scope.panelOpen = '';
        $scope.getShowPanel = function (panelName) {
          if ($scope.showPanel === '') return true;

          return $scope.showPanel === panelName ? true : false;
        };
        $scope.changeFullPanel = function (fullPanelName, panelName) {
          if (panelName) {
            $scope.showPanel = $scope.showPanel === panelName ? '' : panelName;
            $scope.panelOpen = panelName;
          }
          serviceRequests.publisher('changeFullPanel', {panelName: fullPanelName});
        };
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
        scope.toggleDropdown = function (ev) {
          ev.currentTarget.parentElement.classList.toggle('open');
        };
      }
    }
  })
  .directive('diCom', function () {
    /* istanbul ignore next  */
    return {
      // restrict: 'E',
      template: require('../rippleui/pages/dicom/image-modal.html'),
      controller: ['$scope', '$ngRedux', 'serviceRequests', function($scope, $ngRedux, serviceRequests) {

        var cornerstone = cornerstoneJS();
        var element = $('#dicomImage').get(0);

        $scope.modal = {title: 'View Image'};

        $scope.zoomIn = function (ev) {
          var viewport = cornerstone.getViewport(element);
          viewport.scale += 0.25;
          cornerstone.setViewport(element, viewport);
        };
        $scope.zoomOut = function (ev) {
          var viewport = cornerstone.getViewport(element);
          viewport.scale -= 0.25;
          cornerstone.setViewport(element, viewport);
        };
        $scope.reset = function (ev) {
          cornerstone.reset(element);
        };
        $scope.close = function (ev) {
          serviceRequests.publisher('closeModal', {className: 'closeModal'});
        };

        this.setCurrentPageData = function (data) {
          if (data.patientsGet.data) {
            $scope.patient = data.patientsGet.data;
          }
        };

        let unsubscribe = $ngRedux.connect(state => ({
          getStoreData: this.setCurrentPageData(state)
        }))(this);

        $scope.$on('$destroy', unsubscribe);
      }]
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
        var imgLoader = require('../../cornerstone/exampleImageIdLoader.js');

        var imageId = scope.imageId;
        var cornerstoneContainer = element[0];
        var cornerstoneElement = cornerstoneContainer.querySelector("#dicomImage");
        cornerstone.enable(cornerstoneElement);
        cornerstone.loadImage(imageId).then(function (image) {
          cornerstone.displayImage(cornerstoneElement, image);
          cornerstoneTools.mouseInput.enable(cornerstoneElement);
          cornerstoneTools.mouseWheelInput.enable(cornerstoneElement);

          // Enable all tools we want to use with this element
          cornerstoneTools.wwwc.activate(cornerstoneElement, 2); // ww/wc is the default tool for left mouse button
          cornerstoneTools.pan.activate(cornerstoneElement, 1); // pan is the default tool for middle mouse button
          cornerstoneTools.zoom.activate(cornerstoneElement, 4); // zoom is the default tool for right mouse button
          cornerstoneTools.zoomWheel.activate(cornerstoneElement); // zoom is the default tool for middle mouse wheel
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
          popover.removeClass('right left top')
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
  });