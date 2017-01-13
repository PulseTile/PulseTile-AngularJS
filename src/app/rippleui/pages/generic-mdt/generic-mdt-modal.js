export default function GenericMdtModal($uibModal, genericmdtActions, $ngRedux, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, genericMdt, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./generic-mdt-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          var updateId = function (sourceId) {
            var sourceArr = sourceId.split('::');
            var newVersionNumber = parseInt(sourceArr[2]) + 1;
            var newId = sourceArr[0] + '::' + sourceArr[1] + '::' + newVersionNumber;
            return newId;
          };

          var setCurrentPageData = function (data) {
            if (data.genericmdt.dataCreate !== null) {
              $uibModalInstance.close(genericMdt);
              $state.go('genericMdt', {
                patientId: $scope.patient.id,
                filter: $scope.query,
                page: $scope.currentPage,
                reportType: $stateParams.reportType,
                searchString: $stateParams.searchString,
                queryType: $stateParams.queryType
              });
            }
            if (data.genericmdt.dataUpdate !== null) {
              $uibModalInstance.close(genericMdt);
              $state.go('genericMdt-detail', {
                patientId: $scope.patient.id,
                genericMdtIndex: updateId(genericMdt.sourceId),
                page: $scope.currentPage,
                reportType: $stateParams.reportType,
                searchString: $stateParams.searchString,
                queryType: $stateParams.queryType
              });
            }
          };

          $scope.genericMdt = angular.copy(genericMdt);
          $scope.protocol = 'http://';
          $scope.isEdit = false;

          if (modal.title === 'Edit MDT') {
            $scope.isEdit = true;
            $scope.genericMdt.timeOfMeeting = new Date($scope.genericMdt.timeOfMeeting);
            $scope.genericMdt.dateOfMeeting = new Date($scope.genericMdt.dateOfMeeting);
            $scope.genericMdt.dateOfRequest = new Date($scope.genericMdt.dateOfRequest);
          }

          $scope.patient = patient;
          $scope.modal = modal;
          $scope.currentUser = currentUser;

          $scope.changeProtocol = function (protocol) {
            switch (protocol) {
              case 'http':
                $scope.protocol = 'http://';
                break;
              case 'https':
                $scope.protocol = 'https://';
                break;
              default:
                $scope.protocol = 'http://';
            }
          };

          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
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

          $scope.ok = function (genericMdtForm, genericMdt) {
            $scope.formSubmitted = true;
            if (genericMdtForm.$valid) {

              if ($scope.isEdit) {
                genericMdt.dateOfMeeting = new Date(genericMdt.dateOfMeeting);
                genericMdt.dateOfRequest = new Date(genericMdt.dateOfRequest);

                $scope.genericmdtUpdate($scope.patient.id, genericMdt);

              } else {
                genericMdt.dateOfMeeting = new Date(genericMdt.dateOfMeeting);
                genericMdt.dateOfMeeting.setMinutes(genericMdt.dateOfMeeting.getMinutes() - genericMdt.dateOfMeeting.getTimezoneOffset());

                genericMdt.dateOfRequest = new Date(genericMdt.dateOfRequest);
                genericMdt.dateOfRequest.setMinutes(genericMdt.dateOfRequest.getMinutes() - genericMdt.dateOfRequest.getTimezoneOffset());

                genericMdt.compositionId = '';
                genericMdt.source = 'openehr';

                $scope.genericmdtCreate($scope.patient.id, genericMdt);
              }

            }
          };

          $scope.cancel = function () {
            $scope.genericMdt = angular.copy(genericMdt);
            $uibModalInstance.dismiss('cancel');
          };

          let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: setCurrentPageData(state)
          }))(this);

          $scope.$on('$destroy', unsubscribe);

          $scope.genericmdtCreate = genericmdtActions.create;
          $scope.genericmdtUpdate = genericmdtActions.update;
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
GenericMdtModal.$inject = ['$uibModal', 'genericmdtActions', '$ngRedux', '$stateParams'];