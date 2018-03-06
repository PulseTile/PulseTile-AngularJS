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
let templateOrdersCreate= require('./orders-create.html');

class OrdersCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, ordersActions, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = ordersActions.all;
    $scope.actionCreateDetail = ordersActions.create;

    $scope.order = {};
    $scope.order.dateSubmitted = new Date();
    $scope.firstPage = true;
    $scope.chosenOrders = [];

    $scope.$on('$destroy', unsubscribe);
    $scope.ordersLoad = ordersActions.suggestion;
    $scope.ordersLoad();

    $scope.idSelectedLeft = null;
    $scope.idSelectedRight = null;
    /* istanbul ignore next */
    $scope.setSelectedLeft = function (idSelectedLeft) {
      $scope.idSelectedRight = null;
      $scope.idSelectedLeft = idSelectedLeft;
    };
    /* istanbul ignore next */
    $scope.setSelectedRight = function (idSelectedRight) {
      $scope.idSelectedLeft = null;
      $scope.idSelectedRight = idSelectedRight;
    };

    $scope.create = function (ordersForm, order) {
      $scope.formSubmitted = true;
      if (ordersForm.$valid) {
        serviceFormatted.propsToString($scope.chosenOrders);

        var toCreateOrders = $scope.chosenOrders.map(item => ({
          code: item.code,
          name: item.text
        }));

        $scope.actionCreateDetail($stateParams.patientId, toCreateOrders);
      }
    };
    /* istanbul ignore next */
    $scope.cancel = function () {
      $scope.order = angular.copy(order);
    };
    /* istanbul ignore next */
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
    /* istanbul ignore next */
    $scope.isInSuggestionsList = function (idSelected) {
      for (var b = 0; b < $scope.suggestions.length; b++) {
        if ($scope.suggestions[b].code === idSelected) {
          return true;
        }
      }
      return false;
    };
    /* istanbul ignore next */
    $scope.chooseItem = function () {
      for (var d = 0; d < $scope.suggestions.length; d++) {
        if ($scope.suggestions[d].code === $scope.idSelectedLeft) {
          $scope.chosenOrders.push($scope.suggestions[d]);
          $scope.suggestions.splice(d, 1);
        }
      }
    };
    /* istanbul ignore next */
    $scope.chooseAll = function () {
      var d;
      for (d = $scope.suggestions.length - 1; d >= 0; d--) {
        $scope.chosenOrders.push($scope.suggestions[d]);
        $scope.suggestions.splice(d, 1);
      }
    };
    /* istanbul ignore next */
    $scope.cancelItem = function () {
      for (var c = 0; c < $scope.chosenOrders.length; c++) {
        if ($scope.chosenOrders[c].code === $scope.idSelectedRight) {
          $scope.suggestions.push($scope.chosenOrders[c]);
          $scope.chosenOrders.splice(c, 1);
        }
      }
    };
    /* istanbul ignore next */
    $scope.cancelAll = function () {
      for (var d = $scope.chosenOrders.length - 1; d >= 0; d--) {
        $scope.suggestions.push($scope.chosenOrders[d]);
        $scope.chosenOrders.splice(d, 1);
      }
    };
    /* istanbul ignore next */
    $scope.pageTwo = function () {
      if ($scope.chosenOrders.length) {
        $scope.firstPage = false;
      }
    };
    /* istanbul ignore next */
    $scope.pageOne = function () {
      $scope.firstPage = true;
    };
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('orders', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    /* istanbul ignore next */
    this.cancel = function () {
      this.goList();
    };
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.orders.dataSuggestion) {
        $scope.suggestions = store.orders.dataSuggestion;
      }
      if (store.orders.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        $scope.ordersLoad($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.order.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))($scope);
    $scope.$on('$destroy', unsubscribe);
  }
}

const OrdersCreateComponent = {
  template: templateOrdersCreate,
  controller: OrdersCreateController
};

OrdersCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'ordersActions', 'serviceRequests', 'serviceFormatted'];
export default OrdersCreateComponent;