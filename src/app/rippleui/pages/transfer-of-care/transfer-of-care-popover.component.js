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

    $scope.typeRecords = serviceTransferOfCare.getConfig();

    this.setCurrentPageData = function (data) {
      if (data.documents.data) {
        $scope.data = data.findReferral.data;
      }
      if (data.diagnoses.dataGet) {
        debugger
        this.diagnosis = data.diagnoses.dataGet;
        usSpinnerService.stop('diagnosisDetail-spinner');
      }
      usSpinnerService.stop('documentssDetail-spinner');
    };

    this.togglePopover = function (data) {
      var $event =  data.$event;
      var record = data.record;
      var $tr = $($event.currentTarget);
      // var $wrapper = $tr.closest('.record-popover-wrapper');
      // var $trs = $wrapper.find('tr');
      // var $popover = $wrapper.find('.record-popover');
      // var topPostion;
      $scope.openPopover = true;
      console.log('record');
      console.log(record);
      console.log('$stateParams.patientId');
      console.log($stateParams.patientId);

      $scope.typeRecords[record.type].actionsFuncOne($stateParams.patientId, record.sourceId);

      if ($tr.hasClass('info')) {
        $tr.removeClass('info');
        $wrapper.removeClass('open');
        serviceRequests.publisher('closeTransferOfCarePopover');
      
      } else {
        // topPostion = ($tr.height() + $tr.offset().top) - $wrapper.offset().top;
        // $popover.css('top', topPostion);



        // $wrapper.addClass('open');
        // $trs.removeClass('info');
        // $tr.addClass('info');
      }

    };

    // $scope.closePopovers = function () {
    //   var $trs = $wrapper.find('tr');

    //   $trs.removeClass('info');
    //   $wrapper.removeClass('open');

    // };
    // $window.addEventListener('resize', function () {
    //   $scope.closePopovers();
    // });
    // document.addEventListener('click', function (ev) {
    //   var $tr = $(ev.target).closest('tr');
    //   if (!$tr.length || ($tr.length && !$tr.hasClass('info'))) {
    //     $scope.closePopovers();
    //     // goto: if is popover
    //   }
    // });



    serviceRequests.subscriber('toggleTransferOfCarePopover', this.togglePopover);

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