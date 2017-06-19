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
  constructor($scope, $state, $stateParams, $ngRedux, allergiesActions, serviceRequests, usSpinnerService, $timeout, serviceThemes) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'profile'});
    serviceRequests.publisher('headerTitle', {title: 'Personal Information', isShowTitle: true});

    $scope.isAppSettingsEdit = false;
    $scope.isPersonalEdit = false;
    $scope.isContactEdit = false;
    $scope.logoFileParams = {};
    $scope.exampleLogoB64 = '';

    $scope.themes = serviceThemes.getThemesAsArray();

    /* istanbul ignore next  */
    this.appSettingsEdit = function () {
      $scope.appSettingsEdit = Object.assign({}, this.appSettings);
      $scope.isAppSettingsEdit = true;
    };
    /* istanbul ignore next  */
    this.personalEdit = function () {
      $scope.personalEdit = Object.assign({}, this.profile);
      $scope.isPersonalEdit = true;
    };
    /* istanbul ignore next  */
    this.contactEdit = function () {
      $scope.contactEdit = Object.assign({}, this.profile);
      $scope.isContactEdit = true;
    };

    /* istanbul ignore next  */
    this.cancelAppSettingsEdit = function () {
      $scope.isAppSettingsEdit = false;
      $scope.formSubmitted = false;
      serviceRequests.publisher('changeActiveTheme', {themeId: serviceThemes.getActiveTheme()});
    };
    /* istanbul ignore next  */
    this.cancelPersonalEdit = function () {
      $scope.isPersonalEdit = false;
      $scope.formSubmitted = false;
    };
    /* istanbul ignore next  */
    this.cancelContactEdit = function () {
      $scope.isContactEdit = false;
      $scope.formSubmitted = false;
    };
    
    /* istanbul ignore next  */
    this.getBase64Image = function (url, file, callback) {
      if (file) {
        this.upload(file).then(function(res){
          callback(res);
        });
      }
    };
    /* istanbul ignore next  */
    this.upload = function (file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {
            resolve(e.target.result);
          }
        });
    };

    /* istanbul ignore next  */
    $scope.sendData = function (appSettingsForm, toAdd) {
      if (appSettingsForm.$valid) {
        $scope.isAppSettingsEdit = false;

        this.appSettings = Object.assign({}, toAdd);
        this.appSettings.theme = serviceThemes.getThemeById(toAdd.themeColor);

        serviceThemes.setActiveTheme(toAdd.themeColor);
        serviceThemes.setLogoB64(toAdd.logoB64);

        serviceRequests.setAppTheme(toAdd);
      }
    }.bind(this);

    /* istanbul ignore next  */
    $scope.confirmAppSettingsEdit = function (appSettingsForm, appSettings) {
      $scope.formSubmitted = true;

      let toAdd = {
        title: appSettings.title,
        logoB64: appSettings.logoB64,
        themeColor: appSettings.theme.id,
        browserTitle: appSettings.browserTitle
      };

      if ($scope.logoFileParams.name) {
        this.getBase64Image($scope.logoFileParams.path, $scope.logoFileParams.file, function (dataURL) {
          toAdd.logoB64 = dataURL;
          $scope.appSettingsEdit = dataURL;

          $scope.sendData(appSettingsForm, toAdd);
        });
      } else {
        
        $scope.sendData(appSettingsForm, toAdd);
      }

    }.bind(this);
    /* istanbul ignore next  */
    $scope.confirmPersonalEdit = function (personalForm, personal) {
      $scope.formSubmitted = true;
      if (personalForm.$valid) {
        $scope.isPersonalEdit = false;
      }
    }.bind(this);
    /* istanbul ignore next  */
    $scope.confirmContactEdit = function (contactForm, contact) {
      $scope.formSubmitted = true;
      if (contactForm.$valid) {
        $scope.isContactEdit = false;
      }
    }.bind(this);

    /* istanbul ignore next  */
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

      this.appSettings = serviceThemes.getDataApplication();
    };

    /* istanbul ignore next  */
    $scope.changeThemeForExample = function (theme) {
      serviceRequests.publisher('changeActiveTheme', {themeId: theme.id});
    };

    /* istanbul ignore next  */
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

    /* istanbul ignore next  */
    let setActiveThemeOnSite = function () {
      serviceRequests.publisher('changeActiveTheme', {themeId: serviceThemes.getActiveTheme()});
    };
    $scope.$on('$destroy', setActiveThemeOnSite);

    this.allergiesLoad = allergiesActions.all;
    this.allergiesLoad($stateParams.patientId);

    $scope.$watch('logoFileParams.name', function() {
      $scope.exampleLogoB64 = '';
      if ($scope.logoFileParams.name) {
        this.getBase64Image($scope.logoFileParams.path, $scope.logoFileParams.file, function (dataURL) {
          $timeout(function () {
            $scope.exampleLogoB64 = dataURL;
          }, 0);
        });
      }
    }.bind(this));
  }
}

const ProfileComponent = {
  template: templateProfile,
  controller: ProfileController
};

ProfileController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'allergiesActions', 'serviceRequests', 'usSpinnerService', '$timeout', 'serviceThemes'];
export default ProfileComponent;