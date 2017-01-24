'use strict';
import AppointmentsDetailComponent from '../../../../app/rippleui/pages/appointments/appointments-detail.component.js';
import '../../../../app/index';

describe('Appointments Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));
  
  let scope, 
      ctrl, 
      controller, 
      template, 
      stateParams, 
      state, 
      ngRedux, 
      appointmentsActions, 
      usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _appointmentsActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    appointmentsActions = _appointmentsActions_;
    usSpinnerService = _usSpinnerService_;

    template = AppointmentsDetailComponent.template;

    ctrl = controller(AppointmentsDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      appointmentsActions: appointmentsActions,
      usSpinnerService: usSpinnerService
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'appointmentsLoad');

    ctrl.appointmentsLoad();
    ctrl.setCurrentPageData();
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
  it("appointmentsLoad was called", function() {
    expect(ctrl.appointmentsLoad).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});