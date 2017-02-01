'use strict';
import VitalsDetailComponent from '../../../../app/rippleui/pages/vitals/vitals-detail.component';
import '../../../../app/index';

describe('VitalsDetailComponent', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, referralsActions, usSpinnerService;
  
  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _vitalsActions_, _serviceRequests_, _usSpinnerService_, _$sce_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;

    template = VitalsDetailComponent.template;
    ctrl = controller(VitalsDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      patientsActions: _patientsActions_,
      vitalsActions: _vitalsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_
    });
  }));


  it('Template exist', function() {
    expect(template).toBeDefined();
  });
});