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
  constructor($scope, $state, $stateParams, $ngRedux, transferOfCareActions, serviceRequests, serviceTransferOfCare, serviceFormatted, usSpinnerService, $window) {

    $scope.transferOfCareEdit = {};
    $scope.transferOfCareEdit.records = [];
    // {
    //   name: 'name 1',
    //   typeTitle: 'Medications',
    //   type: 'medications',
    //   date: serviceFormatted.formattingDate(new Date(), serviceFormatted.formatCollection.DDMMMYYYY),
    //   source: 'Type source'
    // }, {
    //   name: 'name 2',
    //   typeTitle: 'Medications',
    //   type: 'medications',
    //   date: serviceFormatted.formattingDate(new Date(), serviceFormatted.formatCollection.DDMMMYYYY),
    //   source: 'Type source'
    // }, {
    //   name: 'name 3',
    //   typeTitle: 'Problems / Diagnosis',
    //   type: 'diagnosis',
    //   date: serviceFormatted.formattingDate(new Date(), serviceFormatted.formatCollection.DDMMMYYYY),
    //   source: 'Type source'
    // }

    $scope.cities = [
      'Worcester Trust',
      'Kings Hospital',
      'Oxford NHS Trust',
      'St James\' Hospital'
    ];

    $scope.typeRecords = serviceTransferOfCare.getConfig();

    $scope.selectTypeRecords = function (type) {
      for (var key in $scope.typeRecords) {
        usSpinnerService.stop(key + '-spinner');
      }

      if ($scope.typeRecords[type].records == null) {
        usSpinnerService.spin(type + '-spinner');
        
        $scope.typeRecords[type].actionsFuncAll($stateParams.patientId);
      }
    };

    $scope.isShowTypeRecord = function (type) {
      return type === $scope.transferOfCareEdit.type;
    };

    $scope.addToRecords = function (value) {
      if (value) {
        var record = {};

        record.name = value.tableName;
        record.type = $scope.transferOfCareEdit.type;
        record.typeTitle = $scope.typeRecords[$scope.transferOfCareEdit.type].title;
        record.date = value.date;
        record.source = value.source;
        record.sourceId = value.sourceId;

        $scope.transferOfCareEdit.records.push(record);

        $scope.selectedRecord = null;
      }
    };

    $scope.removeRecord = function (index) {
      $scope.transferOfCareEdit.records.splice(index, 1);
    }

    $scope.togglePopover = function ($event, record) {
      var $tr = $($event.currentTarget);
      var $wrapper = $tr.closest('.record-popover-wrapper');
      var $trs = $wrapper.find('tr');
      var $popover = $wrapper.find('.record-popover');
      var topPostion;

      if ($tr.hasClass('info')) {
        $tr.removeClass('info');
        $wrapper.removeClass('open');
        serviceRequests.publisher('closeTransferOfCarePopover');

      } else {
        topPostion = ($tr.height() + $tr.offset().top) - $wrapper.offset().top;
        $popover.css('top', topPostion);


        serviceRequests.publisher('openTransferOfCarePopover', {record: record});

        $wrapper.addClass('open');
        $trs.removeClass('info');
        $tr.addClass('info');
      }



    };

    $scope.closePopovers = function () {
      var $wrapper = $(document).find('.record-popover-wrapper');
      var $trs = $wrapper.find('tr');
    
      $trs.removeClass('info');
      $wrapper.removeClass('open');
      serviceRequests.publisher('closeTransferOfCarePopover');
    
    };

    $window.addEventListener('resize', function () {
      $scope.closePopovers();
    });

    document.addEventListener('click', function (ev) {
      var $target = $(ev.target);
      var $tr = $target.closest('tr');
      var $popover = $target.closest('.record-popover');

      if (!$popover.length && (!$tr.length || ($tr.length && !$tr.hasClass('info')))) {
        $scope.closePopovers();
      }
    });

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

      if (transferOfCareForm.$valid && $scope.transferOfCareEdit.records) {
        let toAdd = {
          from: $scope.transferOfCareEdit.from,
          to: $scope.transferOfCareEdit.to,
          records: $scope.transferOfCareEdit.records,
          clinicalSummary: $scope.transferOfCareEdit.clinicalSummary,
          reasonForContact: $scope.transferOfCareEdit.reasonForContact
        };
        
        $scope.transferOfCareCreate($stateParams.patientId, toAdd);
        this.goList();
      }
    }.bind(this);

    $scope.changeArraysForTable = function (arr, name, date) {
      arr.map(function (el) {
        el.date = serviceFormatted.formattingDate(el[date], serviceFormatted.formatCollection.DDMMMYYYY);
        el.tableName = el[name];
        el.selectName = el[name];
        return el;
      });
    };

    $scope.modificateEventsArr = function (arr) {
      // goto: Later types will come
      arr = _.chain(arr)
            .filter(function (value) {
              return value.dateOfAppointment;
            })
            .each(function (value, index) {
              value.type = 'Appointment';
              value.date = serviceFormatted.formattingDate(value.dateOfAppointment, serviceFormatted.formatCollection.DDMMMYYYY);
              value.tableName = value.serviceTeam;
              value.selectName = value.serviceTeam;
              return value;
            })
            .groupBy(function(value) {
              return value.type;
            })
            .value();

      return arr;
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
        $scope.changeArraysForTable($scope.typeRecords.medications.records, 'name', 'dateCreated');
        usSpinnerService.stop('medications-spinner');
      }

      if (data.referrals.data) {
        $scope.typeRecords.referrals.records = data.referrals.data;
        $scope.typeRecords.referrals.records.map(function (el) {
          var date = serviceFormatted.formattingDate(el.dateOfReferral, serviceFormatted.formatCollection.DDMMMYYYY);
          el.date = date;
          el.tableName = date + ' ' + el.referralFrom + ' ' + el.referralTo;
          el.selectName = date + ' - ' + el.referralFrom + ' -> ' + el.referralTo;
          return el;
        });
        usSpinnerService.stop('referrals-spinner');
      }

      if (data.events.data) {
        // $scope.typeRecords.events.records = data.events.data;
        $scope.typeRecords.events.records = $scope.modificateEventsArr(data.events.data);
        
        usSpinnerService.stop('events-spinner');
      }

      if (data.vitals.data) {
        $scope.typeRecords.vitals.records = [];
        $scope.typeRecords.vitals.records.push(data.vitals.data[0]);

        $scope.typeRecords.vitals.records[0].date = serviceFormatted.formattingDate($scope.typeRecords.vitals.records[0].dateCreate, serviceFormatted.formatCollection.DDMMMYYYY);;
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

TransferOfCareCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions', 'serviceRequests', 'serviceTransferOfCare', 'serviceFormatted', 'usSpinnerService', '$window'];
export default TransferOfCareCreateComponent;