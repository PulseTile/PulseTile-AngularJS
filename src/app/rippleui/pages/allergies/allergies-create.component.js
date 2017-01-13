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

let templateAllergiesCreate = require('./allergies-create.html');

class AllergiesCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, allergiesActions, serviceRequests) {
    $scope.allergy = {};
    $scope.allergy.dateCreated = new Date();
    // $scope.allergy.dateCreated = new Date().toISOString().slice(0, 10);
    $scope.allergy.causeCode = '1239085';
    $scope.allergy.terminologyCode = '12393890';  

    this.setCurrentPageData = function (data) {
      if (data.allergies.dataCreate !== null) {
        this.goList();
      }
      // if (data.allergies.dataUpdate !== null) {
      //   $state.go('allergies-details', {
      //     patientId: $scope.patient.id,
      //     filter: $scope.query,
      //     page: $scope.currentPage
      //   });
      // }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
      }
    };

    this.goList = function () {
      $state.go('allergies', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    }
    this.cancel = function () {
      this.goList();
    };
    $scope.create = function (allergyForm, allergies) {
      $scope.formSubmitted = true;

      let toAdd = {
        sourceId: '',
        cause: allergies.cause,
        causeCode: allergies.causeCode,
        causeTerminology: allergies.causeTerminology,
        reaction: allergies.reaction,
        source: allergies.source
      };

      if (allergyForm.$valid) {
        debugger
        $scope.allergiesCreate(this.currentPatient.id, toAdd);
      }
    }.bind(this);

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.allergiesCreate = allergiesActions.create;
    // $scope.allergiesUpdate = allergiesActions.update;
    $scope.allergiesLoad = allergiesActions.all;
  }
}

const AllergiesCreateComponent = {
  template: templateAllergiesCreate,
  controller: AllergiesCreateController
};

AllergiesCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'allergiesActions', 'serviceRequests'];
export default AllergiesCreateComponent;
