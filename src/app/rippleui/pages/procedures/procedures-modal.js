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
export default function ProceduresModal($uibModal, proceduresActions, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, procedure, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./procedures-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.patient = patient;
          $scope.procedure = angular.copy(procedure);
          $scope.modal = modal;
          $scope.currentUser = currentUser;

          var updateId = function (sourceId) {
            var sourceArr = sourceId.split('::');
            var newVersionNumber = parseInt(sourceArr[2]) + 1;
            var newId = sourceArr[0] + '::' + sourceArr[1] + '::' + newVersionNumber;
            return newId;
          };
          if (modal.title === 'Create Procedure') {
            $scope.isEdit = false;
            $scope.procedure.dateSubmitted = new Date();
          } else {
            $scope.isEdit = true;
            // $scope.procedure.time = new Date($scope.procedure.time);
            $scope.procedure.dateSubmitted = new Date($scope.procedure.dateSubmitted);
            // $scope.procedure.dateSubmitted = new Date($scope.procedure.dateSubmitted).toISOString().slice(0, 10);
            $scope.procedure.date = new Date($scope.procedure.date);
            // $scope.procedure.date = new Date($scope.procedure.date).toISOString().slice(0, 10);
          }

          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.ok = function (procedureForm, procedure) {
            $scope.formSubmitted = true;
            if (procedureForm.$valid) {

              $uibModalInstance.close(procedure);

              procedure.dateSubmitted = new Date(procedure.dateSubmitted);
              procedure.date = new Date(procedure.date);
              procedure.date.setMinutes(procedure.date.getMinutes() - procedure.date.getTimezoneOffset());
              if ($scope.isEdit) {
                let  toUpdate = {
                  sourceId: procedure.sourceId,
                  procedureName: procedure.procedureName,
                  procedureCode: procedure.procedureCode,
                  procedureTerminology: procedure.procedureTerminology,
                  notes: procedure.notes,
                  author: procedure.author,
                  date: procedure.date,
                  time: procedure.time.getTime(),
                  performer: procedure.performer,
                  dateSubmitted: procedure.dateSubmitted,
                  source: procedure.source
                };

                $scope.proceduresUpdate($scope.patient.id, toUpdate);

                setTimeout(function () {
                  $state.go('procedures-detail', {
                    patientId: $scope.patient.id,
                    procedureId: procedure.source === 'Marand' ? updateId(procedure.sourceId) : procedure.sourceId,
                    page: $scope.currentPage,
                    reportType: $stateParams.reportType,
                    searchString: $stateParams.searchString,
                    queryType: $stateParams.queryType,
                    source: $stateParams.source
                  });
                }, 1000);

              } else {
                let  toAdd = {
                  sourceId: '',
                  procedureName: procedure.procedureName,
                  procedureCode: procedure.procedureCode,
                  procedureTerminology: procedure.procedureTerminology,
                  notes: procedure.notes,
                  author: procedure.author,
                  date: procedure.date,
                  time: procedure.time.getTime(),
                  performer: procedure.performer,
                  dateSubmitted: procedure.dateSubmitted
                };

                $scope.proceduresCreate($scope.patient.id, toAdd);

                setTimeout(function () {
                  $state.go('procedures', {
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
            $scope.procedure = angular.copy(procedure);
            $uibModalInstance.dismiss('cancel');
          };

          $scope.proceduresCreate = proceduresActions.create;
          $scope.proceduresUpdate = proceduresActions.update;
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
ProceduresModal.$inject = ['$uibModal', 'proceduresActions', '$stateParams'];