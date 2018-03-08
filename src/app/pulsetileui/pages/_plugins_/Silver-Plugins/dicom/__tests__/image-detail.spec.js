'use strict';
import ImageDetailComponent from '../image-detail.component.js';

describe('Image Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _imageActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = ImageDetailComponent.template;
    ctrl = controller(ImageDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      imageActions: _imageActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
    });
  }));

  beforeEach(function() {

    spyOn(scope, 'getURLtoImage');
    spyOn(scope, 'zoomIn');
    spyOn(scope, 'zoomOut');
    spyOn(scope, 'moveImg');
    spyOn(scope, 'fadeImg');

    scope.getURLtoImage();
    scope.zoomIn();
    scope.zoomOut();
    scope.moveImg();
    scope.fadeImg();
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

  it('getURLtoImage was called', function() {
    expect(scope.getURLtoImage).toHaveBeenCalled();
  });
  it('zoomIn was called', function() {
    expect(scope.zoomIn).toHaveBeenCalled();
  });
  it('zoomOut was called', function() {
    expect(scope.zoomOut).toHaveBeenCalled();
  });
  it('moveImg was called', function() {
    expect(scope.moveImg).toHaveBeenCalled();
  });
  it('fadeImg was called', function() {
    expect(scope.fadeImg).toHaveBeenCalled();
  });
});