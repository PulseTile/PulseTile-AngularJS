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
  constructor($scope, $window, $state, $stateParams, $ngRedux, imageActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'images-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'images';
    var vm = this;

    this.go = function (id, source) {
      $state.go('images-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };
    
    this.create = function () {
      $state.go('images-create', {
          patientId: $stateParams.patientId
      });
    };

    // this.search = function (row) {
    //   return (
    //     angular.lowercase(row.studyDescription).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
    //     angular.lowercase(row.dateRecorded).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
    //     angular.lowercase(row.source).indexOf(angular.lowercase(vm.query) || '') !== -1
    //   );
    // };

    this.setCurrentPageData = function (data) {
      var date = new Date();
      this.images = [
        {
          sourceId: '1',
          name: 'Inactivated Poliovirus Vaccine',
          source: 'Marand',
          seriesNumber: 1,
          comment: 'Hospital staff',
          date: date.setDate(date.getDate() - 1),
          author: 'ripple_osi',
          dataCreate: date.setDate(date.getDate() - 1)
        }, {
          sourceId: '2',
          name: 'Cell-Culture Influenza Vaccine',
          source: 'EtherCIS',
          seriesNumber: 2,
          comment: 'Hospital staff',
          date: date,
          author: 'ripple_osi',
          dataCreate: date
        }, {
          sourceId: '3',
          name: 'Varicella Vaccine',
          source: 'Marand',
          seriesNumber: 3,
          comment: 'Hospital staff',
          date: date.setDate(date.getDate() - 4),
          author: 'ripple_osi',
          dataCreate: date.setDate(date.getDate() - 4)
        }
      ];
      
      usSpinnerService.stop('patientSummary-spinner');
      
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
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

ImageListController.$inject = ['$scope', '$window', '$state', '$stateParams', '$ngRedux', 'imageActions', 'serviceRequests', 'usSpinnerService'];
export default ImageListComponent;