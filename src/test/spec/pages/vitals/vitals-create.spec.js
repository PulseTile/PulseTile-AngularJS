'use strict';
import VitalsCreateComponent from '../../../../app/pulsetileui/pages/vitals/vitals-create.component';
import '../../../../app/index';

describe('VitalsCreateComponent', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, referralsActions, usSpinnerService;
  
  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _vitalsActions_, _serviceRequests_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;

    template = VitalsCreateComponent.template;
    ctrl = controller(VitalsCreateComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      patientsActions: _patientsActions_,
      vitalsActions: _vitalsActions_,
      serviceRequests: _serviceRequests_
    });
  }));

  beforeEach(function() {

    spyOn(scope, 'getHighlighterClass');
    spyOn(scope, 'changeVital');
    spyOn(ctrl, 'goList');
    spyOn(ctrl, 'setCurrentPageData');

    scope.getHighlighterClass();
    scope.changeVital();
    ctrl.goList();
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
  it("changeVital was called", function() {
    expect(scope.changeVital).toHaveBeenCalled();
  });
  it("goList was called", function() {
    expect(ctrl.goList).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});