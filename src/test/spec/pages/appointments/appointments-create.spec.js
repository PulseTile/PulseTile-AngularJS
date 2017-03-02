'use strict';
import AppointmentsCreateComponent from '../../../../app/rippleui/pages/appointments/appointments-create.component';
import '../../../../app/index';

describe('Appointments Create', function() {

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
  
  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _appointmentsActions_,_$ngRedux_, _usSpinnerService_, _serviceRequests_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    appointmentsActions = _appointmentsActions_;
    usSpinnerService = _usSpinnerService_;

    template = AppointmentsCreateComponent.template;

    ctrl = controller(AppointmentsCreateComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      appointmentsActions: appointmentsActions,
      $ngRedux: ngRedux,
      usSpinnerService: usSpinnerService,
      serviceRequests: _serviceRequests_
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'goList');
    spyOn(scope, 'create');

    ctrl.goList();
    ctrl.setCurrentPageData();
    scope.create();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("goList was called", function() {
    expect(ctrl.goList).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(scope.create).toHaveBeenCalled();
  });
});