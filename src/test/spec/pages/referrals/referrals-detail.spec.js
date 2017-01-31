'use strict';
import ReferralsDetailComponent from '../../../../app/rippleui/pages/referrals/referrals-detail.component.js';
import '../../../../app/index';

describe('Referrals Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, referralsActions, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _referralsActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    referralsActions = _referralsActions_;
    usSpinnerService = _usSpinnerService_;

    template = ReferralsDetailComponent.template;
    ctrl = controller(ReferralsDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      referralsActions: referralsActions,
      usSpinnerService: usSpinnerService
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'referralsLoad');
    spyOn(ctrl, 'edit');

    ctrl.referralsLoad();
    ctrl.setCurrentPageData();
    ctrl.edit();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("referralsLoad was called", function() {
    expect(ctrl.referralsLoad).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("edit was called", function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
});