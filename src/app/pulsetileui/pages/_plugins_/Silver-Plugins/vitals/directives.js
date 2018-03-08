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
angular.module('ripple-ui.vitalsDirectives', [])
  .directive('mcPopoverVital', function() {
    /* istanbul ignore next  */
    return {
      require: '^^mcPopover',
      restrict: 'E',
      scope: {
        popoverLabels: '@'
      },
      template: require('./vitals-popover.html'),
      link: function(scope, element, attrs) {
        scope.title = attrs.title;
        scope.popoverLabels = [];

        scope.$watch(attrs.labels, function(value) {
          scope.popoverLabels = value;
        });
      }
    }
  });