'use strict';
import MedicationsListComponent from '../../../../app/rippleui/pages/medications/medications-list.component.js';
import '../../../../app/index';
import * as types from '../../../../app/constants/ActionTypes';
import medications from '../../../../app/rippleui/pages/medications/medication-reducer-all.js';
import '../../../../app/index';

describe('Medications List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall, stateParams, state, ngRedux, medicationsActions, serviceRequests, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _medicationsActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    medicationsActions = _medicationsActions_;
    usSpinnerService = _usSpinnerService_;

    template = MedicationsListComponent.template;

    ctrl = controller(MedicationsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      medicationsActions: medicationsActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
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

    fakeCall.callMedications({}, types.MEDICATIONS);

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
  it('Include ordersActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("Medications reducer was called", function() {
    expect(fakeCall.callMedications).toHaveBeenCalled();
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
});