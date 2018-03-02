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
import {httpHandleErrors} from "../handle-errors/handle-errors-actions";

let templateInitialise = require('./initialise.html');

class InitialiseController {
  constructor($rootScope, $scope, $state, serviceRequests, serviceThemes, ConfirmationRedirectModal, $ngRedux) {
    $scope.isLoadingPage = true;
    $scope.isInitialised = false;
    $scope.userData = null;
    $scope.versionOfServer = '-';

    var classLoadingPage = 'loading';
    var body = $('body');


    body.addClass(classLoadingPage);

    $scope.hidePageLoading = function (isInitialised) {
      $scope.isInitialised = isInitialised;

      body.removeClass(classLoadingPage);
      setTimeout(() => {
        $scope.isLoadingPage = false;
      }, 1000);
    };

    $scope.showInitialiseError = function (err) {
      err.initialiseError = true;
      $ngRedux.dispatch(httpHandleErrors(err));
      $scope.hidePageLoading(false);
    };

    /* istanbul ignore next */
    var switchDirectByRole = function (currentUser) {
      var locationHrefBeforeLogin = localStorage.getItem('locationHrefBeforeLogin');

      /* istanbul ignore if  */
      if (!currentUser) return;

      // Direct different roles to different pages at login
      /* istanbul ignore next  */
      switch (currentUser.role) {
        case 'IDCR':
          /*Go to URL from localStorage*/
          if (locationHrefBeforeLogin) {
            localStorage.removeItem('locationHrefBeforeLogin');
          }
          break;
        case 'PHR':
          //Trick for PHR user login
          if (locationHrefBeforeLogin &&
            (locationHrefBeforeLogin.indexOf(currentUser.nhsNumber) > -1 ||
              locationHrefBeforeLogin.indexOf('profile') > -1) ) {
            // If patient can go to the link from Local Storage

            location.href = locationHrefBeforeLogin;

          } else if ((location.href.indexOf(currentUser.nhsNumber) === -1) &&
            (location.href.indexOf('profile') === -1)) {

            if (locationHrefBeforeLogin) {
              let path = locationHrefBeforeLogin.split('#/')[1];
              if (path !== '' ||
                path !== 'charts') {
                ConfirmationRedirectModal.openModal(currentUser.nhsNumber);
              }
            }

            $state.go('patients-summary', {
              patientId: currentUser.nhsNumber
            });

          }

          localStorage.removeItem('locationHrefBeforeLogin');

          break;
        default:
          $state.go('patients-charts');
      }
    };

    /* istanbul ignore next */
    var setLoginData = function (loginResult) {
      serviceRequests.publisher('setUserData', {userData: loginResult.data});
      $scope.userData = loginResult.data;
      switchDirectByRole($scope.userData);
    };

    serviceRequests.subscriber('getUserData', () => {
      serviceRequests.publisher('setUserData', {userData: $scope.userData});
    });



    /* istanbul ignore next */
    var login = function () {
      serviceRequests.login().then(function (result) {
        serviceRequests.currentUserData = result.data;
        setLoginData(result);
        serviceRequests.getAppSettings().then(function (res) {
          if (res.data) {
            serviceThemes.setDataApplication(res.data);
          }
          $scope.hidePageLoading(true);

        }).catch(function (err) {
          $scope.showInitialiseError(err);
        });
      }).catch(function (err) {
        $scope.showInitialiseError(err);
      });
    };

    var auth0;


    serviceRequests.initialise().then(function (result){
      /* istanbul ignore next */
      if (result.data.token) {
        // reset the JSESSIONID cookie with the new incoming cookie
        document.cookie = "JSESSIONID=" + result.data.token;

        location.reload();

        return;
      }

      /* istanbul ignore next */
      if (result.data.redirectURL) {
        location.replace(result.data.redirectURL);
      }
      /* istanbul ignore next */
      if (result.data.redirectTo === 'auth0') {
        console.log('running in UAT mode, so now login via auth0');

        var isSignout = localStorage.getItem('signout');
        localStorage.removeItem('signout');

        if (!isSignout) {
          /*Set URL to localStorage*/
          localStorage.setItem('locationHrefBeforeLogin', location.href);
        }


        if (!auth0) auth0 = new Auth0(result.data.config);
        auth0.login({
          connections: result.data.connections
        });
        return;
      }

      /* istanbul ignore if */
      if (result.data && result.data.version) {
        $scope.versionOfServer = result.data.version;
      }

      /* istanbul ignore if */
      if (result.data && result.data.ok) {
        console.log('Cookie was for a valid session, so fetch the simulated user');
        login();
      }



    }).catch(function (err) {
      $scope.showInitialiseError(err);
    });

    serviceRequests.subscriber('getVersionServer', () => {
      serviceRequests.publisher('setVersionServer', {version: $scope.versionOfServer});
    });

    /* istanbul ignore next */
    $rootScope.$on('$locationChangeSuccess', function() {
      switchDirectByRole($scope.userData);
    }.bind(this));
  }
}
const InitialiseComponent = {
  template: templateInitialise,
  controller: InitialiseController
};

InitialiseController.$inject = ['$rootScope', '$scope', '$state', 'serviceRequests', 'serviceThemes', 'ConfirmationRedirectModal', '$ngRedux'];
export default InitialiseComponent;