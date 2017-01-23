'use strict';
import PatientsBannerComponent from '../../../../app/rippleui/pages/patients-detail/patients-banner.component';
import '../../../../app/index';

describe('Patients Banner', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, state, stateParams, ngRedux, patientsActions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    patientsActions = _patientsActions_;

    template = PatientsBannerComponent.template;
    ctrl = controller(PatientsBannerComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      patientsActions: patientsActions
    });
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});