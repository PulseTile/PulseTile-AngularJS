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
let templateCreate = require('./transfer-of-care-create.html');

class TransferOfCareCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, transferOfCareActions, serviceRequests, serviceFormatted) {

    $scope.transferOfCareEdit = {};
    $scope.transferOfCareEdit.records = [];

    $scope.transferOfCareEdit.dateCreated = new Date();
    $scope.cities = [
      'Worcester Trust',
      'Kings Hospital',
      'Oxford NHS Trust',
      'St James\' Hospital',
    ];

    $scope.typeRecordsSelect = [{
        title: 'Problems / Diagnosis',
        value: 'diagnosis'
      }, {
        title: 'Medications',
        value: 'medications'
      }, {
        title: 'Referrals',
        value: 'referrals'
      }, {
        title: 'Events',
        value: 'events'
      }, {
        title: 'Vitals',
        value: 'vitals'
      }];
    $scope.typeRecords = {
      diagnosis: {
        title: 'Problems / Diagnosis',
        types: [
          'Ex-Smoker',
          'Vascular Dementua',
          'COPD',
          'Fever',
        ]
      },
      medications: {
        title: 'Medications',
      },
      referrals: {
        title: 'Referrals',
      },
      events: {
        title: 'Events',
      },
      vitals: {
        title: 'Events',
      }
    };

    $scope.isShowTypeRecord = function (type) {
      return type === $scope.transferOfCareEdit.type;
    };

    $scope.addToRecords = function (type) {
      var record = {};

      record.name = $scope.diagnosisSelected;
      record.type = $scope.transferOfCareEdit.type;
      record.date = serviceFormatted.formattingDate(new Date(), serviceFormatted.formatCollection.DDMMMYYYY);
      record.source = 'ethercis';

      console.log('record');
      console.log(record);
      $scope.transferOfCareEdit.records.push(record);
    };


    this.goList = function () {
      $state.go('transferOfCare', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.cancel = function () {
      this.goList();
    };
    
    $scope.create = function (transferOfCareForm, transferOfCare) {
      $scope.formSubmitted = true;

      if (transferOfCareForm.$valid) {
        let toAdd = {
          sourceId: '',
          cause: transferOfCare.cause,
          causeCode: transferOfCare.causeCode,
          causeTerminology: transferOfCare.causeTerminology,
          reaction: transferOfCare.reaction,
          isImport: transferOfCare.isImport,
          source: transferOfCare.source
        };
        
        $scope.transferOfCareCreate(this.currentPatient.id, toAdd);
      }
    }.bind(this);

    this.setCurrentPageData = function (data) {
      if (data.transferOfCare.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.transferOfCareEdit.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.transferOfCareCreate = transferOfCareActions.create;
    $scope.transferOfCareLoad = transferOfCareActions.all;
  }
}

const TransferOfCareCreateComponent = {
  template: templateCreate,
  controller: TransferOfCareCreateController
};

TransferOfCareCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions', 'serviceRequests', 'serviceFormatted'];
export default TransferOfCareCreateComponent;