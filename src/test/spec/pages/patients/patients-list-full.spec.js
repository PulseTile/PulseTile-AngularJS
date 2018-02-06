'use strict';
import PatientsComponent from '../../../../app/pulsetileui/pages/patients-list-full/patients-list-full.component';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import patients from '../../../../app/pulsetileui/pages/patients-list/patients-reducer-all';

describe('Patients List', function() {
  beforeEach(angular.mock.module('ripple-ui'));
  beforeEach(angular.mock.module('app.actions'));

  let scope, ctrl, controller, template, state, stateParams, location, ngRedux, patientsActions, serviceRequests, Patient, actions, fakeCall, searchReport, $window, $rootScope;

  beforeEach(inject(($injector, $controller, _$window_, _$rootScope_, _$state_, _$stateParams_, _$ngRedux_, _searchReport_, _Patient_, _serviceRequests_, _patientsActions_, _$timeout_, _ConfirmationModal_, _serviceFormatted_, _searchActions_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    $window = _$window_;
    $rootScope = _$rootScope_;
    state = _$state_;
    stateParams = _$stateParams_;
    ngRedux = _$ngRedux_;
    searchReport = _searchReport_;
    Patient = _Patient_;
    serviceRequests = _serviceRequests_;
    patientsActions = _patientsActions_;

    template = PatientsComponent.template;
    ctrl = controller(PatientsComponent.controller, {
      $scope: scope,
      $window: $window,
      $rootScope: $rootScope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      searchReport: searchReport,
      Patient: Patient,
      serviceRequests: serviceRequests,
      patientsActions: patientsActions,
      $timeout: _$timeout_,
      ConfirmationModal: _ConfirmationModal_,
      serviceFormatted: _serviceFormatted_,
      searchActions: _searchActions_
    });

    actions = $injector.get('patientsActions');
  }));

  beforeEach(function() {
    fakeCall = {
        callPatients: patients
    };

    spyOn(fakeCall, 'callPatients');
    fakeCall.callPatients({}, types.PATIENTS);

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setPatients');
    spyOn(ctrl, 'processCounts');
    spyOn(ctrl, 'processDateFormat');
    spyOn(ctrl, 'processData');
    spyOn(ctrl, 'setDataRequest');
    spyOn(ctrl, 'viewPatients');
    spyOn(ctrl, 'viewDateTime');
    spyOn(ctrl, 'viewCounts');
    spyOn(ctrl, 'goToSection');
    spyOn(ctrl, 'getItem');
    spyOn(ctrl, 'getData');
    spyOn(scope, 'searchByDetails');

    ctrl.go();
    ctrl.setPatients();
    ctrl.processCounts();
    ctrl.processDateFormat();
    ctrl.processData();
    ctrl.setDataRequest();
    ctrl.viewPatients();
    ctrl.viewDateTime();
    ctrl.viewCounts();
    ctrl.goToSection();
    ctrl.getItem();
    ctrl.getData();
    scope.searchByDetails();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include patientsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it('Patients reducer was called', function() {
    expect(fakeCall.callPatients).toHaveBeenCalled();
  });
  it('route go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('setPatients was called', function() {
    expect(ctrl.setPatients).toHaveBeenCalled();
  });
  it('processCounts was called', function() {
    expect(ctrl.processCounts).toHaveBeenCalled();
  });
  it('processDateFormat was called', function() {
    expect(ctrl.processDateFormat).toHaveBeenCalled();
  });
  it('processData was called', function() {
    expect(ctrl.processData).toHaveBeenCalled();
  });
  it('setDataRequest was called', function() {
    expect(ctrl.setDataRequest).toHaveBeenCalled();
  });
  it('viewPatients was called', function() {
    expect(ctrl.viewPatients).toHaveBeenCalled();
  });
  it('viewDateTime was called', function() {
    expect(ctrl.viewDateTime).toHaveBeenCalled();
  });
  it('viewCounts was called', function() {
    expect(ctrl.viewCounts).toHaveBeenCalled();
  });
  it('goToSection was called', function() {
    expect(ctrl.goToSection).toHaveBeenCalled();
  });
  it('getItem was called', function() {
    expect(ctrl.getItem).toHaveBeenCalled();
  });
  it('getData was called', function() {
    expect(ctrl.getData).toHaveBeenCalled();
  });
  it('searchByDetails was called', function() {
    expect(scope.searchByDetails).toHaveBeenCalled();
  });
});