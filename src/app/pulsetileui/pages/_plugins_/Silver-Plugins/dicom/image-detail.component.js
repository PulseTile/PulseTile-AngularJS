/*
  ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
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
import { httpSetTokenToCookie } from '../../../../../helpers/httpMiddleware';

let templateImageDetail = require('./image-detail.html');
import { httpHandleErrors } from '../../../../handle-errors/handle-errors-actions';
import cornerstoneJS from '../../../../../../cornerstone/cornerstone';
import cornerstoneToolsJS from '../../../../../../cornerstone/cornerstoneTools';

class ImageDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, serviceActions, serviceRequests, usSpinnerService) {
    $scope.series = [];
    $scope.isMove = false;
    $scope.isFade = false;
    
    var cornerstone = cornerstoneJS();
    var cornerstoneTools = cornerstoneToolsJS();
    
    serviceActions.getAllSeriesInStudy($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source).then(function (result) {
      $scope.study = result.data;
      var seriesIds = $scope.study.seriesIds;
      $scope.instanceIds = [];
      for (var i = 0; i < seriesIds.length; i++) {
          findSeriesMetadata(seriesIds[i], i);
          findFirstInstanceId(seriesIds[i], i);
      }
      usSpinnerService.stop('patientSummary-spinner');
    }).then(response => {
      httpSetTokenToCookie(response.data);
      return response;
    }).catch(function (err) {$ngRedux.dispatch(httpHandleErrors(err))});
    /* istanbul ignore next */
    $scope.getURLtoImage = function(id) {
      return `${window.location.protocol}//46.101.95.245/orthanc/instances/${id}/preview`;
    };

    /* istanbul ignore next  */
    var findFirstInstanceId = function (seriesId, index) {
      serviceActions.getInstanceId($stateParams.patientId, seriesId, $stateParams.source).then(function (result) {
        $scope.instanceIds[index] = result.data.instanceId;
      }).then(response => {
        httpSetTokenToCookie(response.data);
        return response;
      }).catch(function (err) {$ngRedux.dispatch(httpHandleErrors(err))});;
    };

    /* istanbul ignore next  */
    var findSeriesMetadata = function(seriesId, index) {
      serviceActions.getSeriesDetails($stateParams.patientId, seriesId).then(function (result) {
        $scope.series[index] = result.data;
        $scope.series[index].seriesDate = moment($scope.series[index].seriesDate).format('DD-MMM-YYYY');
        $scope.series[index].seriesTime = moment($scope.series[index].seriesTime).format('h:mma');
      }).then(response => {
        httpSetTokenToCookie(response.data);
        return response;
      }).catch(function (err) {$ngRedux.dispatch(httpHandleErrors(err))});;
    };

    /* istanbul ignore next  */
    function getImgBlock() {
      return $('#dicomImage').get(0);
    }
    /* istanbul ignore next */
    $scope.zoomIn = function (ev) {
      var element = getImgBlock();
      var viewport = cornerstone.getViewport(element);
      viewport.scale += 0.25;
      cornerstone.setViewport(element, viewport);
    };
    /* istanbul ignore next */
    $scope.zoomOut = function (ev) {
      var element = getImgBlock();
      var viewport = cornerstone.getViewport(element);
      viewport.scale -= 0.25;
      cornerstone.setViewport(element, viewport);
    };
    /* istanbul ignore next */
    $scope.moveImg = function (ev) {
      $scope.isMove = !$scope.isMove;
      
      var element = getImgBlock();

      /* istanbul ignore if  */
      if ($scope.isMove === false) {
        cornerstoneTools.mouseInput.disable(element);
        return;
      };
      $scope.isFade = false;
      cornerstoneTools.wwwc. deactivate(element, 2);
      cornerstoneTools.mouseInput.enable(element);
      cornerstoneTools.pan.activate(element, 1);
    };
    /* istanbul ignore next */
    $scope.fadeImg = function (ev) {
      $scope.isFade = !$scope.isFade;

      var element = getImgBlock();

      /* istanbul ignore if  */
      if ($scope.isFade === false) {
        cornerstoneTools.mouseInput.disable(element);
        cornerstoneTools.mouseWheelInput.disable(element);
        return;

      };
      $scope.isMove = false;
      cornerstoneTools.pan.deactivate(element, 1);
      cornerstoneTools.mouseWheelInput.enable(element);
      cornerstoneTools.wwwc.activate(element, 2);
    };
  }
}

const ImageDetailComponent = {
  template: templateImageDetail,
  controller: ImageDetailController
};

ImageDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'serviceActions', 'serviceRequests', 'usSpinnerService'];
export default ImageDetailComponent;