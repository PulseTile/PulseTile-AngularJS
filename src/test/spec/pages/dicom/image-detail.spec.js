'use strict';
import ImageDetailComponent from '../../../../app/rippleui/pages/dicom/image-detail.component.js';
import '../../../../app/index';

describe('Image Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, imageActions, ImageModal;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _imageActions_, _ImageModal_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    imageActions = _imageActions_;
    ImageModal = _ImageModal_;

    template = ImageDetailComponent.template;
    ctrl = controller(ImageDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      imageActions: imageActions,
      ImageModal: ImageModal
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'openImage');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'seriesDetailsLoad');
    spyOn(ctrl, 'instanceLoad');
    spyOn(ctrl, 'imageLoad');

    ctrl.openImage();
    ctrl.setCurrentPageData();
    ctrl.seriesDetailsLoad();
    ctrl.instanceLoad();
    ctrl.imageLoad();
  });

  it('series is empty', function() {
    expect(ctrl.series).toEqual([]);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("openImage was called", function() {
    expect(ctrl.openImage).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("seriesDetailsLoad was called", function() {
    expect(ctrl.seriesDetailsLoad).toHaveBeenCalled();
  });
  it("instanceLoad was called", function() {
    expect(ctrl.instanceLoad).toHaveBeenCalled();
  });
  it("imageLoad was called", function() {
    expect(ctrl.imageLoad).toHaveBeenCalled();
  });
});