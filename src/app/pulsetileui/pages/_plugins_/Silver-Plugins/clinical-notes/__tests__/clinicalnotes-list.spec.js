'use strict';
import ClinicalnotesListComponent from '../clinicalnotes-list.component.js';
import * as types from '../action-types';
import clinicalnotes from '../clinicalnotes-reducer-all.js';

describe('Clinicalnotes List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, fakeCall, actions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _personalnotesActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = ClinicalnotesListComponent.template;

    ctrl = controller(ClinicalnotesListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      personalnotesActions: _personalnotesActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
    });

    actions = $injector.get('personalnotesActions');
  }));

  beforeEach(function() {
    fakeCall = {
      callClinicalnotes: clinicalnotes
    };

    spyOn(fakeCall, 'callClinicalnotes');

    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setCurrentPageData');

    spyOn(actions, 'all');
    spyOn(actions, 'get');
    spyOn(actions, 'create');
    spyOn(actions, 'update');

    fakeCall.callClinicalnotes({}, types.CLINICALNOTES);

    ctrl.actionLoadList();
    ctrl.create();
    ctrl.go();
    ctrl.setCurrentPageData();
    actions.all();
    actions.get();
    actions.create();
    actions.update();
  });
  
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include personalnotesActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it('Clinicalnotes reducer was called', function() {
    expect(fakeCall.callClinicalnotes).toHaveBeenCalled();
  });
  it('personalnotesActions methods was called', function() {
    expect(actions.all).toHaveBeenCalled();
    expect(actions.get).toHaveBeenCalled();
    expect(actions.create).toHaveBeenCalled();
    expect(actions.update).toHaveBeenCalled();
  });
  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it('go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});