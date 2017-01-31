'use strict';
import EolcareplansListComponent from '../../../../app/rippleui/pages/care-plans/eolcareplans-list.component';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import eolcareplans from '../../../../app/rippleui/pages/care-plans/eolcareplans-reducer-all.js';

describe('Care Plans List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, 
    ctrl, 
    controller, 
    template, 
    stateParams, 
    state, 
    ngRedux, 
    eolcareplansActions, 
    serviceRequests, 
    usSpinnerService,
    actions,
    fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _eolcareplansActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    eolcareplansActions = _eolcareplansActions_;
    usSpinnerService = _usSpinnerService_;

    template = EolcareplansListComponent.template;

    ctrl = controller(EolcareplansListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      eolcareplansActions: eolcareplansActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });

    actions = $injector.get('appointmentsActions');
    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callCareplans: eolcareplans
    };

    spyOn(fakeCall, 'callCareplans');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'search');
    spyOn(ctrl, 'eolcareplansLoad');

    fakeCall.callCareplans({}, types.EOLCAREPLANS);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.setCurrentPageData();
    ctrl.search();
    ctrl.eolcareplansLoad();
  });

  it('currentPage is 1', function() {
    expect(ctrl.currentPage).toBe(1);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include appointmentsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("Appointments reducer was called", function() {
    expect(fakeCall.callCareplans).toHaveBeenCalled();
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
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("search was called", function() {
    expect(ctrl.search).toHaveBeenCalled();
  });
  it("appointmentsLoad was called", function() {
    expect(ctrl.eolcareplansLoad).toHaveBeenCalled();
  });
});