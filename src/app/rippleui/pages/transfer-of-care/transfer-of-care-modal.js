export default function TransferOfCareModal($uibModal, $state, $stateParams, $window, transferOfCareActions, $ngRedux, allergiesActions, diagnosesActions, medicationsActions, contactsActions) {
  var isModalClosed = true;

  var openModal = function (patient, modal, transferOfCareCompositions, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./transfer-of-care-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance, $q) {
          $scope.patient = patient;
          $scope.transferOfCareCompositions = transferOfCareCompositions;
          $scope.modal = modal;
          $scope.currentUser = currentUser;
          $scope.siteFrom = 'WORCESTERSHIRE HEALTH AND CARE NHS TRUST';

          $scope.selectedItems = {
            allergies: [],
            contacts: [],
            medications: [],
            problems: []
          };

          $scope.transferDetail = {
            site: {}
          };

          $scope.transferOfCare = {};
          $scope.transferOfCare.allergies = {};
          $scope.transferOfCare.problems = {};
          $scope.transferOfCare.medication = {};
          $scope.transferOfCare.contacts = {};

          this.setCurrentPageData = function (data) {
            if (data.patients.data) {
              $scope.currentPatient = data.patients.data;
            }
            if (data.transferOfCare.data) {
              $scope.transferOfCare = data.transferOfCare.data;
              $scope.dateOfTransfer = data.transferOfCare.dateOfTransfer;
            }
            if (data.medication.data) {
              $scope.medications = data.medication.data;
              $scope.transferOfCare.medication = data.medication.data;
            }
            if (data.diagnoses.data) {
              $scope.problems = data.diagnoses.data;
              $scope.transferOfCare.problems = data.diagnoses.data;
            }
            if (data.allergies.data) {
              $scope.allergies = data.allergies.data;
              $scope.transferOfCare.allergies = data.allergies.data;
            }
            if (data.contacts.data) {
              $scope.transferOfCare.contacts = data.contacts.data;
              $scope.contacts = $scope.transferOfCare.contacts;
            }
            if (data.user.data) {
              $scope.currentUser = data.user.data;
            }
            if (data.transferOfCare.dataCreate !== null) {
              setTimeout(function () {
                confirmTransferOfCareSelections();
              }, 1000);
            }
          };

          $scope.allergiesLoad = allergiesActions.all;
          $scope.diagnosesLoad = diagnosesActions.all;
          $scope.medicationsLoad = medicationsActions.all;
          $scope.contactsLoad = contactsActions.all;

          $scope.selectTransferOfCareItem = function (selectedIndex, type) {
            if ($scope.selectedItems[type].indexOf(selectedIndex) !== -1) {
              $scope.selectedItems[type].splice($scope.selectedItems[type].indexOf(selectedIndex), 1);
            } else {
              $scope.selectedItems[type].push(selectedIndex);
            }
          };

          $scope.isItemSelected = function (index, type) {
            return $scope.selectedItems[type].indexOf(index) !== -1 ? 'transfer-of-care-green' : 'transfer-of-care-red';
          };

          $scope.isItemSelectedIcon = function (index, type) {
            return $scope.selectedItems[type].indexOf(index) !== -1 ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove';
          };

          $scope.getSelectedItItemsForSummary = function (transferOfCareForm) {
            $scope.formSubmitted = true;

            if (transferOfCareForm.$valid) {
              $scope.selectedItemsForSummary = updateTransferOfCare();

              $scope.selectedAllergies = $scope.selectedItemsForSummary.allergies;
              $scope.selectedContacts = $scope.selectedItemsForSummary.contacts;
              $scope.selectedProblems = $scope.selectedItemsForSummary.problems;
              $scope.selectedMedications = $scope.selectedItemsForSummary.medications;

              $scope.transferDetail.reasonForContact = !$scope.details.reasonForContact ? 'No reason specified' : $scope.details.reasonForContact;
              $scope.transferDetail.clinicalSummary = !$scope.details.clinicalSummary ? 'No clinical summary' : $scope.details.clinicalSummary;
              $scope.transferDetail.site.siteFrom = !$scope.siteFrom ? 'No site from' : $scope.siteFrom;
              $scope.transferDetail.site.siteTo = !$scope.details.siteTo ? 'No site to' : $scope.details.siteTo;
              $scope.transferDetail.site.patientId = $scope.patientId;

              $scope.toggleDetailView();
            }
          };

          function updateTransferOfCare() {
            let updatedTransferOfCare = angular.extend( {}, $scope.transferOfCare);

            delete updatedTransferOfCare.compositionId;

            for (var type in $scope.selectedItems) {
              switch (type) {
                case 'allergies':
                  break;
                case 'contacts':
                  break;
                case 'medications':
                  break;
                case 'problems':
                  for (var transferIndex = updatedTransferOfCare[type].length; transferIndex--;) {
                    var contains = false;
                    angular.forEach($scope.selectedItems[type], function (value) {
                      if (transferIndex === value) {
                        contains = true;
                      }
                    });

                    if (contains === false) {
                      updatedTransferOfCare[type].splice(transferIndex, 1);
                    }
                  }
                  break;
              }
            }
            return updatedTransferOfCare;
          }

          $scope.displayDetail = false;
          $scope.toggleDetailView = function () {
            $scope.displayDetail = !$scope.displayDetail;
          };

          $scope.dismiss = function () {
            $scope.$dismiss();

            $state.go('transferOfCare', {
              patientId: $scope.patient.id
            });
          };

          $scope.ok = function () {
            $scope.transferOfCare = updateTransferOfCare();

            $scope.transferOfCare.medication = $scope.transferOfCare.medications;
            delete $scope.transferOfCare.medications;
            $scope.transferOfCare.transferDetail = $scope.transferDetail;

            angular.forEach($scope.transferOfCare.allergies, function (value, key) {
              $scope.transferOfCare.allergies[key] = {
                allergy: value.cause,
                source: value.source,
                sourceId: value.sourceId
              };
            });

            angular.forEach($scope.transferOfCare.contacts, function (value, key) {
              $scope.transferOfCare.contacts[key] = {
                contactName: value.name,
                source: value.source,
                sourceId: value.sourceId
              };
            });

            angular.forEach($scope.transferOfCare.medication, function (value, key) {
              $scope.transferOfCare.medication[key] = {
                medication: value.name,
                source: value.source,
                sourceId: value.sourceId
              };
            });

            var todayDate = new Date();
            var toAdd = {
              allergies: $scope.transferOfCare.allergies,
              contacts: $scope.transferOfCare.contacts,
              medications: $scope.transferOfCare.medication,
              problems: $scope.transferOfCare.problems,
              clinicalSummary: $scope.transferDetail.clinicalSummary,
              dateOfTransfer: todayDate,
              reasonForContact: $scope.transferDetail.reasonForContact,
              siteFrom: 'WORCESTERSHIRE HEALTH AND CARE NHS TRUST',
              siteTo: $scope.details.siteTo,
              source: 'openehr',
              sourceId: ''
            };

            $scope.transferOfCareCreate($scope.patient.id, toAdd).then(function () {
              $scope.$close();
            });

            $scope.$close();
          };

          let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: this.setCurrentPageData(state)
          }))(this);
          $scope.$on('$destroy', unsubscribe);

          $scope.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.allergiesLoad(patient.id);
          $scope.diagnosesLoad(patient.id);
          $scope.medicationsLoad(patient.id);
          $scope.contactsLoad(patient.id);
          $scope.transferOfCareCreate = transferOfCareActions.create;
        }
      });
    }

    modalInstance.result.then(function(res) {
      isModalClosed = true;
    }, function(err) {
      isModalClosed = true;
    });

    function confirmTransferOfCareSelections() {
      $uibModal.open({
        template: require('./transfer-of-care-confirmation.html'),
        size: 'md',
        controller: function ($scope) {
          $scope.ok = function () {
            $scope.$close();
          };
        }
      }).result.finally(function () {
        setTimeout(function () {
          $state.go('transferOfCare', {
            patientId: patient.id,
            reportType: $stateParams.reportType,
            searchString: $stateParams.searchString,
            queryType: $stateParams.queryType
          });
        }, 1000);
      });
    }

  };

  return {
    isModalClosed: isModalClosed,
    openModal: openModal
  };
}
TransferOfCareModal.$inject = ['$uibModal', '$state', '$stateParams', '$window','transferOfCareActions', '$ngRedux', 'allergiesActions', 'diagnosesActions', 'medicationsActions', 'contactsActions'];