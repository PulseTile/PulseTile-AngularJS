'use strict';
import DiagnosesDetailComponent from '../diagnoses-detail.component.js';

describe('Diagnoses Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _diagnosesActions_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = DiagnosesDetailComponent.template;
    ctrl = controller(DiagnosesDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      diagnosesActions: _diagnosesActions_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'actionLoadDetail');
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'cancelEdit');
    spyOn(ctrl, 'convertToLabel');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(scope, 'actionUpdateDetail');
    spyOn(scope, 'confirmEdit');
    spyOn(scope, 'isLocked');

    ctrl.actionLoadList();
    ctrl.actionLoadDetail();
    ctrl.edit();
    ctrl.cancelEdit();
    ctrl.convertToLabel();
    ctrl.setCurrentPageData();
    scope.actionUpdateDetail();
    scope.confirmEdit();
    scope.isLocked();
  });

  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('UnlockedSources', function() {
    expect(scope.UnlockedSources[0]).toBe('handi.ehrscape.com');
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
  it('edit was called', function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it('cancelEdit was called', function() {
    expect(ctrl.cancelEdit).toHaveBeenCalled();
  });
  it('convertToLabel was called', function() {
    expect(ctrl.convertToLabel).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });

  it('actionUpdateDetail was called', function() {
    expect(scope.actionUpdateDetail).toHaveBeenCalled();
  });
  it('confirmEdit was called', function() {
    expect(scope.confirmEdit).toHaveBeenCalled();
  });
  it('isLocked was called', function() {
    expect(scope.isLocked).toHaveBeenCalled();
  });
});