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
let templateProfile = require('./profile.html');

class ProfileController {
  constructor($scope, $state, $stateParams, $ngRedux, allergiesActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'profile'});
    serviceRequests.publisher('headerTitle', {title: 'Personal Information', isShowTitle: true});

    $scope.isAppSettingsEdit = false;
    $scope.isPersonalEdit = false;
    $scope.isContactEdit = false;
    
    this.appSettingsEdit = function () {
      $scope.appSettingsEdit = Object.assign({}, this.appSettings);
      $scope.isAppSettingsEdit = true;
    };
    this.personalEdit = function () {
      $scope.personalEdit = Object.assign({}, this.profile);
      $scope.isPersonalEdit = true;
    };
    this.contactEdit = function () {
      $scope.contactEdit = Object.assign({}, this.profile);
      $scope.isContactEdit = true;
    };

    this.cancelAppSettingsEdit = function () {
      $scope.isAppSettingsEdit = false;
    };
    this.cancelPersonalEdit = function () {
      $scope.isPersonalEdit = false;
    };
    this.cancelContactEdit = function () {
      $scope.isContactEdit = false;
    };

    $scope.confirmAppSettingsEdit = function (appSettingsForm, appSettings) {
      $scope.formSubmitted = true;
      if (appSettingsForm.$valid) {
        $scope.isAppSettingsEdit = false;
      }
    }.bind(this);
    $scope.confirmPersonalEdit = function (personalForm, personal) {
      $scope.formSubmitted = true;
      if (personalForm.$valid) {
        $scope.isPersonalEdit = false;
      }
    }.bind(this);
    $scope.confirmContactEdit = function (contactForm, contact) {
      $scope.formSubmitted = true;
      if (contactForm.$valid) {
        $scope.isContactEdit = false;
      }
    }.bind(this);

    this.setProfileData = function () {
      let tempProfileData = serviceRequests.currentUserData;

      this.profile = {
        firstname: tempProfileData.given_name,
        lastname: tempProfileData.family_name,
        nhs: tempProfileData.nhsNumber,
        birthday: new Date(),
        gender: 'Female',
        doctor: 'Dr Emma Huston',

        address: '6801 Tellus Street',
        city: 'Westmorland',
        state: 'Westmorland',
        postalCode: 'Box 306',
        country: 'USA',
        phone: '07624 647524',
        email: tempProfileData.email,

        historyChanges: [
          {
            data: new Date(),
            field: 'Last Name',
            valueOld: 'White',
            valueNew: 'Blackwell'
          }, {
            data: new Date(),
            field: 'Address',
            valueOld: 'Flower Street',
            valueNew: '6801 Tellus Street'
          }
        ]
      };

      this.appSettings = {
        title: 'Application 1',
        logoPath: 'logo_1985.jpg',
        theme: {
          name: 'Green Theme',
          baseColor: '#0D672F',
          lightColor: '#7cbe31',
          lighterColor: '#A9D38E'
        },
        browserTitle: 'Ripple'
      }

    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      // if (data.profile.data) {
      //   this.profile = data.profile.data;
      // }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    this.setProfileData();

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.allergiesLoad = allergiesActions.all;
    this.allergiesLoad($stateParams.patientId);
  }
}

const ProfileComponent = {
  template: templateProfile,
  controller: ProfileController
};

ProfileController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'allergiesActions', 'serviceRequests', 'usSpinnerService'];
export default ProfileComponent;