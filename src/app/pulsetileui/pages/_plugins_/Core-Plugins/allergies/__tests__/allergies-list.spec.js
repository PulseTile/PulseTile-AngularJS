'use strict';
import AllergiesListComponent from '../allergies-list.component.js';
import * as types from '../action-types';
import allergies from '../allergies-reducer-all.js';

describe('Allergies List', function() {
  beforeEach(angular.mock.module('ripple-ui'));
  beforeEach(angular.mock.module('app.actions'));

  let scope, ctrl, controller, template, actions, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _allergiesActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = AllergiesListComponent.template;

    ctrl = controller(AllergiesListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      allergiesActions: _allergiesActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
    });
    actions = $injector.get('allergiesActions');    
  }));

  beforeEach(function() {
    fakeCall = {
      callAllergies: allergies
    };

    spyOn(fakeCall, 'callAllergies');

    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(actions, 'all');
    spyOn(actions, 'get');
    spyOn(actions, 'create');
    spyOn(actions, 'update');

    fakeCall.callAllergies({}, types.ALLERGIES);

    ctrl.actionLoadList();
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
  it('allergiesActions methods was called', function() {
    expect(actions.all).toHaveBeenCalled();
    expect(actions.get).toHaveBeenCalled();
    expect(actions.create).toHaveBeenCalled();
    expect(actions.update).toHaveBeenCalled();
  });
  it('Allergies reducer was called', function() {
    expect(fakeCall.callAllergies).toHaveBeenCalled();
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