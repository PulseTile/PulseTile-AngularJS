'use strict';
import OrdersListComponent from '../../../../app/rippleui/pages/orders/orders-list.component.js';
import '../../../../app/index';
import * as types from '../../../../app/constants/ActionTypes';
import orders from '../../../../app/rippleui/pages/orders/orders-reducer-all.js';
import '../../../../app/index';

describe('Orders List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall, stateParams, state, ngRedux, ordersActions, serviceRequests, OrdersModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _ordersActions_, _serviceRequests_, _OrdersModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    ordersActions = _ordersActions_;
    OrdersModal = _OrdersModal_;
    usSpinnerService = _usSpinnerService_;

    template = OrdersListComponent.template;

    ctrl = controller(OrdersListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      ordersActions: ordersActions,
      serviceRequests: serviceRequests,
      OrdersModal: OrdersModal,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('ordersActions');
    // scope.$digest();
  }));
  beforeEach(function() {
    fakeCall = {
      callOrders: orders
    };

    spyOn(fakeCall, 'callOrders');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'search');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    fakeCall.callOrders({}, types.ORDERS);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.search();
    ctrl.create();
    ctrl.setCurrentPageData();
  });

  it('Query', function() {
    expect(scope.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include ordersActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("Orders reducer was called", function() {
    expect(fakeCall.callOrders).toHaveBeenCalled();
  });
  it("pageChangeHandler was called", function() {
    expect(ctrl.pageChangeHandler).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("selected was called", function() {
    expect(ctrl.selected).toHaveBeenCalled();
  });
  it("create was called", function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it("search was called", function() {
    expect(ctrl.search).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});