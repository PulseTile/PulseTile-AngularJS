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
let templatePatientsSidebar = require('./patients-sidebar.html');
import plugins from '../../../plugins';

class PatientsSidebarController {
  constructor($scope, $state, $stateParams, serviceRequests) {
    this.linksCollection = [
      {
        name: 'summary',
        link: 'patients-summary',
        title: 'Patient Summary'
      }
    ];

    plugins.forEach((plugin)=>{
      /* istanbul ignore if  */
      if (!Object.keys(plugin.sidebarInfo).length) return;
      this.linksCollection.push(plugin.sidebarInfo);
    });
    
    $scope.partsNameState = [];
    $scope.nameState = $state.router.globals.$current.name;
    
    if ($scope.nameState === this.linksCollection[0].link) {
      $scope.partsNameState[0] = this.linksCollection[0].link;
    } else {
      $scope.partsNameState = $scope.nameState.split('-');
    }

    $scope.isActiveItem = function (itemLink) {
      return $scope.partsNameState[0] == itemLink;
    };
    
    this.goTo = function (section) {
      var requestHeader = {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      };

      $state.go(section, requestHeader);
    };


  }
}

const PatientsSidebarComponent = {
  template: templatePatientsSidebar,
  controller: PatientsSidebarController
};

PatientsSidebarController.$inject = ['$scope', '$state', '$stateParams', 'serviceRequests'];
export default PatientsSidebarComponent;