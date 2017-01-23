'use strict';
import HeightAndWeightListComponent from '../../../../app/rippleui/pages/height-and-weight/heightAndWeight-list.component.js';
import '../../../../app/index';
import * as types from '../../../../app/constants/ActionTypes';
import heightAndWeight from '../../../../app/rippleui/pages/height-and-weight/heightAndWeight-reducer-all.js';
import '../../../../app/index';

describe('HeightAndWeight List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall, stateParams, state, ngRedux, heightAndWeightActions, serviceRequests, HeightAndWeightModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _heightAndWeightActions_, _serviceRequests_, _HeightAndWeightModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    heightAndWeightActions = _heightAndWeightActions_;
    HeightAndWeightModal = _HeightAndWeightModal_;
    usSpinnerService = _usSpinnerService_;

    template = HeightAndWeightListComponent.template;

    ctrl = controller(HeightAndWeightListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      heightAndWeightActions: heightAndWeightActions,
      serviceRequests: serviceRequests,
      HeightAndWeightModal: HeightAndWeightModal,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('heightAndWeightActions');
    // scope.$digest();
  }));
  beforeEach(function() {
    fakeCall = {
      callHeightAndWeight: heightAndWeight
    };

    spyOn(fakeCall, 'callHeightAndWeight');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'search');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    fakeCall.callHeightAndWeight({}, types.HEIGHTANDWEIGHT);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.search();
    ctrl.create();
    ctrl.setCurrentPageData();
  });

  it('currentPage', function() {
    expect(ctrl.currentPage).toBe(1);
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
  it("HeightAndWeight reducer was called", function() {
    expect(fakeCall.callHeightAndWeight).toHaveBeenCalled();
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
  it("search was called", function() {
    expect(ctrl.search).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});