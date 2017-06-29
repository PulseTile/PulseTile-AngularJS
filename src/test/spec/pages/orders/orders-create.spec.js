'use strict';
import OrdersCreateComponent from '../../../../app/pulsetileui/pages/orders/orders-create.component.js';
import '../../../../app/index';

describe('Orders Create', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, state;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _ordersActions_, _serviceRequests_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;

    template = OrdersCreateComponent.template;
    ctrl = controller(OrdersCreateComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      ordersActions: _ordersActions_,
      serviceRequests: _serviceRequests_
    });
  }));
  beforeEach(function() {
    spyOn(scope, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    scope.create();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("create was called", function() {
    expect(scope.create).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});