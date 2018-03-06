'use strict';
import ProceduresListComponent from '../procedures-list.component.js';
import * as types from '../action-types';
import procedures from '../procedures-reducer-all.js';

describe('Procedures List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _proceduresActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = ProceduresListComponent.template;

    ctrl = controller(ProceduresListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      proceduresActions: _proceduresActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
    });
    actions = $injector.get('proceduresActions');
  }));
  beforeEach(function() {
    fakeCall = {
      callProcedures: procedures
    };

    spyOn(fakeCall, 'callProcedures');

    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    fakeCall.callProcedures({}, types.PROCEDURES);

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
  it('Include proceduresActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it('procedures reducer was called', function() {
    expect(fakeCall.callProcedures).toHaveBeenCalled();
  });
  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('route go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});