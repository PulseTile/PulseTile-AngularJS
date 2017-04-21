'use strict';
import AllergiesListComponent from '../../../../app/rippleui/pages/allergies/allergies-list.component.js';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import allergies from '../../../../app/rippleui/pages/allergies/allergies-reducer-all.js';
import '../../../../app/index';

describe('Allergies List', function() {
  beforeEach(angular.mock.module('ripple-ui'));
  beforeEach(angular.mock.module('app.actions'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, allergiesActions, serviceRequests, usSpinnerService, actions, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _allergiesActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    allergiesActions = _allergiesActions_;
    usSpinnerService = _usSpinnerService_;

    template = AllergiesListComponent.template;

    ctrl = controller(AllergiesListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      allergiesActions: allergiesActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('allergiesActions');    
    // scope.$digest();
  }));
  beforeEach(function() {
    fakeCall = {
      callAllergies: allergies
    };

    spyOn(fakeCall, 'callAllergies');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(actions, 'all');
    spyOn(actions, 'get');
    spyOn(actions, 'create');
    spyOn(actions, 'update');

    fakeCall.callAllergies({}, types.ALLERGIES);

    ctrl.go();
    ctrl.create();
    ctrl.setCurrentPageData();
    actions.all();
    actions.get();
    actions.create();
    actions.update();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Include allergiesActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("allergiesActions methods was called", function() {
    expect(actions.all).toHaveBeenCalled();
    expect(actions.get).toHaveBeenCalled();
    expect(actions.create).toHaveBeenCalled();
    expect(actions.update).toHaveBeenCalled();
  });
  it("Allergies reducer was called", function() {
    expect(fakeCall.callAllergies).toHaveBeenCalled();
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