'use strict';
import HeightAndWeightListComponent from '../heightAndWeight-list.component.js';
import * as types from '../action-types';
import heightAndWeight from '../heightAndWeight-reducer-all.js';

describe('HeightAndWeight List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _heightAndWeightActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = HeightAndWeightListComponent.template;

    ctrl = controller(HeightAndWeightListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      heightAndWeightActions: _heightAndWeightActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
    });
    actions = $injector.get('heightAndWeightActions');
  }));
  beforeEach(function() {
    fakeCall = {
      callHeightAndWeight: heightAndWeight
    };

    spyOn(fakeCall, 'callHeightAndWeight');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setCurrentPageData');

    fakeCall.callHeightAndWeight({}, types.HEIGHTANDWEIGHT);

    ctrl.go();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include heightAndWeightActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it('HeightAndWeight reducer was called', function() {
    expect(fakeCall.callHeightAndWeight).toHaveBeenCalled();
  });

  it('route go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});