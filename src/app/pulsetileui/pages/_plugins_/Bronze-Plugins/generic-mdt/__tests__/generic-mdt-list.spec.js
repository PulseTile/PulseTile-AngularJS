'use strict';
import GenericMdtListComponent from '../generic-mdt-list.component.js';
import * as types from '../action-types';
import genericmdt from '../generic-mdt-reducer-all.js';

describe('GenericMdt List', function() {

  beforeEach(angular.mock.module('ripple-ui'));
  let scope, ctrl, controller, template, actions, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _genericmdtActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = GenericMdtListComponent.template;

    ctrl = controller(GenericMdtListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      genericmdtActions: _genericmdtActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
    });
    actions = $injector.get('genericmdtActions');
  }));

  beforeEach(function() {
    fakeCall = {
      callGenericmdt: genericmdt
    };

    spyOn(fakeCall, 'callGenericmdt');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'actionLoadList');

    fakeCall.callGenericmdt({}, types.GENERICMDT);

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
  it('Include contactsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it('Genericmdt reducer was called', function() {
    expect(fakeCall.callGenericmdt).toHaveBeenCalled();
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