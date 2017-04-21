'use strict';
import DiagnosesListComponent from '../../../../app/rippleui/pages/diagnoses/diagnoses-list.component.js';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import diagnoses from '../../../../app/rippleui/pages/diagnoses/diagnoses-reducer-all.js';

describe('Diagnoses List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, 
    ctrl, 
    controller, 
    template, 
    stateParams, 
    state, 
    ngRedux, 
    diagnosesActions, 
    serviceRequests, 
    usSpinnerService,
    actions,
    fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _diagnosesActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    diagnosesActions = _diagnosesActions_;
    usSpinnerService = _usSpinnerService_;

    template = DiagnosesListComponent.template;

    ctrl = controller(DiagnosesListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      diagnosesActions: diagnosesActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('diagnosesActions');
    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callDiagnoses: diagnoses
    };

    spyOn(fakeCall, 'callDiagnoses');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'diagnosesLoad');

    fakeCall.callDiagnoses({}, types.DIAGNOSES);

    ctrl.go();
    ctrl.create();
    ctrl.setCurrentPageData();
    ctrl.diagnosesLoad();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include contactsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("Diagnoses reducer was called", function() {
    expect(fakeCall.callDiagnoses).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("create was called", function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("diagnosesLoad was called", function() {
    expect(ctrl.diagnosesLoad).toHaveBeenCalled();
  });
});