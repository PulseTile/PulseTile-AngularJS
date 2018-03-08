'use strict';
import EolcareplansListComponent from '../eolcareplans-list.component';
import * as types from '../action-types';
import eolcareplans from '../eolcareplans-reducer-all.js';

describe('Care Plans List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _eolcareplansActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = EolcareplansListComponent.template;

    ctrl = controller(EolcareplansListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      eolcareplansActions: _eolcareplansActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
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
    spyOn(ctrl, 'actionLoadList');

    fakeCall.callCareplans({}, types.EOLCAREPLANS);

    ctrl.go();
    ctrl.setCurrentPageData();
    ctrl.actionLoadList();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Appointments reducer was called', function() {
    expect(fakeCall.callCareplans).toHaveBeenCalled();
  });
  it('route go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
});