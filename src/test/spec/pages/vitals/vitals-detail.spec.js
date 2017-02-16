'use strict';
import VitalsDetailComponent from '../../../../app/rippleui/pages/vitals/vitals-detail.component';
import '../../../../app/index';

describe('VitalsDetailComponent', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, state, serviceVitalsSigns;
  
  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _vitalsActions_, _serviceRequests_, _usSpinnerService_, _serviceVitalsSigns_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceVitalsSigns = _serviceVitalsSigns_;

    template = VitalsDetailComponent.template;
    ctrl = controller(VitalsDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      patientsActions: _patientsActions_,
      vitalsActions: _vitalsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceVitalsSigns: _serviceVitalsSigns_
    });
  }));

  beforeEach(function() {

    spyOn(scope, 'getHighlighterClass');
    spyOn(scope, 'confirmEdit');
    spyOn(ctrl, 'cancelEdit');
    spyOn(ctrl, 'setCurrentPageData');

    scope.getHighlighterClass();
    scope.confirmEdit();
    ctrl.cancelEdit();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('ctrl exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("getHighlighterClass was called", function() {
    expect(scope.getHighlighterClass).toHaveBeenCalled();
  });
  it("confirmEdit was called", function() {
    expect(scope.confirmEdit).toHaveBeenCalled();
  });
  it("cancelEdit was called", function() {
    expect(ctrl.cancelEdit).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});