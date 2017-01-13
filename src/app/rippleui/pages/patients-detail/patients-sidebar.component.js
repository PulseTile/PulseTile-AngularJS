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

class PatientsSidebarController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, serviceRequests) {
    this.linksCollection = [
      {
        name: 'summary',
        link: 'patients-summary',
        title: 'Patient Summary'
      },
      {
        name: 'contacts',
        link: 'contacts',
        linkDetail: 'contacts-detail',
        title: 'Contacts'
      },
      {
        name: 'diagnosis',
        link: 'diagnoses',
        linkDetail: 'diagnoses-detail',
        title: 'Problems / Diagnosis'
      },
      {
        name: 'allergies',
        link: 'allergies',
        linkDetail: 'allergies-detail',
        title: 'Allergies'
      },
      {
        name: 'medications',
        link: 'medications',
        linkDetail: 'medications-detail',
        title: 'Medications'
      },
      // {
      //   name: 'orders',
      //   link: 'orders',
      //   linkDetail: 'orders-detail',
      //   title: 'Orders'
      // },
      {
        name: 'results',
        link: 'results',
        linkDetail: 'results-detail',
        title: 'Test Results'
      },
      // {
      //   name: 'procedures',
      //   link: 'procedures',
      //   linkDetail: 'procedures-detail',
      //   title: 'Procedures'
      // },
      {
        name: 'referrals',
        link: 'referrals',
        linkDetail: 'referrals-detail',
        title: 'Referrals'
      },
      // {
      //   name: 'appointments',
      //   link: 'appointments',
      //   linkDetail: 'appointments-detail',
      //   title: 'Appointments'
      // },
      // {
      //   name: 'transfers',
      //   link: 'transferOfCare',
      //   linkDetail: 'transferOfCare-detail',
      //   title: 'Transfer of Care'
      // },
      // {
      //   name: 'careplans',
      //   link: 'eolcareplans',
      //   linkDetail: 'eolcareplans-detail',
      //   title: 'Care Plans'
      // },
      // {
      //   name: 'mdt',
      //   link: 'genericMdt',
      //   linkDetail: 'genericMdt-detail',
      //   title: 'MDT'
      // },
      // {
      //   name: 'images',
      //   link: 'images',
      //   linkDetail: 'images-detail',
      //   title: 'Images'
      // },
      {
        name: 'personalNotes',
        link: 'personalNotes',
        linkDetail: 'personalNotes-detail',
        title: 'Personal Notes'
      },
      {
        name: 'vaccinations',
        link: 'vaccinations',
        linkDetail: 'vaccinations-detail',
        title: 'Vaccinations'
      },
      // {
      //   name: 'heightAndWeights',
      //   link: 'heightAndWeights',
      //   linkDetail: 'heightAndWeights-detail',
      //   title: 'Height & Weight'
      // },
      // {
      //   name: 'documents',
      //   link: 'documents',
      //   linkDetail: 'documents-detail',
      //   title: 'Documents'
      // },
      // {
      //   name: 'tags',
      //   link: 'tags',
      //   linkDetail: 'tags-detail',
      //   title: 'Tags'
      // }
    ];

    $scope.myVar = $state.router.globals.$current.name;
    
    this.goTo = function (section) {
      serviceRequests.currentSort.order = '';
      serviceRequests.currentSort.reverse = false;
      serviceRequests.filter = '';
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

PatientsSidebarController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'serviceRequests'];
export default PatientsSidebarComponent;