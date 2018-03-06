'use strict';
import DrawingsDrawingComponent from '../Drawings-drawing.component';

describe('Drawings Drawing', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _serviceRequests_, _usSpinnerService_, _$timeout_, _$window_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = DrawingsDrawingComponent.template;
    ctrl = controller(DrawingsDrawingComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      $timeout: _$timeout_,
      $window: _$window_
    });
  }));

  beforeEach(function() {
      spyOn(scope, 'setModeBrush');
      spyOn(scope, 'setModeFont');
      spyOn(scope, 'setModePicture');
      spyOn(scope, 'setModeDrawing');
      spyOn(scope, 'changeBrushColor');
      spyOn(scope, 'isActiveColour');
      spyOn(scope, 'changeBrushSize');
      spyOn(scope, 'clearTextParams');
      spyOn(scope, 'setTextObject');
      spyOn(scope, 'addNewText');
      spyOn(scope, 'isTextObject');
      spyOn(scope, 'textChange');
      spyOn(scope, 'calckScale');
      spyOn(scope, 'changeFontParams');
      spyOn(scope, 'addPictureToCanvas');
      spyOn(scope, 'uploadPicture');
      spyOn(scope, 'uploadPictureURL');
      spyOn(scope, 'isCanDelete');
      spyOn(scope, 'deleteObject');
      spyOn(scope, 'clearCanvas');
      spyOn(scope, 'showEditCanvas');
      spyOn(scope, 'setCanvasSize');
      spyOn(scope, 'getCanvasImage64');
      spyOn(ctrl, 'initCanvasDrawing');

      scope.setModeBrush();
      scope.setModeFont();
      scope.setModePicture();
      scope.setModeDrawing();
      scope.changeBrushColor();
      scope.isActiveColour();
      scope.changeBrushSize();
      scope.clearTextParams();
      scope.setTextObject();
      scope.addNewText();
      scope.isTextObject();
      scope.textChange();
      scope.calckScale();
      scope.changeFontParams();
      scope.addPictureToCanvas();
      scope.uploadPicture();
      scope.uploadPictureURL();
      scope.isCanDelete();
      scope.deleteObject();
      scope.clearCanvas();
      scope.showEditCanvas();
      scope.setCanvasSize();
      scope.getCanvasImage64();
      ctrl.initCanvasDrawing();
  });

  it('Controller exist', function() {
      expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
      expect(template).toBeDefined();
  });

  it('setModeBrush was called', function() {
      expect(scope.setModeBrush).toHaveBeenCalled();
  });
  it('setModeFont was called', function() {
      expect(scope.setModeFont).toHaveBeenCalled();
  });
  it('setModePicture was called', function() {
      expect(scope.setModePicture).toHaveBeenCalled();
  });
  it('setModeDrawing was called', function() {
      expect(scope.setModeDrawing).toHaveBeenCalled();
  });
  it('changeBrushColor was called', function() {
      expect(scope.changeBrushColor).toHaveBeenCalled();
  });
  it('isActiveColour was called', function() {
      expect(scope.isActiveColour).toHaveBeenCalled();
  });
  it('changeBrushSize was called', function() {
      expect(scope.changeBrushSize).toHaveBeenCalled();
  });
  it('clearTextParams was called', function() {
      expect(scope.clearTextParams).toHaveBeenCalled();
  });
  it('setTextObject was called', function() {
      expect(scope.setTextObject).toHaveBeenCalled();
  });
  it('addNewText was called', function() {
      expect(scope.addNewText).toHaveBeenCalled();
  });
  it('isTextObject was called', function() {
      expect(scope.isTextObject).toHaveBeenCalled();
  });
  it('textChange was called', function() {
      expect(scope.textChange).toHaveBeenCalled();
  });
  it('calckScale was called', function() {
      expect(scope.calckScale).toHaveBeenCalled();
  });
  it('changeFontParams was called', function() {
      expect(scope.changeFontParams).toHaveBeenCalled();
  });
  it('addPictureToCanvas was called', function() {
      expect(scope.addPictureToCanvas).toHaveBeenCalled();
  });
  it('uploadPicture was called', function() {
      expect(scope.uploadPicture).toHaveBeenCalled();
  });
  it('uploadPictureURL was called', function() {
      expect(scope.uploadPictureURL).toHaveBeenCalled();
  });
  it('isCanDelete was called', function() {
      expect(scope.isCanDelete).toHaveBeenCalled();
  });
  it('deleteObject was called', function() {
      expect(scope.deleteObject).toHaveBeenCalled();
  });
  it('clearCanvas was called', function() {
      expect(scope.clearCanvas).toHaveBeenCalled();
  });
  it('showEditCanvas was called', function() {
      expect(scope.showEditCanvas).toHaveBeenCalled();
  });
  it('setCanvasSize was called', function() {
      expect(scope.setCanvasSize).toHaveBeenCalled();
  });
  it('getCanvasImage64 was called', function() {
      expect(scope.getCanvasImage64).toHaveBeenCalled();
  });

  it('initCanvasDrawing was called', function() {
      expect(ctrl.initCanvasDrawing).toHaveBeenCalled();
  });
});