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
let templateSearch = require('./search-advanced.html');
import plugins from '../../plugins';

class SearchAdvancedController {
  constructor($scope, $http, $ngRedux, serviceRequests, searchActions, $state, $timeout, ConfirmationModal, $rootScope, serviceFormatted) {
    $scope.selectAgeField = 'range';
    $scope.isOpenPanelSearch = true;
    $scope.isSearchCompleted = false;

    $scope.formSubmitted = false;
    this.detailsFocused = false;
    $scope.searchParams = {};
    $scope.agesSteps = [];

    $scope.cancel = function () {
      serviceRequests.publisher('closeAdvancedSearch', {});
    };

    serviceRequests.subscriber('openSearchPanel', function () {
      $scope.isOpenPanelSearch = true;
    });

    $scope.clearSearchParams = function () {
      $scope.selectAgeField = 'range';
      $scope.searchParams = {};
    };

    serviceRequests.subscriber('clearSearchParams', $scope.clearSearchParams);


    $scope.getSearchParams = function (params) {
      var paramsText = '';
      var paramsArr = [];

      if (params.nhsNumber) {
        paramsArr.push({
          key: 'nhsNumber',
          value: params.nhsNumber
        });
      }

      if (params.surname) {
        paramsArr.push({
          key: 'Last Name',
          value: params.surname
        });
      }

      if (params.forename) {
        paramsArr.push({
          key: 'First Name',
          value: params.forename
        });
      }

      if (params.type) {
        paramsArr.push({
          key: 'Search Type',
          value: params.type
        });
      }

      if (params.query && params.queryNext) {
        paramsArr.push({
          key: 'Search Query',
          value: params.query + ' ' + params.queryNext
        });
      }

      if ($scope.selectAgeField == 'range') {
        paramsArr.push({
          key: 'Age Range',
          value: $scope.sliderRange.minValue + '-' + $scope.sliderRange.maxValue
        });
      } else {
        if (params.dateOfBirth) {
          paramsArr.push({
            key: 'Date of Birth',
            value: serviceFormatted.formattingDate(params.dateOfBirth, serviceFormatted.formatCollection.DDMMMYYYY)
          });
        }
      }

      if (params.sexFemale || params.sexMale) {
        let genderText = '';

        if (params.sexFemale && params.sexMale) {
          genderText = 'All';
        } else if (params.sexFemale) {
          genderText = 'Female';
        } else {
          genderText = 'Male';
        }

        paramsArr.push({
          key: 'Gender',
          value: genderText
        });
      }

      for (var i = 0; i < paramsArr.length; i++) {
        if (i !== 0) {
          paramsText += ', ';
        }

        paramsText += paramsArr[i].key + ': ' + paramsArr[i].value;
      }
      

      return paramsText.length ? ': ' + paramsText : '';
    }

    this.typesList = [];
    this.queryList = ['contains' , 'excludes'];
    
    plugins.forEach((plugin)=>{
      /* istanbul ignore if  */
      if (!Object.keys(plugin.sidebarInfo).length) return;
      this.typesList.push(plugin.sidebarInfo);
    });


    var step;
    for (var i = 0; i < 100; i += 5) {
      step = {
        value: i
      };
      if (i % 10 === 0) {
        step.legend = i.toString();
      }
      $scope.agesSteps.push(step);
    }
    $scope.agesSteps.push({
      value: 100,
      legend: '100+'
    });

    $scope.sliderRange = {
      minValue: 0,
      maxValue: 100,
      options: {
        floor: 0,
        ceil: 100,
        step: 5,
        showTicks: true,
        showTicksValues: false,
        stepsArray: $scope.agesSteps
      },

    };

    $scope.refreshSlider = function () {
      $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
      });
    };

    $scope.refreshSlider();
    
    if ($scope.searchParams.surname) {
      $scope.surnameFocus = true;
    }
    else {
      $scope.nhsNumberFocus = true;
    }

    // if ($scope.searchParams.dateOfBirth) {
    //   $scope.searchParams.dateOfBirth = new Date($scope.searchParams.dateOfBirth).toISOString().slice(0, 10);
    //   this.detailsFocused = true;
    // }

    $scope.ok = function (searchForm) {
      $scope.isOpenPanelSearch = false;
      $scope.formSubmitted = true;

      /* istanbul ignore if */
      if (searchForm.$valid) {
        $scope.isSearchCompleted = true;
        if ($scope.searchParams.nhsNumber) {
          $scope.searchParams.nhsNumber = $scope.searchParams.nhsNumber.replace(/\s+/g, '');
        }

        $state.go('patients-list-full', {
          queryType: queryOption.type,
          searchParams: $scope.searchParams,
        });
      }
    };  

    $scope.isNhsNumberRequired = function (advancedSearchForm) {
      var nhsNumber = $scope.advancedSearchForm.nhsNumber.$viewValue;
      var areDetailsFieldsClean = $scope.areDetailsFieldsClean(advancedSearchForm);

      if (nhsNumber === undefined && areDetailsFieldsClean) {
        return true;
      }

      nhsNumber = nhsNumber.replace(/\s+/g, '');

      var nhsNumberInvalid = isNaN(nhsNumber) || (advancedSearchForm.nhsNumber.$invalid && nhsNumber.length === 0);

      return nhsNumberInvalid && areDetailsFieldsClean;
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
      // var dateOfBirth = advancedSearchForm.dateOfBirth;

      var surnameClean = surname.$invalid || !$scope.searchParams.surname || $scope.searchParams.surname === '';
      var forenameClean = forename.$invalid || !$scope.searchParams.forename || $scope.searchParams.forename === '';
      // var dateOfBirthClean = dateOfBirth.$invalid || !$scope.searchParams.dateOfBirth || $scope.searchParams.dateOfBirth === '';

      return surnameClean && forenameClean;
    };

    var queryOption = this.option;

    $rootScope.$on('$locationChangeStart', function() {
      var currentState = $state.router.globals.$current.name;
      $scope.isOpenPanelSearch = false;

      if ($scope.isSearchCompleted &&
          currentState !== 'patients-list-full') {
        $scope.isSearchCompleted = false;
        $scope.clearSearchParams();
        serviceRequests.publisher('closeAdvancedSearch');
      }
    });
  }
}

const SearchAdvancedComponent = {
  bindings: {
    option: '='
  },
  template: templateSearch,
  controller: SearchAdvancedController
};

SearchAdvancedController.$inject = ['$scope', '$http', '$ngRedux', 'serviceRequests', 'searchActions', '$state', '$timeout', 'ConfirmationModal', '$rootScope', 'serviceFormatted'];
export default SearchAdvancedComponent;