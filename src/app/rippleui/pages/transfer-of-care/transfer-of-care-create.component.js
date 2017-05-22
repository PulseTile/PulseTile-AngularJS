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
    $scope.transferOfCareEdit.transferDateTime = new Date();
    $scope.transferOfCareEdit.records = [];

    $scope.cities = [
      'Worcester Trust',
      'Kings Hospital',
      'Oxford NHS Trust',
      'St James\' Hospital'
    ];

    $scope.typeRecords = serviceTransferOfCare.getConfig();

    /* istanbul ignore next */
    $scope.selectTypeRecords = function (type) {
      for (var key in $scope.typeRecords) {
        usSpinnerService.stop(key + '-spinner');
      }

      if ($scope.typeRecords[type].records == null) {
        usSpinnerService.spin(type + '-spinner');
        
        $scope.typeRecords[type].actionsFuncAll($stateParams.patientId);
      }
    };

    /* istanbul ignore next */
    $scope.isShowTypeRecord = function (type) {
      return type === $scope.transferOfCareEdit.type;
    };

    /* istanbul ignore next */
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

    /* istanbul ignore next */
    $scope.removeRecord = function (index) {
      $scope.transferOfCareEdit.records.splice(index, 1);
    }

    /* istanbul ignore next */
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

    /* istanbul ignore next */
    $scope.closePopovers = function () {
      var $wrapper = $(document).find('.record-popover-wrapper');
      var $trs = $wrapper.find('tr');
    
      $trs.removeClass('info');
      $wrapper.removeClass('open');
      serviceRequests.publisher('closeTransferOfCarePopover');
    };

    /* istanbul ignore next */
    $window.addEventListener('resize', function () {
      $scope.closePopovers();
    });

    /* istanbul ignore next */
    document.addEventListener('click', function (ev) {
      var $target = $(ev.target);
      var $tr = $target.closest('tr');
      var $popover = $target.closest('.record-popover');

      if (!$popover.length && (!$tr.length || ($tr.length && !$tr.hasClass('info')))) {
        $scope.closePopovers();
      }
    });

    /* istanbul ignore next */
    this.goList = function () {
      $state.go('transferOfCare', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    /* istanbul ignore next */
    this.cancel = function () {
      this.goList();
    };
    
    /* istanbul ignore next */
    this.create = function (transferOfCareForm, transferOfCare) {
      $scope.formSubmitted = true;

      if (transferOfCareForm.$valid && $scope.transferOfCareEdit.records) {
        let toAdd = {
          from: $scope.transferOfCareEdit.from,
          to: $scope.transferOfCareEdit.to,
          records: $scope.transferOfCareEdit.records,
          clinicalSummary: $scope.transferOfCareEdit.clinicalSummary,
          reasonForContact: $scope.transferOfCareEdit.reasonForContact,
          transferDateTime: $scope.transferOfCareEdit.transferDateTime
        };
        
        $scope.transferOfCareCreate($stateParams.patientId, toAdd);
      }
    }.bind(this);

    /* istanbul ignore next */
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
        serviceTransferOfCare.setDiagnosisRecords(data.diagnoses.data);
        usSpinnerService.stop('diagnosis-spinner');
      }

      if (data.medication.data) {
        serviceTransferOfCare.setMedicationRecords(data.medication.data);
        usSpinnerService.stop('medications-spinner');
      }

      if (data.referrals.data) {
        serviceTransferOfCare.setReferralsRecords(data.referrals.data);
        usSpinnerService.stop('referrals-spinner');
      }

      if (data.events.data) {
        serviceTransferOfCare.setEventsRecords(data.events.data);
        usSpinnerService.stop('events-spinner');
      }

      if (data.vitals.data) {
        serviceTransferOfCare.setVitalsRecords(data.vitals.data);
        usSpinnerService.stop('vitals-spinner');
      }

    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.transferOfCareCreate = transferOfCareActions.create;
  }
}

const TransferOfCareCreateComponent = {
  template: templateCreate,
  controller: TransferOfCareCreateController
};

TransferOfCareCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions', 'serviceRequests', 'serviceTransferOfCare', 'serviceFormatted', 'usSpinnerService', '$window'];
export default TransferOfCareCreateComponent;