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

  beforeEach(function() {

    spyOn(scope, 'zoomIn');
    spyOn(scope, 'zoomOut');
    spyOn(scope, 'moveImg');

    scope.zoomIn();
    scope.zoomOut();
    scope.moveImg();
  });

  it('series is empty', function() {
    expect(scope.series).toEqual([]);
  });
  it('isMove is empty', function() {
    expect(scope.isMove).toEqual(false);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("zoomIn was called", function() {
    expect(scope.zoomIn).toHaveBeenCalled();
  });
  it("zoomOut was called", function() {
    expect(scope.zoomOut).toHaveBeenCalled();
  });
  it("moveImg was called", function() {
    expect(scope.moveImg).toHaveBeenCalled();
  });
});