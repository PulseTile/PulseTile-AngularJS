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
let templateContactsCreate= require('./contacts-create.html');

class ContactsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, contactsActions, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = contactsActions.all;
    $scope.actionCreateDetail = contactsActions.create;

    $scope.contact = {};
    $scope.contact.dateSubmitted = new Date();
    $scope.contact.relationshipTerminology = 'local';
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('contacts', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    /* istanbul ignore next */
    this.cancel = function () {
      this.goList();
    };
    /* istanbul ignore next */
    $scope.create = function (contactForm, contact) {
      $scope.formSubmitted = true;

      if (contactForm.$valid) {
        serviceFormatted.propsToString(contact);
        $scope.actionCreateDetail($stateParams.patientId, contact);
      }
    }.bind(this);
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.contacts.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.contact.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);
  }
}

const ContactsCreateComponent = {
  template: templateContactsCreate,
  controller: ContactsCreateController
};

ContactsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'contactsActions', 'serviceRequests', 'serviceFormatted'];
export default ContactsCreateComponent;