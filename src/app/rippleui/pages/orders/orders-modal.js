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
export default function OrdersModal($uibModal, ordersActions, $stateParams, $ngRedux) {
  var isModalClosed = true;
 
  var openModal = function (patient, modal, order, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;


      var modalInstance = $uibModal.open({
        template: require('./orders-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.currentUser = currentUser;
          $scope.order = angular.copy(order);
          $scope.patient = patient;
          $scope.modal = modal;
          $scope.order.author = 'Dr John Smith';
          $scope.firstPage = true;
          $scope.chosenOrders = [];

          if (modal.title === 'Create Order') {
            $scope.order.orderDate = new Date().toISOString().slice(0, 10);
          }

          $scope.setCurrentPageData = function (data) {
            if (data.orders.dataSuggestion) {
              $scope.suggestions = data.orders.dataSuggestion;
            }

            if (data.orders.dataCreate !== null) {
              $uibModalInstance.close(order);
              $scope.ordersLoad($stateParams.patientId);
              $state.go('orders-list', {
                patientId: $scope.patient.id,
                filter: $scope.query,
                page: $scope.currentPage
              });
            }
          };

          $scope.$on('$destroy', unsubscribe);
          $scope.ordersLoad = ordersActions.suggestion;
          $scope.ordersLoad();

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

          $scope.ok = function (contactForm, contact) {
            $scope.formSubmitted = true;

            if (contactForm.$valid) {
              $uibModalInstance.close(contact);
              $scope.ordersCreate($scope.patient.id, $scope.chosenOrders);
            }
          };

          $scope.cancel = function () {
            $scope.order = angular.copy(order);
            $uibModalInstance.dismiss('cancel');
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

          $scope.moveItem = function () {
            if ($scope.idSelectedLeft === null) {
              for (var c = 0; c < $scope.chosenOrders.length; c++) {
                if ($scope.chosenOrders[c].code === $scope.idSelectedRight) {
                  $scope.suggestions.push($scope.chosenOrders[c]);
                  $scope.chosenOrders.splice(c, 1);
                }
              }
            } else {
              for (var d = 0; d < $scope.suggestions.length; d++) {
                if ($scope.suggestions[d].code === $scope.idSelectedLeft) {
                  $scope.chosenOrders.push($scope.suggestions[d]);
                  $scope.suggestions.splice(d, 1);
                }
              }
            }
          };

          $scope.pageTwo = function () {
            $scope.firstPage = false;
          };

          $scope.pageOne = function () {
            $scope.firstPage = true;
          };

          $scope.openDatepicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: $scope.setCurrentPageData(state)
          }))($scope);

          $scope.ordersLoad = ordersActions.all;
          $scope.ordersCreate = ordersActions.create;
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
OrdersModal.$inject = ['$uibModal', 'ordersActions', '$stateParams', '$ngRedux'];