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
let templateOrdersList = require('./orders-list.html');

class OrdersListController {
  constructor($scope, $state, $stateParams, $ngRedux, ordersActions, serviceRequests, OrdersModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    $scope.query = '';

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      $scope.query = $stateParams.filter;
    }

    this.create = function () {
      OrdersModal.openModal(this.currentPatient, {title: 'Create Order'}, {}, this.currentUser);
    };

    this.search = function (row) {
      return (
        row.name.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.orderDate.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    this.go = function (id, source) {
      $state.go('orders-detail', {
        patientId: $stateParams.patientId,
        orderId: id,
        filter: $scope.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: source
      });
    };

    this.setCurrentPageData = function (data) {
      if (data.orders.data) {
        this.orders = data.orders.data;

        for (var i = 0; i < this.orders.length; i++) {
          this.orders[i].orderDate = moment(this.orders[i].orderDate).format('DD-MMM-YYYY h:mm a');
        }
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    this.selected = function (orderId) {
      return orderId === $stateParams.orderId;
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    this.ordersLoad = ordersActions.all;
    this.ordersLoad($stateParams.patientId);
  }
}

const OrdersListComponent = {
  template: templateOrdersList,
  controller: OrdersListController
};

OrdersListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'ordersActions', 'serviceRequests', 'OrdersModal', 'usSpinnerService'];
export default OrdersListComponent;