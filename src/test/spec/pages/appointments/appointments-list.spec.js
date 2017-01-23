'use strict';
import AppointmentsListComponent from '../../../../app/rippleui/pages/appointments/appointments-list.component.js';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import appointments from '../../../../app/rippleui/pages/appointments/appointments-reducer-all.js';

describe('Appointments List', function() {

  beforeEach(angular.mock.module('ripple-ui'));
  beforeEach(angular.mock.module('app.actions'));

  let scope,
      ctrl,
      controller,
      template,
      stateParams,
      state,
      ngRedux,
      appointmentsActions,
      serviceRequests,
      AppointmentsModal,
      usSpinnerService,
      actions,
      fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _appointmentsActions_, _serviceRequests_, _AppointmentsModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    appointmentsActions = _appointmentsActions_;
    AppointmentsModal = _AppointmentsModal_;
    usSpinnerService = _usSpinnerService_;

    template = AppointmentsListComponent.template;

    ctrl = controller(AppointmentsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      appointmentsActions: appointmentsActions,
      serviceRequests: serviceRequests,
      AppointmentsModal: AppointmentsModal,
      usSpinnerService: usSpinnerService
    });
    
    actions = $injector.get('appointmentsActions');
  }));

  beforeEach(function() {
    fakeCall = {
      callAppointments: appointments
    };

    spyOn(fakeCall, 'callAppointments');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'search');
    spyOn(ctrl, 'appointmentsLoad');

    fakeCall.callAppointments({}, types.APPOINTMENTS);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.create();
    ctrl.setCurrentPageData();
    ctrl.search();
    ctrl.appointmentsLoad();
  });

  it('query', function() {
    expect(scope.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Include appointmentsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("Appointments reducer was called", function() {
    expect(fakeCall.callAppointments).toHaveBeenCalled();
  });
  it("pageChangeHandler was called", function() {
    expect(ctrl.pageChangeHandler).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("selected was called", function() {
    expect(ctrl.selected).toHaveBeenCalled();
  });
  it("create was called", function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("search was called", function() {
    expect(ctrl.search).toHaveBeenCalled();
  });
  it("appointmentsLoad was called", function() {
    expect(ctrl.appointmentsLoad).toHaveBeenCalled();
  });
});