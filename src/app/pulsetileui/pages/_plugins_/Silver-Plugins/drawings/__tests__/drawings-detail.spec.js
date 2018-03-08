'use strict';
import DrawingsComponent from '../drawings-detail.component';

describe('Drawings Details', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _drawingsActions_, _usSpinnerService_, _serviceRequests_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = DrawingsComponent.template;
    ctrl = controller(DrawingsComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      drawingsActions: _drawingsActions_,
      usSpinnerService: _usSpinnerService_,
      serviceRequests: _serviceRequests_,
      serviceFormatted: _serviceFormatted_,
    });
  }));

  beforeEach(function() {
    spyOn(scope, 'getCanvasImage64');
    spyOn(scope, 'confirmEdit');
    spyOn(scope, 'confirmEditDetail');
    spyOn(scope, 'resizeDrawing');
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'actionLoadDetail');
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'cancelEdit');
    spyOn(ctrl, 'editDetail');
    spyOn(ctrl, 'cancelEditDetail');
    spyOn(ctrl, 'setCurrentPageData');

    scope.getCanvasImage64();
    scope.confirmEdit();
    scope.confirmEditDetail();
    scope.resizeDrawing();
    ctrl.actionLoadList();
    ctrl.actionLoadDetail();
    ctrl.edit();
    ctrl.cancelEdit();
    ctrl.editDetail();
    ctrl.cancelEditDetail();
    ctrl.setCurrentPageData();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('getCanvasImage64 was called', function() {
    expect(scope.getCanvasImage64).toHaveBeenCalled();
  });
  it('confirmEdit was called', function() {
    expect(scope.confirmEdit).toHaveBeenCalled();
  });
  it('confirmEditDetail was called', function() {
    expect(scope.confirmEditDetail).toHaveBeenCalled();
  });
  it('resizeDrawing was called', function() {
    expect(scope.resizeDrawing).toHaveBeenCalled();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('actionLoadDetail was called', function() {
    expect(ctrl.actionLoadDetail).toHaveBeenCalled();
  });
  it('edit was called', function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it('cancelEdit was called', function() {
    expect(ctrl.cancelEdit).toHaveBeenCalled();
  });
  it('editDetail was called', function() {
    expect(ctrl.editDetail).toHaveBeenCalled();
  });
  it('cancelEditDetail was called', function() {
    expect(ctrl.cancelEditDetail).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});