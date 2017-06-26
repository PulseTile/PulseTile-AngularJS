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
      sizes: [1, 2, 4, 6, 10, 16, 24, 30, 100]
    };
    $scope.fontsSettings = {
      fontSizes: [10, 12, 14, 16, 18, 20, 24, 26, 30, 40, 70],
      fontFamilies: ['Arial', 'Calibri', 'Times New Roman', 'Verdana'],
      fills: ['#ee0000', '#f36900', '#ffff00', '#84ff00', '#1e67ff', '#4affff', '#4bff62', '#97fa00', '#0000ff']
    };
       
    $scope.uploadParams = null;
    $scope.uploadImageURL = '';
    $scope.brushColor = $scope.brushSettings.colors.base[0];
    $scope.brushSize = $scope.brushSettings.sizes[0];
    $scope.addTextObject = null;
    $scope.textParams;

    /* istanbul ignore next */
    $scope.setModeBrush = function () {
      $scope.canvas.isDrawingMode = true;
      $scope.canvas.freeDrawingBrush = new fabric['PencilBrush']($scope.canvas);
      $scope.canvas.freeDrawingBrush.color = $scope.brushColor;
      $scope.canvas.freeDrawingBrush.width = $scope.brushSize;
    }

    /* istanbul ignore next */
    $scope.setModeFont = function () {
      $scope.canvas.isDrawingMode = false;
    };

    /* istanbul ignore next */
    $scope.setModePicture = function () {
      $scope.canvas.isDrawingMode = false;
    };

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
    $scope.isActiveColour = function (color) {
      return $scope.brushColor === color;
    };
    
    /* istanbul ignore next */
    $scope.changeBrushSize = function (size) {
      $scope.canvas.freeDrawingBrush.width = size;
    };


    /* istanbul ignore next */
    $scope.clearTextParams = function () {
      $scope.textParams = {
        // left: 10, top: 10,
        text: 'New text',
        fill: $scope.fontsSettings.fills[0],
        fontSize: $scope.fontsSettings.fontSizes[2],
        fontWeight: 'normal',
        fontFamily: $scope.fontsSettings.fontFamilies[0],
      }
    };
    $scope.clearTextParams();

    /* istanbul ignore next */
    $scope.setTextObject = function (object) {
      if (object instanceof fabric.Text) {
        $scope.addTextObject = object;
        $scope.textParams.fill = object.fill;
        $scope.textParams.text = object.text;
        $scope.textParams.fontSize = object.fontSize;
        $scope.textParams.fontFamily = object.fontFamily;
      } else {
        $scope.addTextObject = null;
        $scope.clearTextParams();
      }
    };

    /* istanbul ignore next */
    $scope.addNewText = function (text) {
      $scope.addTextObject = new fabric.Text(text, $scope.textParams);
      $scope.canvas.add($scope.addTextObject);
    };

    /* istanbul ignore next */
    $scope.isTextObject = function () {
      if ($scope.addTextObject) {
        return true;
      }
      return false
    };

    /* istanbul ignore next */
    $scope.textChange = function (text) {
      if ($scope.isTextObject()) {
        $scope.addTextObject.text = text;
        $scope.canvas.add($scope.addTextObject);
      }
    };

    /* istanbul ignore next */
    $scope.calckScale = function (parentWidth, parentHeight, childWidth, childHeight) {
      var scale = 1;
      var parentRatio = parentHeight / parentWidth; // 9 / 16 (56.25%)
      var childRatio = childHeight / childWidth;

      if (childWidth > parentWidth || childHeight > parentHeight) {
        if ( childRatio > parentRatio) {
          scale = parentHeight / childHeight;
        } else {
          scale = parentWidth / childWidth;
        }
      }

      return scale;
    };

    /* istanbul ignore next */
    $scope.changeFontParams = function (textParams) {
      if ($scope.isTextObject && $scope.addTextObject) {
        $scope.addTextObject.setText(textParams.text);
        $scope.addTextObject.setFill(textParams.fill);
        $scope.addTextObject.setFontSize(textParams.fontSize);
        $scope.addTextObject.setFontFamily(textParams.fontFamily);
        $scope.canvas.renderAll();
      }
    };


    /* istanbul ignore next */
    $scope.addPictureToCanvas = function (base64) {
      resizeCanvas();
      $timeout(function() {
        fabric.util.loadImage(base64, function(img) {
            var object = new fabric.Image(img);
            var scale = $scope.calckScale($scope.canvas.width, $scope.canvas.height, object.width, object.height);
            
            object.hasRotatingPoint = true;
            object.scaleX = object.scaleY = scale;
            object.isDrawingMode = true;
            $scope.canvas.add(object);
            $scope.canvas.renderAll();
        }, null, {crossOrigin: 'Anonymous'});
      }.bind(this), 11);

    };

    /* istanbul ignore next */
    $scope.uploadPicture = function (uploadParams) {
      var file, reader, imgData = {};

      if (uploadParams && uploadParams.file) {
        imgData = uploadParams.file;
        reader = new FileReader();

        /* istanbul ignore next */
        reader.onload = function(event) {
          var image64 = event.target.result;
          imgData.imgencode = image64;
          $scope.addPictureToCanvas(image64);
        };

        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(imgData);

      }
    };

    // function getDataUri(url, callback) {
    //     var image = new Image();
    //     image.onload = function () {
    //         var canvas = document.createElement('canvas');
    //         canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    //         canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

    //         canvas.getContext('2d').drawImage(this, 0, 0);

    //         // Get raw image data
    //         // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
    //         callback(canvas.toDataURL('image/png'));
    //     };

    //     image.src = url;
    // }

    /* istanbul ignore next */
    $scope.uploadPictureURL = function (imageURL) {
      getDataUri(imageURL, function(image64) {
        $scope.addPictureToCanvas(image64);
      });
    };

    /* istanbul ignore next */
    $scope.isCanDelete = function () {
      if (  $scope.canvas &&
            !$scope.canvas.isDrawingMode &&
            ($scope.canvas.getActiveObject() || $scope.canvas.getActiveGroup()) ) {
          return true;
      }
      return false;
    };

    /* istanbul ignore next */
    $scope.deleteObject = function (uploadParams) {
      var selectedObject = $scope.canvas.getActiveObject();
      var selectedMultipleObjects = $scope.canvas.getActiveGroup();

      if (selectedObject) {
        selectedObject.remove();
        
      } else {
        selectedMultipleObjects._objects.forEach(function (object) {
          object.remove();
          selectedMultipleObjects.removeWithUpdate(object);
        });
      }
      $timeout(function() {
        $scope.canvas.discardActiveGroup();
        $scope.canvas.renderAll();
      }, 0)
    };
    /* istanbul ignore next */
    $scope.clearCanvas = function () {
      $scope.canvas.clear();
    };
    /* istanbul ignore next */
    $scope.showEditCanvas = function (data) {
      $scope.clearCanvas();
      if (data.drawingBase64) {
        $scope.addPictureToCanvas(data.drawingBase64);
      }
    };
    serviceRequests.subscriber('showEditCanvas', $scope.showEditCanvas);



    /* istanbul ignore next */
    $scope.setCanvasSize = function () {
      var ratio = 0.5625; // 9/16
      var holder = $scope.canvasEl.closest('.drawing-canvas-holder');
      var width = holder.offsetWidth - 2;

      if (holder) {
        $scope.canvas.setWidth(width);
        $scope.canvas.setHeight(width * ratio);
      }
    };

    /* istanbul ignore next */
    function resizeCanvas() {
      $timeout(function() {
        $scope.setCanvasSize();
      }.bind(this), 10);
    };

    $window.addEventListener('resize', resizeCanvas);
    serviceRequests.subscriber('resizeDrawing', resizeCanvas);

    /* istanbul ignore next */
    $scope.$on('$destroy', function () {
      $window.removeEventListener('resize', resizeCanvas);
    });

    /* istanbul ignore next */
    $scope.getCanvasImage64 = function () {
      var data = {};
      if (!fabric.Canvas.supports('toDataURL')) {
         console.log('This browser doesn\'t provide means to serialize canvas to an image');
      } else {
        // window.open($scope.canvas.toDataURL('png'));
          data.image64 = $scope.canvas.toDataURL('png');
        return data;
      }
      return null;
    };

    /* istanbul ignore next */
    function publishCanvasData () {
      serviceRequests.publisher('drawingCanvasChanged', $scope.getCanvasImage64());
    }
    
    /* istanbul ignore next */
    this.initCanvasDrawing = function () {
      $scope.canvasEl = document.getElementById($scope.canvasId);
      $scope.canvas = new fabric.Canvas($scope.canvasId, $scope.canvasSettings);
      $scope.canvas.on('object:selected', function (object) {
        $scope.setTextObject(object.target);
      });

      $scope.canvas.on('object:modified', publishCanvasData);
      $scope.canvas.on('object:added', publishCanvasData);
      $scope.canvas.on('object:removed', publishCanvasData);
      
      $scope.setCanvasSize();
      $scope.setModeBrush();
    };

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