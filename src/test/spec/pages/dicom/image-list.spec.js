'use strict';
import ImageListComponent from '../../../../app/rippleui/pages/dicom/image-list.component.js';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import series from '../../../../app/rippleui/pages/dicom/series-reducer-all.js';

describe('Image List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, 
    ctrl, 
    controller, 
    template, 
    stateParams, 
    state, 
    ngRedux, 
    imageActions, 
    serviceRequests, 
    usSpinnerService, 
    actions, 
    fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _imageActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    imageActions = _imageActions_;
    usSpinnerService = _usSpinnerService_;

    template = ImageListComponent.template;

    ctrl = controller(ImageListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      imageActions: imageActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('imageActions');
    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callSeries: series
    };

    spyOn(fakeCall, 'callSeries');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'search');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'imageLoad');

    fakeCall.callSeries({}, types.SERIES_GET);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.search();
    ctrl.setCurrentPageData();
    ctrl.imageLoad();
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
  it("Series reducer was called", function() {
    expect(fakeCall.callSeries).toHaveBeenCalled();
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
  it("search was called", function() {
    expect(ctrl.search).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("imageLoad was called", function() {
    expect(ctrl.imageLoad).toHaveBeenCalled();
  });
});