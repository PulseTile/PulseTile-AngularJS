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
export default function AdvancedSearch($uibModal, $http, $ngRedux, searchActions) {
  var isModalClosed = true;

  var openAdvancedSearch = function(expression) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('../rippleui/search/advanced-search-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, modal, searchParams, AdvancedSearch, $uibModalInstance) {
          var changeState = function () {
            $scope.formSubmitted = true;
            $uibModalInstance.close();

            if ($scope.patients.length == 1) {
              $state.go('patients-summary', {
                patientId: $scope.patients[0].nhsNumber
              });
            } else if ($scope.patients.length > 1) {
              $state.go('patients-list', {
                patientsList: $scope.patients,
                advancedSearchParams: $scope.searchParams
              });
            } else {
              $state.go('patients-list', {
                patientsList: $scope.patients,
                advancedSearchParams: $scope.searchParams,
                displayEmptyTable: true
              });
            }
          };

          $scope.modal = modal;
          $scope.searchParams = searchParams;
          $scope.formSubmitted = false;
          $scope.detailsFocused = false;
          $scope.modalReopened = false;

          if ($scope.searchParams.nhsNumber) {
            $scope.nhsNumberFocus = true;
          }
          else if ($scope.searchParams.surname) {
            $scope.surnameFocus = true;
          }
          else {
            $scope.nhsNumberFocus = true;
          }

          if ($scope.searchParams.dateOfBirth) {
            $scope.searchParams.dateOfBirth = new Date($scope.searchParams.dateOfBirth).toISOString().slice(0, 10);
            $scope.detailsFocused = true;
            $scope.modalReopened = true;
          }

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.getResult = function (result) {
            $scope.patients = result.data;

            if ($scope.patients) {
              changeState();
            }
          };

          $scope.ok = function (searchForm) {
            if ($scope.searchParams.nhsNumber) {
              $scope.searchParams.nhsNumber = $scope.searchParams.nhsNumber.replace(/\s+/g, '');
            }

            if (searchForm.$valid) {
              AdvancedSearch.searchByDetails($scope.searchParams);

              let unsubscribe = $ngRedux.connect(state => ({
                setResult: $scope.getResult(state.search)
              }))(this);

              $scope.$on('$destroy', unsubscribe);
            }
          };

          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.isNhsNumberRequired = function (advancedSearchForm) {
            var nhsNumber = $scope.advancedSearchForm.nhsNumber.$viewValue;

            if (nhsNumber === undefined && $scope.areDetailsFieldsClean(advancedSearchForm)) {
              return true;
            }

            nhsNumber = nhsNumber.replace(/\s+/g, '');

            var nhsNumberInvalid = isNaN(nhsNumber) || (advancedSearchForm.nhsNumber.$invalid && nhsNumber.length === 0);

            return nhsNumberInvalid && $scope.areDetailsFieldsClean(advancedSearchForm);
          };

          $scope.isNhsNumberTooShort = function (value) {
            if (value === undefined) {
              return false;
            }

            var nhsNumber = value.replace(/\s+/g, '');

            return !isNaN(nhsNumber) && nhsNumber.length > 0 && nhsNumber.length < 10;
          };

          $scope.isNhsNumberTooLong = function (value) {
            if (value === undefined) {
              return false;
            }

            var nhsNumber = value.replace(/\s+/g, '');

            return !isNaN(nhsNumber) && nhsNumber.length > 10;
          };

          $scope.isNhsNumberFieldInvalid = function (nhsNumberField) {
            return nhsNumberField.$invalid || nhsNumberField.$pristine;
          };

          $scope.areDetailsFieldsClean = function (advancedSearchForm) {
            var surname = advancedSearchForm.surname;
            var forename = advancedSearchForm.forename;
            var dateOfBirth = advancedSearchForm.dateOfBirth;

            var surnameClean = surname.$invalid || !$scope.searchParams.surname || $scope.searchParams.surname === '';
            var forenameClean = forename.$invalid || !$scope.searchParams.forename || $scope.searchParams.forename === '';
            var dateOfBirthClean = dateOfBirth.$invalid || !$scope.searchParams.dateOfBirth || $scope.searchParams.dateOfBirth === '';

            return surnameClean && forenameClean && dateOfBirthClean;
          };
        },
        resolve: {
          modal: function() {
            return {
              title: 'Advanced Search'
            };
          },
          searchParams: function() {
            var params = {};
            if (!isNaN(expression)) {
              params.nhsNumber = expression;
            } else {
              params.surname = expression;
            }

            return params;
          }
        }
      });
    }

    modalInstance.result.then(function() {
      isModalClosed = true;
    }, function() {
      isModalClosed = true;
    });
  };

  var searchByDetails = function (queryParams) {
    if (queryParams.dateOfBirth) {
      queryParams.dateOfBirth = new Date(queryParams.dateOfBirth.getTime() - (60000 * queryParams.dateOfBirth.getTimezoneOffset()));
    }
    this.searchResult = searchActions.advancedSearch;
    this.searchResult(queryParams);
  };

  return {
    isModalClosed: isModalClosed,
    openAdvancedSearch: openAdvancedSearch,
    searchByDetails: searchByDetails
  };
}

AdvancedSearch.$inject = ['$uibModal', '$http', '$ngRedux', 'searchActions'];
