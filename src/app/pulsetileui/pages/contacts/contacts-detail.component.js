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
    this.contactsLoadAll = contactsActions.all;
    this.contactsLoad = contactsActions.get;
    $scope.contactsUpdate = contactsActions.update;

    usSpinnerService.spin('detail-spinner');
    this.contactsLoad($stateParams.patientId, $stateParams.detailsIndex);

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

        serviceFormatted.propsToString($scope.contactEdit);
        $scope.contactsUpdate($stateParams.patientId, contact.sourceId, $scope.contactEdit);
      }
    }.bind(this);

    this.setCurrentPageData = function (store) {
      const state = store.contacts;
      const { patientId, detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        this.contact = state.dataGet;
        (detailsIndex === state.dataGet.sourceId) ? usSpinnerService.stop('detail-spinner') : null;
      }

      // Update Detail
      if (state.dataUpdate !== null) {
        // After Update we request all list firstly
        this.contactsLoadAll(patientId);
      }
      if (state.isUpdateProcess) {
        usSpinnerService.spin('detail-update-spinner');
        if (!state.dataGet && !state.isGetFetching) {
          // We request detail when data is empty
          // Details are cleared after request LoadAll list
          this.contactsLoad(patientId, detailsIndex);
        }
      } else {
        usSpinnerService.stop('detail-update-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }

      if (state.error) {
        usSpinnerService.stop('detail-spinner');
        usSpinnerService.stop('detail-update-spinner');
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const ContactsDetailComponent = {
  template: templateContactsDetail,
  controller: ContactsDetailController
};

ContactsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'contactsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted'];
export default ContactsDetailComponent;