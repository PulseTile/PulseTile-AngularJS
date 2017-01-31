'use strict';
import PatientsSidebarComponent from '../../../../app/rippleui/pages/patients-detail/patients-sidebar.component';
import '../../../../app/index';

describe('Patients Sidebar', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, state, stateParams, ngRedux, patientsActions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    patientsActions = _patientsActions_;

    template = PatientsSidebarComponent.template;
    ctrl = controller(PatientsSidebarComponent.controller, {
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
  it('linksCollection exist', function() {
    expect(ctrl.linksCollection).toBeDefined();
  });
});