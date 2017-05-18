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

let transferOfCarePopoverTemplate = require('./transfer-of-care-popover.html');

class TransferOfCarePopover {
  constructor($scope, $state, $stateParams, $ngRedux, serviceRequests, serviceTransferOfCare, usSpinnerService, serviceVitalsSigns, $window) {
    $scope.data = {};
    $scope.openPopover = false;
    $scope.currentParent = null;
    $scope.tempSourceId = '';
    $scope.vitalStatuses = {};

    $scope.typeRecords = serviceTransferOfCare.getConfig();

    /* istanbul ignore next */
    $scope.stopSpinner = function (type, sourceId) {
      if (!$scope.tempSourceId.length || $scope.tempSourceId == sourceId) {
        usSpinnerService.stop(type + '-popover-spinner');
      }
    };

    /* istanbul ignore next */
    this.setCurrentPageData = function (data) {
      
      if (data.diagnoses.dataGet) {
        $scope.data.diagnosis = data.diagnoses.dataGet;
        serviceTransferOfCare.setInCache('diagnosis', $scope.data.diagnosis.sourceId, $scope.data.diagnosis);
        $scope.stopSpinner('diagnosis', $scope.data.diagnosis.sourceId);
      }

      if (data.medication.dataGet) {
        $scope.data.medications = data.medication.dataGet;
        serviceTransferOfCare.setInCache('medications', $scope.data.medications.sourceId, $scope.data.medications);
        $scope.stopSpinner('medications', $scope.data.medications.sourceId);
      }

      if (data.referrals.dataGet) {
        $scope.data.referrals = data.referrals.dataGet;
        serviceTransferOfCare.setInCache('referrals', $scope.data.referrals.sourceId, $scope.data.referrals);
        $scope.stopSpinner('referrals', $scope.data.referrals.sourceId);
      }

      if (data.events.dataGet) {
        $scope.data.events = data.events.dataGet;
        serviceTransferOfCare.setInCache('events', $scope.data.events.sourceId, $scope.data.events);
        $scope.stopSpinner('events', $scope.data.events.sourceId);
      }

      if (data.vitals.dataGet) {
        $scope.data.vitals = data.vitals.dataGet;
        serviceTransferOfCare.setInCache('vitals', $scope.data.vitals.sourceId, $scope.data.vitals);
        $scope.vitalStatuses = serviceVitalsSigns.setVitalStatuses($scope.data.vitals);
        $scope.stopSpinner('vitals', $scope.data.vitals.sourceId);
      }
    };

    /* istanbul ignore next */
    $scope.getHighlighterClass = function (vitalName) {
      return serviceVitalsSigns.getHighlighterClass($scope.vitalStatuses[vitalName]);
    };

    /* istanbul ignore next */
    $scope.changeTypePopover = function (type) {
      $scope.title = $scope.typeRecords[type].title;
      $scope.type = type;
    };

    /* istanbul ignore next */
    this.openPopover = function (data) {
      var record = data.record;
      $scope.openPopover = true;

      $scope.changeTypePopover(record.type);

      for (var key in $scope.typeRecords) {
        usSpinnerService.stop(key + '-popover-spinner');
      }

      if (serviceTransferOfCare.isInCache(record.type, record.sourceId)) {
        $scope.data[record.type] = serviceTransferOfCare.getInCache(record.type, record.sourceId);

      } else {
        usSpinnerService.spin(record.type + '-popover-spinner');
        $scope.tempSourceId = record.sourceId;
        $scope.typeRecords[record.type].actionsFuncOne($stateParams.patientId, record.sourceId, record.source);
      }
     
    };
    serviceRequests.subscriber('openTransferOfCarePopover', this.openPopover);

    /* istanbul ignore next */
    this.closePopover = function (data) {
      $scope.openPopover = false;
    };
    serviceRequests.subscriber('closeTransferOfCarePopover', this.closePopover);

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);
  }
}

const TransferOfCarePopoverComponent = {
  template: transferOfCarePopoverTemplate,
  controller: TransferOfCarePopover
};

TransferOfCarePopover.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'serviceRequests', 'serviceTransferOfCare', 'usSpinnerService', 'serviceVitalsSigns', '$window'];
export default TransferOfCarePopoverComponent;