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
  constructor($scope, $state, $stateParams, $ngRedux, ordersActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'orders-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'orders';

    this.create = function () {
      $state.go('orders-create', {
        patientId: $stateParams.patientId
      });
    };

    this.go = function (id, source) {
      $state.go('orders-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };

    this.setCurrentPageData = function (data) {
      if (data.orders.data) {
        this.orders = data.orders.data;

        serviceFormatted.formattingTablesDate(this.orders, ['orderDate'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['name', 'orderDate', 'source'];
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
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

OrdersListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'ordersActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default OrdersListComponent;