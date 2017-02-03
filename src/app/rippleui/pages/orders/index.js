import OrdersListComponent from './orders-list.component';
import OrdersDetailComponent from './orders-detail.component';
import OrdersCreateComponent from './orders-create.component';

angular.module('ripple-ui.orders', [])
  .component('ordersListComponent', OrdersListComponent)
  .component('ordersDetailComponent', OrdersDetailComponent)
  .component('ordersCreateComponent', OrdersCreateComponent);