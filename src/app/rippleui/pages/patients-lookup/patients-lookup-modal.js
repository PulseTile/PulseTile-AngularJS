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
export default function LookupModal($uibModal) {
    var isModalClosed = true;

    var openModal = function () {
        if (isModalClosed) {
            isModalClosed = false;


            var modalInstance = $uibModal.open({
                template: require('./patients-lookup.html'),
                size: 'lg',
                controller: function ($scope, $state, $uibModalInstance) {
                    $scope.dismiss = function () {
                        $scope.$dismiss();
                        $state.go('patients-charts');
                    };

                    $scope.save = function () {
                        $scope.$close(true);
                        $state.go('patients-charts');
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
LookupModal.$inject = ['$uibModal'];