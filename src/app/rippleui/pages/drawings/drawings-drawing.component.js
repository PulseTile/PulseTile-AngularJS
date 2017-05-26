/*
 ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
 ~  
 ~  Licensed under the Apache License, Version 2.0 (the "License");
 ~  you may not use this file except in compliance with the License.
 ~  You may obtain a copy of the License at
 ~  
 ~    http://www.apache.org/licenses/LICENSE-2.0

 ~  Unless required by applicable law or agreed to in writing, software
 ~  distributed under the License is distributed on an "AS IS" BASIS,
 ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~  See the License for the specific language governing permissions and
 ~  limitations under the License.
 */
let templateDrawingsDrawing = require('./drawings-drawing.html');

class DrawingsDrawingController {
  constructor($scope, $state, $stateParams, serviceRequests, usSpinnerService, $timeout, $window) {
    $scope.canvasId = 'drawing-canvas';
    $scope.canvas = null;
    $scope.canvasEl = null;

    $scope.canvasSettings = {
      enableRetinaScaling: true,
      allowTouchScrolling: true,
      backgroundColor: '#fff',
      selectionColor: 'rgba(0, 0, 255, 0.2)',
      selectionLineWidth: 2,
    };
    $scope.brushSettings = {
      colors: {
        base: ['#010101', '#ffffff'],
        additional: ['#ee0000', '#f36900', '#ffff00', '#84ff00', '#1e67ff', '#4affff', '#4bff62', '#97fa00', '#0000ff']
      },
      sizes: [1, 2, 4, 6, 10, 16, 24, 30]
    };


    $scope.uploadParams = null;
    $scope.brushColor = $scope.brushSettings.colors.base[0];
    $scope.brushSize = $scope.brushSettings.sizes[0];

    /* istanbul ignore next */
    $scope.setModeBrush = function () {
      console.log('$scope.setModeBrush');
      $scope.canvas.isDrawingMode = true;
      $scope.canvas.freeDrawingBrush = new fabric['PencilBrush']($scope.canvas);
      $scope.canvas.freeDrawingBrush.color = $scope.brushColor;
      $scope.canvas.freeDrawingBrush.width = $scope.brushSize;
    }
    /* istanbul ignore next */
    $scope.setModeFont = function () {
      console.log('$scope.setModeFont');
      $scope.canvas.isDrawingMode = false;
    }
    /* istanbul ignore next */
    $scope.setModePicture = function () {
      console.log('$scope.setModePicture');
      $scope.canvas.isDrawingMode = false;
    }

    /* istanbul ignore next */
    $scope.setModeDrawing = function (mode) {
      switch(mode) {
        case 'brush':
          $scope.setModeBrush();
          break;
        case 'fonts':
          $scope.setModeFont();
          break;
        case 'picture':
          $scope.setModePicture();
          break;
      }
    };


    /* istanbul ignore next */
    $scope.changeBrushColor = function (color) {
      $scope.brushColor = color;
      $scope.canvas.freeDrawingBrush.color = color;
    };
    
    /* istanbul ignore next */
    $scope.changeBrushSize = function (size) {
      $scope.canvas.freeDrawingBrush.width = size;
    };

    /* istanbul ignore next */
    $scope.uploadPicture = function (uploadParams) {
      var file, reader, imgData = {};

      if (uploadParams) {
        console.log('uploadParams');
        console.log(uploadParams);
        imgData = uploadParams.file;
        console.log('file upload ', imgData);
        reader = new FileReader();

        reader.onload = function(event) {
          console.log('reader.onload');
          var image64 = event.target.result;
          // This stores the image to scope
          imgData.imgencode = image64;
          // console.log('---1111 ', event, imgData);
          //image
          fabric.util.loadImage(image64, function(img) {
              var object = new fabric.Image(img);
              object.hasRotatingPoint = true;
              object.scaleX = object.scaleY = .25;
              object.isDrawingMode = true;
              $scope.canvas.add(object);
              $scope.canvas.renderAll();
          }, null, {crossOrigin: 'Anonymous'});

          $scope.canvas.renderAll();
        };

        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(imgData);

      }
    };








    /* istanbul ignore next */
    $scope.setCanvasWidth = function () {
      var holder = $scope.canvasEl.closest('.drawing-canvas-holder');

      if (holder) {
        $scope.canvas.setWidth(holder.offsetWidth - 2);
      }
    };

    /* istanbul ignore next */
    function resizeCanvas() {
      $timeout(function() {
        $scope.setCanvasWidth();
      }.bind(this), 0);
    }

    $window.addEventListener('resize', resizeCanvas);
    serviceRequests.subscriber('resizeDrawing', resizeCanvas);

    /* istanbul ignore next */
    $scope.$on('$destroy', function () {
      $window.removeEventListener('resize', resizeCanvas);
    });

    /* istanbul ignore next */
    this.initCanvasDrawing = function () {
      $scope.canvasEl = document.getElementById($scope.canvasId);
      $scope.canvas = new fabric.Canvas($scope.canvasId, $scope.canvasSettings);
      $scope.setCanvasWidth();
      $scope.setModeBrush();
    }

    /* istanbul ignore next */
    $timeout(function() {
      this.initCanvasDrawing();
    }.bind(this), 0);
  }
}

const DrawingsDrawingComponent = {
  template: templateDrawingsDrawing,
  controller: DrawingsDrawingController
};

DrawingsDrawingController.$inject = ['$scope', '$state', '$stateParams', 'serviceRequests', 'usSpinnerService', '$timeout', '$window'];
export default DrawingsDrawingComponent;