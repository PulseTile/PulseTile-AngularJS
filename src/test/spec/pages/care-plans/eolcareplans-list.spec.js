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

    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callCareplans: eolcareplans
    };

    spyOn(fakeCall, 'callCareplans');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'eolcareplansLoad');

    fakeCall.callCareplans({}, types.EOLCAREPLANS);

    ctrl.go();
    ctrl.setCurrentPageData();
    ctrl.eolcareplansLoad();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("Appointments reducer was called", function() {
    expect(fakeCall.callCareplans).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("appointmentsLoad was called", function() {
    expect(ctrl.eolcareplansLoad).toHaveBeenCalled();
  });
});