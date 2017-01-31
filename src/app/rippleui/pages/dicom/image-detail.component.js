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
  constructor($scope, $state, $stateParams, $ngRedux, imageActions, serviceRequests, usSpinnerService) {
    var seriesIdsIndex;
    
    $scope.visibleModal = 'closeModal';
    
    this.toggleModal = function (data) {
      $scope.visibleModal = data.className;
    };

    this.series = [];

    this.setCurrentPageData = function (data) {
      usSpinnerService.stop('patientSummary-spinner');
      this.instance = {
        series_images: [{
          imageLink: 'https://files.slack.com/files-tmb/T06BS7UF7-F3Y66CK1R-0c6dac119e/pasted_image_at_2017_01_30_04_56_pm_480.png',
          imgName: 'screen1'
        }],
        modality: '',
        protocol_name: '',
        operator_name: '',
        series_date: '',
        author: '',
        station: '',
        time: '',
        date: ''  
      };
      
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
    };

    this.findFirstInstanceId = function (result) {
      if (result) {
        this.instanceIds[seriesIdsIndex] = result.data.instanceId;
      }
    };

    this.findSeriesMetadata = function(result) {
      if (result) {
        this.series[seriesIdsIndex] = result.data;
        this.series[seriesIdsIndex].seriesDate = moment(this.series[seriesIdsIndex].seriesDate).format('DD-MMM-YYYY');
        this.series[seriesIdsIndex].seriesTime = moment(this.series[seriesIdsIndex].seriesTime).format('h:mma');
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state),
      getInstanceId: this.findFirstInstanceId(state.instanceId),
      getSeriesDetails: this.findSeriesMetadata(state.seriesDetails)
    }))(this);

    $scope.$on('$destroy', unsubscribe);
    serviceRequests.subscriber('closeModal', this.toggleModal);
    // this.imageLoad = imageActions.getAllSeriesInStudy;
    // this.imageLoad($stateParams.patientId, $stateParams.studyId, $stateParams.source);
    // this.instanceLoad = imageActions.getInstance;
    // this.instanceIdLoad = imageActions.getInstanceId;
    // this.seriesDetailsLoad = imageActions.getSeriesDetails;
  }
}

const ImageDetailComponent = {
  template: templateImageDetail,
  controller: ImageDetailController
};

ImageDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'imageActions', 'serviceRequests', 'usSpinnerService'];
export default ImageDetailComponent;