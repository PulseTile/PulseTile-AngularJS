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
  constructor($scope, $state, $stateParams, $ngRedux, transferOfCareActions, serviceRequests, serviceFormatted, usSpinnerService, 
    diagnosesActions, eventsActions, vitalsActions, referralsActions, medicationsActions) {

    $scope.transferOfCareEdit = {};
    $scope.transferOfCareEdit.records = [{
      name: 'name 1',
      typeTitle: 'Medications',
      type: 'medications',
      date: serviceFormatted.formattingDate(new Date(), serviceFormatted.formatCollection.DDMMMYYYY),
      source: 'Type source'
    }, {
      name: 'name 2',
      typeTitle: 'Medications',
      type: 'medications',
      date: serviceFormatted.formattingDate(new Date(), serviceFormatted.formatCollection.DDMMMYYYY),
      source: 'Type source'
    }, {
      name: 'name 3',
      typeTitle: 'Problems / Diagnosis',
      type: 'diagnosis',
      date: serviceFormatted.formattingDate(new Date(), serviceFormatted.formatCollection.DDMMMYYYY),
      source: 'Type source'
    }];


    $scope.cities = [
      'Worcester Trust',
      'Kings Hospital',
      'Oxford NHS Trust',
      'St James\' Hospital',
    ];

    $scope.typeRecords = {
      diagnosis: {
        title: 'Problems / Diagnosis',
        actionsFunc: diagnosesActions.all,
        records: null
      },
      medications: {
        title: 'Medications',
        actionsFunc: medicationsActions.all,
        records: null
      },
      referrals: {
        title: 'Referrals',
        actionsFunc: referralsActions.all,
        records: null,
      },
      events: {
        title: 'Events',
        actionsFunc: eventsActions.all,
        records: null,
        types: null
      },
      vitals: {
        title: 'Vitals',
        actionsFunc: vitalsActions.all,
        records: null
      }
    };

    $scope.selectTypeRecords = function (type) {
      for (var key in $scope.typeRecords) {
        usSpinnerService.stop(key + '-spinner');
      }

      if ($scope.typeRecords[type].records == null) {
        usSpinnerService.spin(type + '-spinner');
        
        $scope.typeRecords[type].actionsFunc($stateParams.patientId);
      }
    };

    $scope.isShowTypeRecord = function (type) {
      return type === $scope.transferOfCareEdit.type;
    };

    $scope.addToRecords = function (value) {
      var record = {};
      var valueForRecord = value;

      record.name = value.tableName;
      record.type = $scope.transferOfCareEdit.type;
      record.typeTitle = $scope.typeRecords[$scope.transferOfCareEdit.type].title;
      record.date = value.date;
      record.source = value.source;
      record.sourceId = value.sourceId;

      // switch ($scope.transferOfCareEdit.type) {
      //   case 'diagnosis': 
      //       record.date = serviceFormatted.formattingDate(value.dateOfOnset, serviceFormatted.formatCollection.DDMMMYYYY);
      //     break;
      //   case 'medications': 
      //     record.name = value.name;
      //     record.date = serviceFormatted.formattingDate(value.dateCreated, serviceFormatted.formatCollection.DDMMMYYYY);
      //     break;
      //   case 'referrals': 
      //     record.name = value.tableName;
      //     record.date = serviceFormatted.formattingDate(value.dateOfReferral, serviceFormatted.formatCollection.DDMMMYYYY);
      //     break;
      //   case 'events': 
      //     break;
      //   case 'vitals': 
      //     record.name = value.tableName;
      //     record.date = serviceFormatted.formattingDate(value.dateCreate, serviceFormatted.formatCollection.DDMMMYYYY);
      //     break;
      //   // default: 
      // }


      // console.log('record');
      // console.log(record);
      $scope.transferOfCareEdit.records.push(record);

      $scope.selectedRecord = null;
    };

    $scope.removeRecord = function (index) {

      $scope.transferOfCareEdit.records.splice(index, 1);
    }


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

      console.log('$scope.transferOfCareEdit');
      console.log($scope.transferOfCareEdit);
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

    $scope.changeArraysForTable = function (arr, name, date) {
      arr.map(function (el) {
        el.data = serviceFormatted.formattingDate(el[date], serviceFormatted.formatCollection.DDMMMYYYY);
        el.tableName = el[name];
        el.selectName = el[name];
        return el;
      });
    };

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

      // For type Records
      if (data.diagnoses.data) {
        $scope.typeRecords.diagnosis.records = data.diagnoses.data;
        $scope.changeArraysForTable($scope.typeRecords.diagnosis.records, 'problem', 'dateOfOnset');
        usSpinnerService.stop('diagnosis-spinner');
      }

      if (data.medication.data) {
        $scope.typeRecords.medications.records = data.medication.data;
        $scope.changeArraysForTable($scope.typeRecords.medication.records, 'name', 'dateCreated');
        usSpinnerService.stop('medications-spinner');
      }

      if (data.referrals.data) {
        $scope.typeRecords.referrals.records = data.referrals.data;
        $scope.typeRecords.referrals.records.map(function (el) {
          var data = serviceFormatted.formattingDate(el.dateOfOnset, serviceFormatted.formatCollection.DDMMMYYYY);
          el.data = data;
          el.tableName = data + ' ' + el.referralFrom + ' ' + el.referralTo;
          el.selectName = data + ' - ' + el.referralFrom + ' -> ' + el.referralTo;
          return el;
        });
        usSpinnerService.stop('referrals-spinner');

      }
      if (data.events.data) {
        $scope.typeRecords.events.records = data.events.data;
        // console.log('$scope.typeRecords.events.records');
        // console.log($scope.typeRecords.events.records);
        usSpinnerService.stop('events-spinner');
      }
      if (data.vitals.data) {
        $scope.typeRecords.vitals.records = [];
        $scope.typeRecords.vitals.records.push(data.vitals.data[0]);
        
        $scope.typeRecords.vitals.records[0].data = serviceFormatted.formattingDate(el.dateCreate, serviceFormatted.formatCollection.DDMMMYYYY);;
        $scope.typeRecords.vitals.records[0].selectName = 'Latest Vitals Data';
        $scope.typeRecords.vitals.records[0].tableName = 'Latest Vitals Data';
        usSpinnerService.stop('vitals-spinner');
      }

    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.transferOfCareCreate = transferOfCareActions.create;
    // $scope.transferOfCareLoad = transferOfCareActions.all;
  }
}

const TransferOfCareCreateComponent = {
  template: templateCreate,
  controller: TransferOfCareCreateController
};

TransferOfCareCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions', 'serviceRequests', 'serviceFormatted', 'usSpinnerService', 
                                          'diagnosesActions', 'eventsActions', 'vitalsActions', 'referralsActions', 'medicationsActions'];
export default TransferOfCareCreateComponent;