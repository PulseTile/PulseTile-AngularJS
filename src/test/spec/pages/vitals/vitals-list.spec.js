'use strict';
import VitalsListComponent from '../../../../app/rippleui/pages/vitals/vitals-list.component';
import '../../../../app/index';

describe('Vitals List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, referralsActions, usSpinnerService;
  
  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _vitalsActions_, _serviceRequests_, _usSpinnerService_, _$window_, _$timeout_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;

    template = VitalsListComponent.template;
    ctrl = controller(VitalsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      vitalsActions: _vitalsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      $window: _$window_,
      $timeout: _$timeout_
    });
  }));


  it('Template exist', function() {
    expect(template).toBeDefined();
  });
});