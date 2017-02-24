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

class ImageDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, serviceActions, serviceRequests, usSpinnerService) {
    
    $scope.visibleModal = 'closeModal';
    $scope.series = [];
    
    this.toggleModal = function (data) {
      $scope.visibleModal = data.className;
      if (data.className === 'openModal') {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    };
    
    serviceActions.getAllSeriesInStudy($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source).then(function (result) {
      $scope.study = result.data;

      var seriesIds = $scope.study.seriesIds;
      $scope.instanceIds = [];
      for (var i = 0; i < seriesIds.length; i++) {
        findSeriesMetadata(seriesIds[i], i);
        findFirstInstanceId(seriesIds[i], i);
      }
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

  }
}

const ImageDetailComponent = {
  template: templateImageDetail,
  controller: ImageDetailController
};

ImageDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'serviceActions', 'serviceRequests', 'usSpinnerService'];
export default ImageDetailComponent;