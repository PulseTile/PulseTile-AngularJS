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
export default function AppointmentConfirmModal($uibModal, serviceRequests) {
var isModalClosed = true;
    var openModal = function (modal, time) {
        if (isModalClosed) {
            isModalClosed = false;
            var modalInstance = $uibModal.open({
                template: require('./appointments-confirm-modal.html'),
                size: 'sm',
                controller: function ($scope, $state, $uibModalInstance) {

                    $scope.modal = $uibModalInstance;
                    $scope.time = new Date(time);

                    $scope.ok = function () {
                        serviceRequests.publisher('apptTime', {time: $scope.time});
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            });
        }

        modalInstance.result.then(function() {
            isModalClosed = true;
        }, function() {
            isModalClosed = true;
        });
    };

    return {
        isModalClosed: isModalClosed,
        openModal: openModal
    };
}
AppointmentConfirmModal.$inject = ['$uibModal', 'serviceRequests'];
