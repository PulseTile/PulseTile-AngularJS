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
let templateContactsList = require('./contacts-list.html');

class ContactsListController {
  constructor($scope, $state, $stateParams, $ngRedux, contactsActions, serviceRequests, usSpinnerService, serviceFormatted) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.isShowCreateBtn = $state.router.globals.$current.name !== 'contacts-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'contacts';

    this.create = function () {
      $state.go('contacts-create', {
        patientId: $stateParams.patientId,
      });
    };

    this.go = function (id) {
      $state.go('contacts-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1
      });
    };

    this.setCurrentPageData = function (data) {
      if (data.contacts.data) {
        this.contacts = data.contacts.data;
        
        serviceFormatted.filteringKeys = ['name', 'relationship', 'nextOfKin', 'source'];
        
        usSpinnerService.stop('patientSummary-spinner');
      }
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
    
    this.contactsLoad = contactsActions.all;
    this.contactsLoad($stateParams.patientId);
  }
}

const ContactsListComponent = {
  template: templateContactsList,
  controller: ContactsListController
};

ContactsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'contactsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default ContactsListComponent;