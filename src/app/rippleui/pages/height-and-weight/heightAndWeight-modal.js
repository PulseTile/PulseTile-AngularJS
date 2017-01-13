export default function HeightAndWeightModal($uibModal, heightAndWeightActions, $ngRedux, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, heightAndWeight) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./heightAndWeight-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          var updateId = function (sourceId) {
            var sourceArr = sourceId.split('::');
            var newVersionNumber = parseInt(sourceArr[2]) + 1;
            var newId = sourceArr[0] + '::' + sourceArr[1] + '::' + newVersionNumber;
            return newId;
          };

          $scope.heightAndWeight = heightAndWeight;
          $scope.patient = patient;
          $scope.modal = modal;

          if (modal.title === 'Edit Height And Weight'){
            $scope.isEdit = true;
            $scope.heightAndWeight.heightRecorded = new Date($scope.heightAndWeight.heightRecorded).toISOString().slice(0, 10);
            $scope.heightAndWeight.weightRecorded = new Date($scope.heightAndWeight.weightRecorded).toISOString().slice(0, 10);
          }else {
            $scope.isEdit = false;
            $scope.heightAndWeight.heightRecorded = new Date().toISOString().slice(0, 10);
            $scope.heightAndWeight.weightRecorded = new Date().toISOString().slice(0, 10);
          }

          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.ok = function (heightAndWeightForm, heightAndWeight) {
            $scope.formSubmitted = true;

            if (heightAndWeightForm.$valid) {
              heightAndWeight.heightRecorded = new Date(heightAndWeight.heightRecorded);
              heightAndWeight.weightRecorded = new Date(heightAndWeight.weightRecorded);

              var toAdd = {
                sourceId: heightAndWeight.sourceId ? heightAndWeight.sourceId: '',
                height: heightAndWeight.height,
                weight: heightAndWeight.weight,
                heightRecorded : heightAndWeight.heightRecorded,
                weightRecorded : heightAndWeight.weightRecorded,
                source: heightAndWeight.source
              };

              $uibModalInstance.close(heightAndWeight);

              if ($scope.isEdit) {
                $scope.heightAndWeightUpdate($scope.patient.id, toAdd);
                setTimeout(function () {
                  $state.go('heightAndWeights-detail', {
                    patientId: $scope.patient.id,
                    heightAndWeightIndex: updateId(heightAndWeight.sourceId),
                    page: $scope.currentPage,
                    reportType: $stateParams.reportType,
                    searchString: $stateParams.searchString,
                    queryType: $stateParams.queryType
                  });
                }, 1000);
              } else {
                $scope.heightAndWeightCreate($scope.patient.id, toAdd);
                setTimeout(function () {
                  $state.go('heightAndWeights', {
                    patientId: $scope.patient.id,
                    filter: $scope.query,
                    page: $scope.currentPage,
                    reportType: $stateParams.reportType,
                    searchString: $stateParams.searchString,
                    queryType: $stateParams.queryType
                  }, {
                    reload: true
                  });
                }, 1000);
              }

            }
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.heightAndWeightCreate = heightAndWeightActions.create;
          $scope.heightAndWeightUpdate = heightAndWeightActions.update;
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
HeightAndWeightModal.$inject = ['$uibModal', 'heightAndWeightActions', '$ngRedux', '$stateParams'];