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
let templateImageDetail= require('./image-detail.html');
import cornerstoneJS from '../../../../cornerstone/cornerstone';

class ImageDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, serviceActions, serviceRequests, usSpinnerService) {
    
    $scope.series = [];
    
    var cornerstone = cornerstoneJS();
    
    serviceActions.getAllSeriesInStudy($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source).then(function (result) {
      $scope.study = result.data;
      var seriesIds = $scope.study.seriesIds;
      $scope.instanceIds = [];
      for (var i = 0; i < seriesIds.length; i++) {
          findSeriesMetadata(seriesIds[i], i);
          findFirstInstanceId(seriesIds[i], i);
      }
      usSpinnerService.stop('patientSummary-spinner');
    });

    var findFirstInstanceId = function (seriesId, index) {
      serviceActions.getInstanceId($stateParams.patientId, seriesId, $stateParams.source).then(function (result) {
        $scope.instanceIds[index] = result.data.instanceId;
      });
    };

    var findSeriesMetadata = function(seriesId, index) {
      serviceActions.getSeriesDetails($stateParams.patientId, seriesId).then(function (result) {
        $scope.series[index] = result.data;
        $scope.series[index].seriesDate = moment($scope.series[index].seriesDate).format('DD-MMM-YYYY');
        $scope.series[index].seriesTime = moment($scope.series[index].seriesTime).format('h:mma');
      });
    };
    
    function getImgBlock() {
      return $('#dicomImage').get(0);
    }
    
    $scope.zoomIn = function (ev) {
      var element = getImgBlock();
      var viewport = cornerstone.getViewport(element);
      viewport.scale += 0.25;
      cornerstone.setViewport(element, viewport);
    };
    $scope.zoomOut = function (ev) {
      var element = getImgBlock();
      var viewport = cornerstone.getViewport(element);
      viewport.scale -= 0.25;
      cornerstone.setViewport(element, viewport);
    };

  }
}

const ImageDetailComponent = {
  template: templateImageDetail,
  controller: ImageDetailController
};

ImageDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'serviceActions', 'serviceRequests', 'usSpinnerService'];
export default ImageDetailComponent;