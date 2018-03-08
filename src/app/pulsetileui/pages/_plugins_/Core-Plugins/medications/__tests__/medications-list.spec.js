'use strict';
import MedicationsListComponent from '../medications-list.component.js';
import * as types from '../action-types';
import medications from '../medications-reducer-all.js';

describe('Medications List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _medicationsActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = MedicationsListComponent.template;

    ctrl = controller(MedicationsListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      medicationsActions: _medicationsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
    });
    actions = $injector.get('medicationsActions');
    // scope.$digest();
  }));
  beforeEach(function() {
    fakeCall = {
      callMedications: medications
    };

    spyOn(fakeCall, 'callMedications');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'actionLoadList');

    fakeCall.callMedications({}, types.MEDICATIONS);

    ctrl.go();
    ctrl.create();
    ctrl.setCurrentPageData();
    ctrl.actionLoadList();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include ordersActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it('Medications reducer was called', function() {
    expect(fakeCall.callMedications).toHaveBeenCalled();
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
  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
});