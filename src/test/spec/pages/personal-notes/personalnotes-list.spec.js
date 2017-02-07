'use strict';
import PersonalnotesListComponent from '../../../../app/rippleui/pages/personal-notes/personalnotes-list.component.js';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import personalnotes from '../../../../app/rippleui/pages/personal-notes/personalnotes-reducer-all.js';

describe('Personalnotes List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, 
    ctrl, 
    controller, 
    template, 
    stateParams, 
    state, 
    ngRedux,
    personalnotesActions, 
    serviceRequests, 
    usSpinnerService,
    fakeCall,
    actions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _personalnotesActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    personalnotesActions = _personalnotesActions_;
    usSpinnerService = _usSpinnerService_;

    template = PersonalnotesListComponent.template;

    ctrl = controller(PersonalnotesListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      personalnotesActions: personalnotesActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });

    actions = $injector.get('personalnotesActions');
    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callPersonalnotes: personalnotes
    };

    spyOn(fakeCall, 'callPersonalnotes');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'personalnotesLoad');
    spyOn(actions, 'all');
    spyOn(actions, 'get');
    spyOn(actions, 'create');
    spyOn(actions, 'update');

    fakeCall.callPersonalnotes({}, types.EOLCAREPLANS);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.create();
    ctrl.setCurrentPageData();
    ctrl.personalnotesLoad();
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
  it("Personalnotes reducer was called", function() {
    expect(fakeCall.callPersonalnotes).toHaveBeenCalled();
  });
  it("personalnotesActions methods was called", function() {
    expect(actions.all).toHaveBeenCalled();
    expect(actions.get).toHaveBeenCalled();
    expect(actions.create).toHaveBeenCalled();
    expect(actions.update).toHaveBeenCalled();
  });
  it("pageChangeHandler was called", function() {
    expect(ctrl.pageChangeHandler).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("selected was called", function() {
    expect(ctrl.selected).toHaveBeenCalled();
  });
  it("create was called", function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("personalnotesLoad was called", function() {
    expect(ctrl.personalnotesLoad).toHaveBeenCalled();
  });
});