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
let templateContactsDetail= require('./contacts-detail.html');

class ContactsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, contactsActions, serviceRequests, usSpinnerService, serviceFormatted) {
    var relationshipTypeOptions = [
      { value: 'at0036', title: 'Informal carer' },
      { value: 'at0037', title: 'Main informal carer' },
      { value: 'at0038', title: 'Formal care worker' },
      { value: 'at0039', title: 'Key formal care worker' },
    ];
    $scope.isEdit = false;
    this.edit = function () {
      $scope.isEdit = true;

      $scope.contactEdit = Object.assign({}, this.contact);
      $scope.contactEdit.dateSubmitted = new Date();

      if (!$scope.contactEdit.relationshipCode) {
        relationshipTypeOptions.forEach((el) => {
          if (el.title === $scope.contactEdit.relationshipType) {
            $scope.contactEdit.relationshipCode = el.value;
          }
        });
      }
    };
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    $scope.confirmEdit = function (contactForm, contact) {
      $scope.formSubmitted = true;
      if (contactForm.$valid) {
        $scope.isEdit = false;
        this.contact = Object.assign(this.contact, $scope.contactEdit);
        relationshipTypeOptions.forEach((el) => {
          if (el.value === $scope.contactEdit.relationshipCode) {
            this.contact.relationshipType = el.title;
          }
        });
        serviceFormatted.propsToString(this.contact);
        $scope.contactsUpdate(this.currentPatient.id, contact.sourceId, this.contact);
      }
    }.bind(this);

    this.setCurrentPageData = function (data) {
      if (data.contacts.dataGet) {
        this.contact = data.contacts.dataGet;
        usSpinnerService.stop('contactDetail-spinner');
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

    this.contactsLoad = contactsActions.get;
    this.contactsLoad($stateParams.patientId, $stateParams.detailsIndex);
    $scope.contactsUpdate = contactsActions.update;
  }
}

const ContactsDetailComponent = {
  template: templateContactsDetail,
  controller: ContactsDetailController
};

ContactsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'contactsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default ContactsDetailComponent;