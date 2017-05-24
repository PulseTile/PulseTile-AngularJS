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
let templateCreate = require('./drawings-create.html');

class DrawingsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, drawingsActions, serviceRequests, serviceDrawings, serviceFormatted, usSpinnerService, $window) {

    $scope.drawingsEdit = {};
    $scope.drawingsEdit.transferDateTime = new Date();
    $scope.drawingsEdit.records = [];

    $scope.cities = [
      'Worcester Trust',
      'Kings Hospital',
      'Oxford NHS Trust',
      'St James\' Hospital'
    ];

    $scope.typeRecords = serviceDrawings.getConfig();

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
      return type === $scope.drawingsEdit.type;
    };

    /* istanbul ignore next */
    $scope.addToRecords = function (value) {
      if (value) {
        var record = {};

        record.name = value.tableName;
        record.type = $scope.drawingsEdit.type;
        record.typeTitle = $scope.typeRecords[$scope.drawingsEdit.type].title;
        record.date = value.date;
        record.source = value.source;
        record.sourceId = value.sourceId;

        $scope.drawingsEdit.records.push(record);

        $scope.selectedRecord = null;
      }
    };

    /* istanbul ignore next */
    $scope.removeRecord = function (index) {
      $scope.drawingsEdit.records.splice(index, 1);
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
        serviceRequests.publisher('closeDrawingsPopover');

      } else {
        topPostion = ($tr.height() + $tr.offset().top) - $wrapper.offset().top;
        $popover.css('top', topPostion);

        serviceRequests.publisher('openDrawingsPopover', {record: record});

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
      serviceRequests.publisher('closeDrawingsPopover');
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
      $state.go('drawings', {
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
    this.create = function (drawingsForm, drawings) {
      $scope.formSubmitted = true;

      if (drawingsForm.$valid && $scope.drawingsEdit.records) {
        let toAdd = {
          from: $scope.drawingsEdit.from,
          to: $scope.drawingsEdit.to,
          records: $scope.drawingsEdit.records,
          clinicalSummary: $scope.drawingsEdit.clinicalSummary,
          reasonForContact: $scope.drawingsEdit.reasonForContact,
          transferDateTime: $scope.drawingsEdit.transferDateTime
        };
        
        $scope.drawingsCreate($stateParams.patientId, toAdd);
      }
    }.bind(this);

    /* istanbul ignore next */
    this.setCurrentPageData = function (data) {
      if (data.drawings.dataCreate !== null) {
        this.goList();
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.drawingsEdit.author = $scope.currentUser.email;
      }

      // For type Records
      if (data.diagnoses.data) {
        serviceDrawings.setDiagnosisRecords(data.diagnoses.data);
        usSpinnerService.stop('diagnosis-spinner');
      }

      if (data.medication.data) {
        serviceDrawings.setMedicationRecords(data.medication.data);
        usSpinnerService.stop('medications-spinner');
      }

      if (data.referrals.data) {
        serviceDrawings.setReferralsRecords(data.referrals.data);
        usSpinnerService.stop('referrals-spinner');
      }

      if (data.events.data) {
        serviceDrawings.setEventsRecords(data.events.data);
        usSpinnerService.stop('events-spinner');
      }

      if (data.vitals.data) {
        serviceDrawings.setVitalsRecords(data.vitals.data);
        usSpinnerService.stop('vitals-spinner');
      }

    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    $scope.drawingsCreate = drawingsActions.create;
  }
}

const DrawingsCreateComponent = {
  template: templateCreate,
  controller: DrawingsCreateController
};

DrawingsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'drawingsActions', 'serviceRequests', 'serviceDrawings', 'serviceFormatted', 'usSpinnerService', '$window'];
export default DrawingsCreateComponent;