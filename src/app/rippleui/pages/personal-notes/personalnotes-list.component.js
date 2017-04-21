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

let templatePersonalnotesList = require('./personalnotes-list.html');

class PersonalnotesListController {
  constructor($scope, $state, $stateParams, $ngRedux, personalnotesActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'personalNotes-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'personalNotes';

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.personalnotes.data) {
        this.personalNotes = data.personalnotes.data;
        serviceFormatted.formattingTablesDate(this.personalNotes, ['dateCreated'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['noteType', 'author', 'dateCreated', 'source'];
      }
      usSpinnerService.stop("patientSummary-spinner");

      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    this.create = function () {
      $state.go('personalNotes-create', {
        patientId: $stateParams.patientId
      });
    };
    
    this.go = function (id, source) {
      $state.go('personalNotes-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.personalnotesLoad = personalnotesActions.all;
    this.personalnotesLoad($stateParams.patientId);
  }
}

const PersonalnotesListComponent = {
  template: templatePersonalnotesList,
  controller: PersonalnotesListController
};

PersonalnotesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'personalnotesActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default PersonalnotesListComponent;