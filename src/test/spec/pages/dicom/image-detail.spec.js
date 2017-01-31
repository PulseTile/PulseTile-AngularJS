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
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'findFirstInstanceId');
    spyOn(ctrl, 'toggleModal');

    ctrl.setCurrentPageData();
    ctrl.findFirstInstanceId();
    ctrl.toggleModal();
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
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("findFirstInstanceId was called", function() {
    expect(ctrl.findFirstInstanceId).toHaveBeenCalled();
  });
  it("toggleModal was called", function() {
    expect(ctrl.toggleModal).toHaveBeenCalled();
  });
});