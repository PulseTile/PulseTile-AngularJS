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
export default function ConfirmationHandleErrors($uibModal) {
  var isModalClosed = true;
	/* istanbul ignore next */
  var openModal = function (config) {
    /* istanbul ignore if  */
    if (isModalClosed) {
      isModalClosed = false;

      var controller = function ($scope, $state, $uibModalInstance) {
        $scope.config = config;

				$scope.ok = function () {
					$scope.config.eventOk();
					$uibModalInstance.dismiss('cancel');
				};

        $scope.cancel = function () {
					$scope.config.eventCancel();
					$uibModalInstance.dismiss('cancel');
        };

				$scope.hide = function () {
					$scope.config.eventHide();
					$uibModalInstance.dismiss('cancel');
				};
      };
      controller.$inject = ['$scope', '$state', '$uibModalInstance'];

      var modalInstance = $uibModal.open({
        template: require('./handle-errors-confirmation.html'),
        controller: controller
      });

			/* istanbul ignore next */
			modalInstance.result.then(function() {
				isModalClosed = true;
			}, function() {
				isModalClosed = true;
			});
    }
  };

  return {
    isModalClosed: isModalClosed,
    openModal: openModal
  };
}
ConfirmationHandleErrors.$inject = ['$uibModal'];