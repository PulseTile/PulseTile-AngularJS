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
  constructor($scope, $state, $stateParams, $ngRedux, contactsActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.queryBy = '$';
    this.query = {};
    this.query[this.queryBy] = '';
    this.currentPage = 1;
    this.isFilter = false;
    this.isShowCreateBtn = $state.router.globals.$current.name !== 'contacts-create';
    this.isShowExpandBtn = $state.router.globals.$current.name !== 'contacts';

    this.toggleFilter = function () {
      this.isFilter = !this.isFilter;
    };

    this.sort = function (field) {
      var reverse = this.reverse;
      if (this.order === field) {
        this.reverse = !reverse;
      } else {
        this.order = field;
        this.reverse = false;
      }
    };

    this.sortClass = function (field) {
      if (this.order === field) {
        return this.reverse ? 'sorted desc' : 'sorted asc';
      }
    };

    this.order = serviceRequests.currentSort.order || 'name';
    this.reverse = serviceRequests.currentSort.reverse || false;
    if (serviceRequests.filter) {
      this.query[this.queryBy] = serviceRequests.filter;
      this.isFilter = true;
    }

    this.create = function () {
      $state.go('contacts-create', {
        patientId: $stateParams.patientId,
        filter: this.query.$,
        page: this.currentPage
      });
    };

    this.go = function (id) {
      serviceRequests.currentSort.order = this.order;
      serviceRequests.currentSort.reverse = this.reverse;
      serviceRequests.filter = this.query[this.queryBy] || '';

      $state.go('contacts-detail', {
        patientId: $stateParams.patientId,
        contactIndex: id,
        filter: this.query.$,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    this.setCurrentPageData = function (data) {
      if (data.contacts.data) {
        this.contacts = data.contacts.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    this.selected = function (contactIndex) {
      return contactIndex === $stateParams.contactIndex;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      this.query.$ = $stateParams.filter;
    }

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

ContactsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'contactsActions', 'serviceRequests', 'usSpinnerService'];
export default ContactsListComponent;