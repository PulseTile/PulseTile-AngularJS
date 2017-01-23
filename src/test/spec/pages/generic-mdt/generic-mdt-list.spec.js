'use strict';
import GenericMdtListComponent from '../../../../app/rippleui/pages/generic-mdt/generic-mdt-list.component.js';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import genericmdt from '../../../../app/rippleui/pages/generic-mdt/generic-mdt-reducer-all.js';

describe('GenericMdt List', function() {

  beforeEach(angular.mock.module('ripple-ui'));
  let scope,
    ctrl, 
    controller, 
    template, 
    stateParams, 
    state, 
    ngRedux, 
    genericmdtActions, 
    serviceRequests, 
    GenericMdtModal,
    usSpinnerService,
    actions,
    fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _genericmdtActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    genericmdtActions = _genericmdtActions_;
    usSpinnerService = _usSpinnerService_;

    template = GenericMdtListComponent.template;

    ctrl = controller(GenericMdtListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      genericmdtActions: genericmdtActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('genericmdtActions');
    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callGenericmdt: genericmdt
    };

    spyOn(fakeCall, 'callGenericmdt');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'genericmdtLoad');

    fakeCall.callGenericmdt({}, types.GENERICMDT);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.create();
    ctrl.setCurrentPageData();
    ctrl.genericmdtLoad();
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
  it("Genericmdt reducer was called", function() {
    expect(fakeCall.callGenericmdt).toHaveBeenCalled();
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
  it("cancermdtLoad was called", function() {
    expect(ctrl.genericmdtLoad).toHaveBeenCalled();
  });
});