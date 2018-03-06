'use strict';
import ReferralsListComponent from '../referrals-list.component.js';
import * as types from '../action-types';
import referrals from '../referrals-reducer-all.js';

describe('Referrals List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _referralsActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = ReferralsListComponent.template;

    ctrl = controller(ReferralsListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      referralsActions: _referralsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
    });
    actions = $injector.get('referralsActions');
  }));
  beforeEach(function() {
    fakeCall = {
      callReferrals: referrals
    };

    spyOn(fakeCall, 'callReferrals');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'actionLoadList');

    fakeCall.callReferrals({}, types.REFERRALS);

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
  it('Include ReferralsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it('Referrals reducer was called', function() {
    expect(fakeCall.callReferrals).toHaveBeenCalled();
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