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
    var seriesIdsIndex;
    
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
    // console.log('getAllSeriesInStudy ', $stateParams.patientId, $stateParams.detailsIndex, $stateParams.source);
    serviceActions.getAllSeriesInStudy($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source).then(function (result) {
      $scope.study = result.data;

      var seriesIds = $scope.study.Series;
      $scope.instanceIds = [];
      // console.log('getAllSeriesInStudy ', result, seriesIds);
      for (var i = 0; i < seriesIds.length; i++) {
        findSeriesMetadata(seriesIds[i], i);
        findFirstInstanceId(seriesIds[i], i);
      }
    });

    var findFirstInstanceId = function (seriesId, index) {
      serviceActions.getInstanceId($stateParams.patientId, seriesId, $stateParams.source).then(function (result) {
        // console.log('getInstanceId ', result);
        $scope.instanceIds[index] = result.data.instanceId;
      });
    };

    var findSeriesMetadata = function(seriesId, index) {
      serviceActions.getSeriesDetails($stateParams.patientId, seriesId).then(function (result) {
        // console.log('getSeriesDetails ', result);
        // console.log('seriesId ', $scope.series, seriesId, index);
        $scope.series[index] = result.data;
        $scope.series[index].seriesDate = moment($scope.series[index].seriesDate).format('DD-MMM-YYYY');
        $scope.series[index].seriesTime = moment($scope.series[index].seriesTime).format('h:mma');

        // ExpectedNumberOfInstances:null
        // ID:"9927f4d0-7ba0f736-ad0cd3a0-8cd74dba-5a23637e"
        // Instances:Array[1]
        // IsStable:true
        // LastUpdate:"20160118T154508"
        // MainDicomTags:Object
        // ParentStudy:"55a9fcd2-e8197ca2-1af7a8e2-0e1ab147-841c65ba"
        // Status:"Unknown"
        // Type:"Series"
        // seriesDate:"24-Feb-2017"
        // seriesTime:"1:34pm"
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