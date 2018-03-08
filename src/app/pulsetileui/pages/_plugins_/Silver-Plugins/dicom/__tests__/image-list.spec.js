'use strict';
import ImageListComponent from '../image-list.component.js';
import * as types from '../action-types';
import series from '../series-reducer-all.js';

describe('Image List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _imageActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = ImageListComponent.template;

    ctrl = controller(ImageListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      imageActions: _imageActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
    });
    actions = $injector.get('imageActions');
  }));

  beforeEach(function() {
    fakeCall = {
      callSeries: series
    };

    spyOn(fakeCall, 'callSeries');

    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setCurrentPageData');

    fakeCall.callSeries({}, types.SERIES_GET);

    ctrl.actionLoadList();
    ctrl.go();
    ctrl.setCurrentPageData();
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
  it('Series reducer was called', function() {
    expect(fakeCall.callSeries).toHaveBeenCalled();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});