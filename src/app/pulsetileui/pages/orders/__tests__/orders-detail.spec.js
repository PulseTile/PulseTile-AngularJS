'use strict';
import OrdersDetailComponent from '../orders-detail.component.js';

describe('Orders Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _ordersActions_, _usSpinnerService_, _serviceRequests_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = OrdersDetailComponent.template;
    ctrl = controller(OrdersDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      ordersActions: _ordersActions_,
      usSpinnerService: _usSpinnerService_,
      serviceRequests: _serviceRequests_,
    });
  }));
  beforeEach(function() {
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'actionLoadDetail');
    spyOn(ctrl, 'setCurrentPageData');

    ctrl.actionLoadList();
    ctrl.actionLoadDetail();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('actionLoadDetail was called', function() {
    expect(ctrl.actionLoadDetail).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});