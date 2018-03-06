'use strict';
import DrawingsCreateComponent from '../drawings-create.component';

describe('Drawings Create', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _drawingsActions_, _serviceRequests_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = DrawingsCreateComponent.template;
    ctrl = controller(DrawingsCreateComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      drawingsActions: _drawingsActions_,
      serviceRequests: _serviceRequests_,
      serviceFormatted: _serviceFormatted_,
    });
  }));

  beforeEach(function() {
    spyOn(scope, 'actionLoadList');
    spyOn(scope, 'actionCreateDetail');
    spyOn(scope, 'getCanvasImage64');
    spyOn(scope, 'resizeDrawing');
    spyOn(ctrl, 'goList');
    spyOn(ctrl, 'cancel');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    scope.actionLoadList();
    scope.actionCreateDetail();
    scope.getCanvasImage64();
    scope.resizeDrawing();
    ctrl.goList();
    ctrl.cancel();
    ctrl.create();
    ctrl.setCurrentPageData();

  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
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
  it('getCanvasImage64 was called', function() {
    expect(scope.getCanvasImage64).toHaveBeenCalled();
  });
  it('resizeDrawing was called', function() {
    expect(scope.resizeDrawing).toHaveBeenCalled();
  });

  it('goList was called', function() {
    expect(ctrl.goList).toHaveBeenCalled();
  });
  it('cancel was called', function() {
    expect(ctrl.cancel).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});
