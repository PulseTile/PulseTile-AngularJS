'use strict';
import PersonalnotesListComponent from '../personalnotes-list.component.js';
import * as types from '../action-types';
import personalnotes from '../personalnotes-reducer-all.js';

describe('Personalnotes List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, fakeCall, actions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _personalnotesActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = PersonalnotesListComponent.template;

    ctrl = controller(PersonalnotesListComponent.controller, {
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
      callPersonalnotes: personalnotes
    };

    spyOn(fakeCall, 'callPersonalnotes');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'actionLoadList');
    spyOn(actions, 'all');
    spyOn(actions, 'get');
    spyOn(actions, 'create');
    spyOn(actions, 'update');

    fakeCall.callPersonalnotes({}, types.PERSONALNOTES);

    ctrl.go();
    ctrl.create();
    ctrl.setCurrentPageData();
    ctrl.actionLoadList();
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
  it('Personalnotes reducer was called', function() {
    expect(fakeCall.callPersonalnotes).toHaveBeenCalled();
  });
  it('personalnotesActions methods was called', function() {
    expect(actions.all).toHaveBeenCalled();
    expect(actions.get).toHaveBeenCalled();
    expect(actions.create).toHaveBeenCalled();
    expect(actions.update).toHaveBeenCalled();
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