'use strict';
import DiagnosesListComponent from '../diagnoses-list.component.js';
import * as types from '../action-types';
import diagnoses from '../diagnoses-reducer-all.js';

describe('Diagnoses List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _diagnosesActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = DiagnosesListComponent.template;

    ctrl = controller(DiagnosesListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      diagnosesActions: _diagnosesActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
    });
    actions = $injector.get('diagnosesActions');
  }));

  beforeEach(function() {
    fakeCall = {
      callDiagnoses: diagnoses
    };

    spyOn(fakeCall, 'callDiagnoses');

    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    fakeCall.callDiagnoses({}, types.DIAGNOSES);

    ctrl.actionLoadList();
    ctrl.go();
    ctrl.create();
    ctrl.setCurrentPageData();
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
  it('Diagnoses reducer was called', function() {
    expect(fakeCall.callDiagnoses).toHaveBeenCalled();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});