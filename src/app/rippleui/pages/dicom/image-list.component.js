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
let templateImageList = require('./image-list.html');

class ImageListController {
  constructor($scope, $state, $stateParams, $ngRedux, imageActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    var vm = this;

    this.currentPage = 1;

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    this.search = function (row) {
      return (
        angular.lowercase(row.studyDescription).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.dateRecorded).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.source).indexOf(angular.lowercase(vm.query) || '') !== -1
      );
    };

    if ($stateParams.filter) {
      vm.query = $stateParams.filter;
    }

    this.go = function (id, source) {
      $state.go('images-detail', {
        patientId: $stateParams.patientId,
        studyId: id,
        source: source,
        filter: vm.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.selected = function (imageIndex) {
      return imageIndex === $stateParams.studyId;
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.studies.data) {
        this.images = data.studies.data;

        for (var i = 0; i < this.images.length; i++) {
          var image = this.images[i];
          image.dateRecorded = moment(image.dateRecorded).format('DD-MMM-YYYY');

          if (image.studyDescription === null || image.studyDescription === '') {
            image.studyDescription = 'N/A';
          }
        }
        usSpinnerService.stop('imagesList-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.imageLoad = imageActions.allStudies;
    this.imageLoad($stateParams.patientId);
  }
}

const ImageListComponent = {
  template: templateImageList,
  controller: ImageListController
};

ImageListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'imageActions', 'serviceRequests', 'usSpinnerService'];
export default ImageListComponent;