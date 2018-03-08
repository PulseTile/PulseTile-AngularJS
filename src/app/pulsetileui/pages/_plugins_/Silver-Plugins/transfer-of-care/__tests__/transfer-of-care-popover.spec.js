'use strict';
import TransferOfCarePopoverComponent from '../transfer-of-care-popover.component';

describe('Transfer Of Care Popover', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _serviceRequests_, _serviceTransferOfCare_, _usSpinnerService_, _serviceVitalsSigns_, _$window_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = TransferOfCarePopoverComponent.template;
    ctrl = controller(TransferOfCarePopoverComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      serviceRequests: _serviceRequests_,
      serviceTransferOfCare: _serviceTransferOfCare_,
      usSpinnerService: _usSpinnerService_,
      serviceVitalsSigns: _serviceVitalsSigns_,
      $window: _$window_
    });
  }));

  beforeEach(function() {
    spyOn(scope, 'stopSpinner');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(scope, 'getHighlighterClass');
    spyOn(scope, 'changeTypePopover');
    spyOn(ctrl, 'openPopover');
    spyOn(ctrl, 'closePopover');

    scope.stopSpinner();
    ctrl.setCurrentPageData();
    scope.getHighlighterClass();
    scope.changeTypePopover();
    ctrl.openPopover();
    ctrl.closePopover();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('stopSpinner was called', function() {
    expect(scope.stopSpinner).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it('getHighlighterClass was called', function() {
    expect(scope.getHighlighterClass).toHaveBeenCalled();
  });
  it('changeTypePopover was called', function() {
    expect(scope.changeTypePopover).toHaveBeenCalled();
  });
  it('openPopover was called', function() {
    expect(ctrl.openPopover).toHaveBeenCalled();
  });
  it('closePopover was called', function() {
    expect(ctrl.closePopover).toHaveBeenCalled();
  });
});