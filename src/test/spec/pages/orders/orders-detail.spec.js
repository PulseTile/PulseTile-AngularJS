'use strict';
import OrdersDetailComponent from '../../../../app/rippleui/pages/orders/orders-detail.component.js';
import '../../../../app/index';

describe('Orders Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, ordersActions, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _ordersActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    ordersActions = _ordersActions_;
    usSpinnerService = _usSpinnerService_;

    template = OrdersDetailComponent.template;
    ctrl = controller(OrdersDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      ordersActions: ordersActions,
      usSpinnerService: usSpinnerService
    });
  }));
  beforeEach(function() {
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'ordersLoad');

    ctrl.ordersLoad();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("ordersLoad was called", function() {
    expect(ctrl.ordersLoad).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});