'use strict';
import OrdersCreateComponent from '../orders-create.component.js';

describe('Orders Create', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _ordersActions_, _serviceRequests_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = OrdersCreateComponent.template;
    ctrl = controller(OrdersCreateComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      ordersActions: _ordersActions_,
      serviceRequests: _serviceRequests_,
      serviceFormatted: _serviceFormatted_,
    });
  }));
  beforeEach(function() {
    spyOn(scope, 'actionLoadList');
    spyOn(scope, 'actionCreateDetail');
    spyOn(scope, 'setSelectedLeft');
    spyOn(scope, 'setSelectedRight');
    spyOn(scope, 'create');
    spyOn(scope, 'cancel');
    spyOn(scope, 'toggleSelectedItem');
    spyOn(scope, 'isInSuggestionsList');
    spyOn(scope, 'chooseItem');
    spyOn(scope, 'chooseAll');
    spyOn(scope, 'cancelItem');
    spyOn(scope, 'cancelAll');
    spyOn(scope, 'pageTwo');
    spyOn(scope, 'pageOne');
    spyOn(ctrl, 'goList');
    spyOn(ctrl, 'cancel');
    spyOn(ctrl, 'setCurrentPageData');

    scope.actionLoadList();
    scope.actionCreateDetail();
    scope.setSelectedLeft();
    scope.setSelectedRight();
    scope.create();
    scope.cancel();
    scope.toggleSelectedItem();
    scope.isInSuggestionsList();
    scope.chooseItem();
    scope.chooseAll();
    scope.cancelItem();
    scope.cancelAll();
    scope.pageTwo();
    scope.pageOne();
    ctrl.goList();
    ctrl.cancel();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('actionLoadList was called', function() {
    expect(scope.actionLoadList).toHaveBeenCalled();
  });
  it('actionCreateDetail was called', function() {
    expect(scope.actionCreateDetail).toHaveBeenCalled();
  });
  it('setSelectedLeft was called', function() {
    expect(scope.setSelectedLeft).toHaveBeenCalled();
  });
  it('setSelectedRight was called', function() {
    expect(scope.setSelectedRight).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(scope.create).toHaveBeenCalled();
  });
  it('cancel was called', function() {
    expect(scope.cancel).toHaveBeenCalled();
  });
  it('toggleSelectedItem was called', function() {
    expect(scope.toggleSelectedItem).toHaveBeenCalled();
  });
  it('isInSuggestionsList was called', function() {
    expect(scope.isInSuggestionsList).toHaveBeenCalled();
  });
  it('chooseItem was called', function() {
    expect(scope.chooseItem).toHaveBeenCalled();
  });
  it('chooseAll was called', function() {
    expect(scope.chooseAll).toHaveBeenCalled();
  });
  it('cancelItem was called', function() {
    expect(scope.cancelItem).toHaveBeenCalled();
  });
  it('cancelAll was called', function() {
    expect(scope.cancelAll).toHaveBeenCalled();
  });
  it('pageTwo was called', function() {
    expect(scope.pageTwo).toHaveBeenCalled();
  });
  it('pageOne was called', function() {
    expect(scope.pageOne).toHaveBeenCalled();
  });

  it('goList was called', function() {
    expect(ctrl.goList).toHaveBeenCalled();
  });
  it('cancel was called', function() {
    expect(ctrl.cancel).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});