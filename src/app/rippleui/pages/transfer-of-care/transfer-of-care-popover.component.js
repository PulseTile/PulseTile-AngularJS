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
  constructor($scope, $state, $stateParams, $ngRedux, serviceRequests, serviceTransferOfCare, usSpinnerService, $window) {
    $scope.data = {};
    $scope.openPopover = false;
    $scope.currentParent = null;

    $scope.typeRecords = serviceTransferOfCare.getConfig();

    this.setCurrentPageData = function (data) {
      if (data.documents.data) {
        $scope.data = data.findReferral.data;
      }
      if (data.diagnoses.dataGet) {
        $scope.data.diagnosis = data.diagnoses.dataGet;
        serviceTransferOfCare.setInCache('diagnosis', $scope.data.diagnosis.sourceId, $scope.data.diagnosis);
        usSpinnerService.stop('diagnosisDetail-spinner');
      }
      if (data.vitals.dataGet) {
        $scope.data.vitals = data.vitals.dataGet;
        serviceTransferOfCare.setInCache('vitals', $scope.data.vitals.sourceId, $scope.data.vitals);
      }
    };

    $scope.changeTypePopover = function (type) {
      $scope.title = $scope.typeRecords[type].title;
      $scope.type = type;
    };

    this.openPopover = function (data) {
      var record = data.record;
      $scope.openPopover = true;

      $scope.changeTypePopover(record.type);

      if (serviceTransferOfCare.isInCache(record.type, record.sourceId)) {
        $scope.data[type] = serviceTransferOfCare.getInCache(record.type, record.sourceId);

      } else {
        $scope.typeRecords[record.type].actionsFuncOne($stateParams.patientId, record.sourceId, record.source);
      }
     
    };
    serviceRequests.subscriber('openTransferOfCarePopover', this.openPopover);

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

TransferOfCarePopover.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'serviceRequests', 'serviceTransferOfCare', 'usSpinnerService', '$window'];
export default TransferOfCarePopoverComponent;