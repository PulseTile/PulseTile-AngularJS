'use strict';
import PatientsChartsComponent from '../../../../app/rippleui/pages/patients-charts/patients-charts.component';
import '../../../../app/index';

describe('Patients Charts', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, state, $window, patientsActions, ngRedux, uibModal, serviceRequests, $timeout, Patient;

  beforeEach(inject(($injector, $controller, _$state_, _$window_, _patientsActions_, _$ngRedux_,_$uibModal_, _serviceRequests_, _$timeout_, _Patient_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    $window = _$window_;
    patientsActions = _patientsActions_;
    uibModal = _$uibModal_;
    serviceRequests = _serviceRequests_;
    $timeout = _$timeout_;
    Patient = _Patient_;

    template = PatientsChartsComponent.template;
    ctrl = controller(PatientsChartsComponent.controller, {
      $scope: scope,
      $state: state,
      $window: $window,
      patientsActions: patientsActions,
      $ngRedux: ngRedux,
      $uibModal: uibModal,
      serviceRequests: serviceRequests,
      $timeout: $timeout,
      Patient: Patient
    });
  }));
  //         
  beforeEach(function() {
    spyOn(ctrl, 'openModal');
    spyOn(ctrl, 'goToPatientsList');
    spyOn(ctrl, 'goToLookUp');
    spyOn(ctrl, 'getPatients');
    spyOn(ctrl, 'toggleChart');
    
    ctrl.openModal();
    ctrl.goToPatientsList();
    ctrl.goToLookUp();
    ctrl.getPatients();
    ctrl.toggleChart();

  });  
  
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("openModal was called", function() {
    expect(ctrl.openModal).toHaveBeenCalled();
  });
  it("goToPatientsList was called", function() {
    expect(ctrl.goToPatientsList).toHaveBeenCalled();
  });
  it("goToLookUp was called", function() {
    expect(ctrl.goToLookUp).toHaveBeenCalled();
  });
  it("getPatients was called", function() {
    expect(ctrl.getPatients).toHaveBeenCalled();
  });
  it("toggleChart was called", function() {
    expect(ctrl.toggleChart).toHaveBeenCalled();
  });
});