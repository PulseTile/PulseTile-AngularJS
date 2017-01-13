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
export default function EolcareplansModal($uibModal, eolcareplansActions, $ngRedux, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, eolcareplan, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./eolcareplans-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          var updateId = function (sourceId) {
            var sourceArr = sourceId.split('::');
            var newVersionNumber = parseInt(sourceArr[2]) + 1;
            var newId = sourceArr[0] + '::' + sourceArr[1] + '::' + newVersionNumber;
            return newId;
          };

          $scope.patient = patient;
          $scope.eolcareplan = eolcareplan;
          $scope.modal = modal;
          $scope.currentUser = currentUser;
          $scope.docTypes = [
            { type: 'Document Type' },
            { type: 'Document Type 2' }
          ];


          if (modal.title === 'Create End of Life Care Document') {
            $scope.isEdit = false;
            $scope.eolcareplan.careDocument = {
              dateCreated: new Date()
            };
          } else {
            $scope.isEdit = true;
            $scope.eolcareplan.careDocument.dateCreated = new Date($scope.eolcareplan.careDocument.dateCreated);
            $scope.eolcareplan.cprDecision.dateOfDecision = new Date($scope.eolcareplan.cprDecision.dateOfDecision);
            $scope.eolcareplan.treatmentDecision.dateOfDecision = new Date($scope.eolcareplan.treatmentDecision.dateOfDecision);
            $scope.eolcareplan.treatmentDecision.decisionToRefuseTreatment = $.trim($scope.eolcareplan.treatmentDecision.decisionToRefuseTreatment);
            $scope.eolcareplan.cprDecision.cprDecision = $.trim($scope.eolcareplan.cprDecision.cprDecision);
            // $scope.eolcareplan.careDocument.dateCreated = new Date($scope.eolcareplan.careDocument.dateCreated).toISOString().slice(0, 10);
            // $scope.eolcareplan.cprDecision.dateOfDecision = new Date($scope.eolcareplan.cprDecision.dateOfDecision).toISOString().slice(0, 10);
            // $scope.eolcareplan.treatmentDecision.dateOfDecision = new Date($scope.eolcareplan.treatmentDecision.dateOfDecision).toISOString().slice(0, 10);
          }

          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.radioModel = 'Tab1';
          $scope.typesAvaliable = ['Document', 'Document T1', 'Document T2', 'Document T3'];
          $scope.typesChosen = $scope.typesAvaliable[0];

          $scope.ok = function (eolcareplanForm, eolcareplans) {
            $scope.formSubmitted = true;
            eolcareplan.careDocument.type = eolcareplan.careDocument.type.type;
            eolcareplan.careDocument.dateCreated = new Date(eolcareplan.careDocument.dateCreated);
            eolcareplan.cprDecision.dateOfDecision = new Date(eolcareplan.cprDecision.dateOfDecision);
            eolcareplan.treatmentDecision.dateOfDecision = new Date(eolcareplan.treatmentDecision.dateOfDecision);

            let toAdd = {
              sourceId: eolcareplan.sourceId ? eolcareplan.sourceId : '',
              careDocument: eolcareplan.careDocument,
              cprDecision: eolcareplan.cprDecision,
              prioritiesOfCare: eolcareplan.prioritiesOfCare,
              source: 'openehr',
              treatmentDecision: eolcareplan.treatmentDecision
            };

            if (eolcareplanForm.$valid) {

              $uibModalInstance.close(eolcareplans);

              if ($scope.isEdit) {
                $scope.eolcareplansUpdate($scope.patient.id, toAdd);
                setTimeout(function () {
                  $state.go('eolcareplans-detail', {
                    patientId: $scope.patient.id,
                    eolcareplansIndex: updateId(eolcareplan.sourceId),
                    page: $scope.currentPage,
                    reportType: $stateParams.reportType,
                    searchString: $stateParams.searchString,
                    queryType: $stateParams.queryType
                  });
                }, 1000);
              } else {
                $scope.eolcareplansCreate($scope.patient.id, toAdd);
                setTimeout(function () {
                  $state.go('eolcareplans', {
                    patientId: $scope.patient.id,
                    filter: $scope.query,
                    page: $scope.currentPage,
                    reportType: $stateParams.reportType,
                    searchString: $stateParams.searchString,
                    queryType: $stateParams.queryType
                  });
                }, 1000);
              }

            }
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.validate = function (form, name, index) {
            var errorToCheckFor = name + index;

            for (var error in form.$error.required) {
              var errorName = form.$error.required[error].$name;

              if (errorName === errorToCheckFor) {
                return true;
              }
            }
          };

          $scope.validateDirty = function (form, name, index) {
            var errorToCheckFor = name + index;
            return form[errorToCheckFor].$dirty && form[errorToCheckFor].$invalid;
          };

          $scope.validateClean = function (form, name, index) {
            var errorToCheckFor = name + index;
            return form[errorToCheckFor].$dirty && form[errorToCheckFor].$valid;
          };

          $scope.eolcareplansCreate = eolcareplansActions.create;
          $scope.eolcareplansUpdate = eolcareplansActions.update;
        }
      });
    }

    modalInstance.result.then(function() {
      isModalClosed = true;
    }, function() {
      isModalClosed = true;
    });

  };

  return {
    isModalClosed: isModalClosed,
    openModal: openModal
  };
}
EolcareplansModal.$inject = ['$uibModal', 'eolcareplansActions', '$ngRedux', '$stateParams'];