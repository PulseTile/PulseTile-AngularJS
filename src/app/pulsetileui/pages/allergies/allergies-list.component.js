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
let templateAllergiesList = require('./allergies-list.html');

class AllergiesListController {
  constructor($scope, $state, $stateParams, $ngRedux, allergiesActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    allergiesActions.clear();
    this.actionLoadList = allergiesActions.all;

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'allergies-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'allergies';

    /* istanbul ignore next */
    this.go = function (id, allergySource) {
      $state.go('allergies-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: allergySource
      });
    };

    /* istanbul ignore next */
    this.create = function () {
      $state.go('allergies-create', {
        patientId: $stateParams.patientId
      });
    };

    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.allergies;

      if ((state.patientId !== $stateParams.patientId || !state.data) &&
        !state.isFetching && !state.error) {

        this.actionLoadList($stateParams.patientId);
        usSpinnerService.spin('list-spinner');
      }
      if (state.data) {
        this.allergies = state.data;

        serviceFormatted.filteringKeys = ['cause', 'reaction', 'source'];
        usSpinnerService.stop('list-spinner');
      }

      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const AllergiesListComponent = {
  template: templateAllergiesList,
  controller: AllergiesListController
};

AllergiesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'allergiesActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default AllergiesListComponent;