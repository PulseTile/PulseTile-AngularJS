'use strict';
import HandleErrorsComponent from '../handle-errors.component';

describe('HandleErrorsComponent', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller;

  beforeEach(inject(($injector, $controller, _$state_, _$ngRedux_, _ConfirmationHandleErrors_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    ctrl = controller(HandleErrorsComponent.controller, {
      $scope: scope,
      $ngRedux: _$ngRedux_,
      ConfirmationHandleErrors: _ConfirmationHandleErrors_
    });
  }));
  beforeEach(function() {
    spyOn(ctrl, 'getErrorConfig');
    spyOn(ctrl, 'showError');
    spyOn(ctrl, 'setCurrentPageData');

    ctrl.getErrorConfig();
    ctrl.showError();
    ctrl.setCurrentPageData();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('getErrorConfig was called', function() {
    expect(ctrl.getErrorConfig).toHaveBeenCalled();
  });
  it('showError was called', function() {
    expect(ctrl.showError).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });

});