/*
   ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
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

class SearchAdvancedController {
  constructor($scope, serviceRequests, $state, $timeout, $rootScope, serviceFormatted) {
    $scope.typeOfGroupOfFieldsOfSearches = '';
    $scope.selectAgeField = 'range';
    $scope.isOpenPanelSearch = true;
    $scope.isSearchCompleted = false;

    $scope.formSubmitted = false;
    this.detailsFocused = false;
    $scope.searchParams = {};
    $scope.agesSteps = [];

    this.typesList = [];
    this.queryList = [
      'contains', 
      // 'excludes'
    ];
    this.typesList = [
      {
        name: 'Allergies',
        key: 'allergies'
      }, {
        name: 'Problems / Diagnosis',
        key: 'diagnosis'
      }, {
        name: 'Procedures',
        key: 'procedures'
      }, {
        name: 'Medications',
        key: 'medications'
      }
    ];

    $scope.changeParams = function (type) {
      $scope.typeOfGroupOfFieldsOfSearches = type;
    }

    $scope.cancel = function () {
      serviceRequests.publisher('closeAdvancedSearch', {});
    };

    serviceRequests.subscriber('openSearchPanel', function () {
      $scope.isOpenPanelSearch = true;
    });

    $scope.clearSearchParams = function () {
      $scope.selectAgeField = 'range';
      $scope.searchParams = {};
      $scope.searchParams.query = this.queryList[0];
    }.bind(this);
    $scope.clearSearchParams();

    serviceRequests.subscriber('clearSearchParams', $scope.clearSearchParams);

    /* istanbul ignore next */
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

      if (params.queryContains && params.queryText) {
        paramsArr.push({
          key: 'Search Query',
          value: 'contains "' + params.queryText + '"'
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
    };

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
      }, 100);
    };

    $scope.refreshSlider();
    
    if ($scope.searchParams.surname) {
      $scope.surnameFocus = true;
    }
    else {
      $scope.nhsNumberFocus = true;
    }

    // if ($scope.searchParams.dateOfBirth) {
    //   $scope.searchParams.dateOfBirth = new Date($scope.searchParams.dateOfBirth).getTime();
    //   this.detailsFocused = true;
    // }

    $scope.ok = function (searchForm) {
      var sendData = {};

      $scope.formSubmitted = true;

      /* istanbul ignore if */
      if (searchForm.$valid) {
        $scope.formSubmitted = false;
        $scope.isSearchCompleted = true;

        if ($scope.searchParams.nhsNumber) {
          $scope.searchParams.nhsNumber = $scope.searchParams.nhsNumber.replace(/\s+/g, '');
        }
        if (!$scope.searchParams.sexMale) {
          $scope.searchParams.sexMale = false;
        }
        if (!$scope.searchParams.sexFemale) {
          $scope.searchParams.sexFemale = false;
        }

        if ($scope.typeOfGroupOfFieldsOfSearches === 'nhsNumber') {

          sendData.nhsNumber = $scope.searchParams.nhsNumber;

        } else {

          if ($scope.typeOfGroupOfFieldsOfSearches === 'advanced') {
            sendData.forename = $scope.searchParams.forename;
            sendData.surname = $scope.searchParams.surname;

          } else if ($scope.typeOfGroupOfFieldsOfSearches === 'clinicalQuery') {
            sendData.type = $scope.searchParams.type;
            sendData.queryContains = $scope.searchParams.query ? true : false;
            sendData.queryText = $scope.searchParams.queryText;
          }

          if ($scope.selectAgeField === 'range') {
            
            sendData.minValue = $scope.sliderRange.minValue;
            sendData.maxValue = $scope.sliderRange.maxValue;
          } else {
            sendData.dateOfBirth = $scope.searchParams.dateOfBirth;
          }
          
          sendData.sexMale = $scope.searchParams.sexMale;
          sendData.sexFemale = $scope.searchParams.sexFemale;
        }

        if ($scope.typeOfGroupOfFieldsOfSearches === 'clinicalQuery') {
          $state.go('search-report', {
            searchParams: sendData,
            searchString: JSON.stringify(sendData),
          });
        } else {
          $state.go('patients-list-full', {
            queryType: this.option.type,
            searchParams: sendData,
            searchString: JSON.stringify(sendData),
          });
        }
      }
    }.bind(this);  

    $scope.isNhsNumberRequired = function (advancedSearchForm) {
      var nhsNumber = $scope.advancedSearchForm.nhsNumber.$viewValue;
      /* istanbul ignore if */
      if (nhsNumber === undefined) {
        return true;
      }

      nhsNumber = nhsNumber.replace(/\s+/g, '');

      var nhsNumberInvalid = isNaN(nhsNumber) || (advancedSearchForm.nhsNumber.$invalid && nhsNumber.length === 0);

      return nhsNumberInvalid;
    };

    $scope.isNhsNumberTooShort = function (value) {
      /* istanbul ignore if */
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

    // $scope.areDetailsFieldsClean = function (advancedSearchForm) {
    //   var surname = advancedSearchForm.surname;
    //   var forename = advancedSearchForm.forename;
    //   // var dateOfBirth = advancedSearchForm.dateOfBirth;

    //   var surnameClean = surname.$invalid || !$scope.searchParams.surname || $scope.searchParams.surname === '';
    //   var forenameClean = forename.$invalid || !$scope.searchParams.forename || $scope.searchParams.forename === '';
    //   // var dateOfBirthClean = dateOfBirth.$invalid || !$scope.searchParams.dateOfBirth || $scope.searchParams.dateOfBirth === '';

    //   return surnameClean && forenameClean;
    // };

    var queryOption = this.option;

    $rootScope.$on('$locationChangeStart', function() {
      var currentState = $state.router.globals.$current.name;
      $scope.isOpenPanelSearch = false;

      if ($scope.isSearchCompleted &&
          currentState !== 'patients-list-full' &&
          currentState !== 'search-report') {
        $scope.isSearchCompleted = false;
        $scope.clearSearchParams();
        serviceRequests.publisher('closeAdvancedSearch');
      }
    });

    $scope.$watch('sliderRange.minValue', function() {
      $scope.changeParams(this.option.type);
    }.bind(this));
    $scope.$watch('sliderRange.maxValue', function() {
      $scope.changeParams(this.option.type);
    }.bind(this));
  }
}

const SearchAdvancedComponent = {
  bindings: {
    option: '='
  },
  template: templateSearch,
  controller: SearchAdvancedController
};

SearchAdvancedController.$inject = ['$scope', 'serviceRequests', '$state', '$timeout', '$rootScope', 'serviceFormatted'];
export default SearchAdvancedComponent;