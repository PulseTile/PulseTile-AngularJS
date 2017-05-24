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
let templateDrawingsDetail= require('./drawings-detail.html');

class DrawingsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, drawingsActions, usSpinnerService, serviceRequests, serviceDrawings, $window) {

    $scope.isEdit = false;
    $scope.formDisabled = true;

    $scope.cities = [
      'Worcester Trust',
      'Kings Hospital',
      'Oxford NHS Trust',
      'St James\' Hospital'
    ];

    $scope.typeRecords = serviceDrawings.getConfig();

    /* istanbul ignore next */
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }

      if (data.drawings.dataGet) {
        this.drawings = data.drawings.dataGet;
        usSpinnerService.stop('transferDetail-spinner');
      }

      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
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

    /* istanbul ignore next */
    this.edit = function () {
      $scope.isEdit = true;

      $scope.currentUser = this.currentUser;
      $scope.drawingsEdit = Object.assign({}, this.drawings);
      $scope.patient = this.currentPatient;

      $scope.drawingsEdit.transferDateTime = new Date();
    };

    /* istanbul ignore next */
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };

    /* istanbul ignore next */
    $scope.confirmEdit = function (drawingsForm, drawings) {
      $scope.formSubmitted = true;

      if (drawingsForm.$valid && $scope.drawingsEdit.records) {
        let toUpdate = {
          from: drawings.from,
          to: drawings.to,
          records: drawings.records,
          clinicalSummary: drawings.clinicalSummary,
          reasonForContact: drawings.reasonForContact,
          transferDateTime: drawings.transferDateTime
        };

        this.drawings = Object.assign(drawings, toUpdate);
        $scope.isEdit = false;
        
        this.drawingsUpdate($stateParams.patientId, toUpdate);
      }
    }.bind(this);

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

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.drawingsLoad = drawingsActions.get;
    this.drawingsUpdate = drawingsActions.update;
    this.drawingsLoad($stateParams.patientId, $stateParams.detailsIndex);
  }
}

const DrawingsDetailComponent = {
  template: templateDrawingsDetail,
  controller: DrawingsDetailController
};

DrawingsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'drawingsActions', 'usSpinnerService', 'serviceRequests', 'serviceDrawings', '$window'];
export default DrawingsDetailComponent;