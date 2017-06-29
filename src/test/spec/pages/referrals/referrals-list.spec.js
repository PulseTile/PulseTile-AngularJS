'use strict';
import ReferralsListComponent from '../../../../app/pulsetileui/pages/referrals/referrals-list.component.js';
import '../../../../app/index';
import * as types from '../../../../app/constants/ActionTypes';
import referrals from '../../../../app/pulsetileui/pages/referrals/referrals-reducer-all.js';

describe('Referrals List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall, stateParams, state, ngRedux, referralsActions, serviceRequests, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _referralsActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    referralsActions = _referralsActions_;
    usSpinnerService = _usSpinnerService_;

    template = ReferralsListComponent.template;

    ctrl = controller(ReferralsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      referralsActions: referralsActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('referralsActions');
    // scope.$digest();
  }));
  beforeEach(function() {
    fakeCall = {
      callReferrals: referrals
    };

    spyOn(fakeCall, 'callReferrals');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    fakeCall.callReferrals({}, types.REFERRALS);

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
  it('Include ReferralsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("Referrals reducer was called", function() {
    expect(fakeCall.callReferrals).toHaveBeenCalled();
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