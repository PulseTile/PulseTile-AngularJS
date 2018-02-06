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
let templateOrdersDetail = require('./orders-detail.html');

class OrdersDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, ordersActions, usSpinnerService, serviceRequests) {
    this.actionLoadList = ordersActions.all;
    this.actionLoadDetail = ordersActions.get;

    usSpinnerService.spin('detail-spinner');
    this.actionLoadDetail($stateParams.patientId, $stateParams.detailsIndex);
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.orders;
      const { detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        this.order = state.dataGet;
        (detailsIndex === state.dataGet.sourceId) ? usSpinnerService.stop('detail-spinner') : null;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
      if (state.error) {
        usSpinnerService.stop('detail-spinner');
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);
  }
}

const OrdersDetailComponent = {
  template: templateOrdersDetail,
  controller: OrdersDetailController
};

OrdersDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'ordersActions', 'usSpinnerService', 'serviceRequests'];
export default OrdersDetailComponent;