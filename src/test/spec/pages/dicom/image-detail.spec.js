'use strict';
import ImageDetailComponent from '../../../../app/rippleui/pages/dicom/image-detail.component.js';
import '../../../../app/index';

describe('Image Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, imageActions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _imageActions_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    imageActions = _imageActions_;

    template = ImageDetailComponent.template;
    ctrl = controller(ImageDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      imageActions: imageActions
    });
  }));


  it('series is empty', function() {
    expect(scope.series).toEqual([]);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});