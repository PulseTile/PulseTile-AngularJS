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
import * as helper from './clinicalstatements-helper';

let templateClinicalstatementsCreate = require('./clinicalstatements-create.html');
let _ = require('underscore');

class ClinicalstatementsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, usSpinnerService, serviceRequests, serviceFormatted) {

    this.clinicalStatement = $stateParams.source;
    $scope.statements = [];
    $scope.statementsText = [];
    $scope.tags = [];
    $scope.clinicalTag = '';
    $scope.clinicalStatementCreate = {};
    $scope.clinicalStatementCreate.contentStore = {
      name: "ts",
      phrases: []
    };
    $scope.queryFilter = '';
    $scope.openSearch = false;
    
    /* istanbul ignore next  */
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
        $scope.clinicalStatementCreate.dateCreated = new Date();
        $scope.clinicalStatementCreate.author = this.currentUser.email;
      }
      if (data.clinicalstatements.dataTags) {
        $scope.tags = data.clinicalstatements.dataTags;
      }
      if (data.clinicalstatements.searchData && $scope.clinicalTag.length) {
        $scope.statements = data.clinicalstatements.searchData;
        $scope.statementsText = _.map($scope.statements, function (el, index) {
          el.index = index;
          return el;
        });
      }
      usSpinnerService.stop("clinicalStatementDetail-spinner");
    };

    this.getTag = function (tag) {
      $scope.clinicalTag = tag;
      $scope.queryFilter = '';
      this.clinicalstatementsQuery(null, tag);
    };

    this.removeTag = function () {
      $scope.clinicalTag = '';
      $scope.queryFilter = '';
      $scope.statements = [];
      $scope.statementsText = [];
    };

    this.goList = function () {
      $state.go('clinicalstatements', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    this.cancelEdit = function () {
      this.goList();
    };

    $scope.confirmEdit = function (clinicalStatementForm, clinicalStatement) {
      $scope.formSubmitted = true;
      var userinput = $('#clinicalNote');
      function cb(text) {
        $scope.clinicalStatementCreate.text = text;
      }
      helper.setStructured(userinput, cb);  
      
      $scope.statements.length = 0;
      $scope.statementsText = [];
      $scope.clinicalTag = '';
      
      if (clinicalStatementForm.$valid) {
        this.clinicalstatementsCreate($stateParams.patientId, $scope.clinicalStatementCreate);
        this.goList();
      }
    }.bind(this);

    serviceFormatted.filteringKeys2 = ['phrase'];
    $scope.queryFiltering = function (row) {
      return serviceFormatted.formattedSearching2(row, $scope.queryFilter);
    };
    
    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalstatementsTags = clinicalstatementsActions.getTags;
    this.clinicalstatementsQuery = clinicalstatementsActions.query;
    this.clinicalstatementsCreate = clinicalstatementsActions.create;
    this.clinicalstatementsTags($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source);

    // Add Dropdown to Input (select or change value)
    $scope.cc = 0;
    $scope.clickSelect = function () {
      $scope.cc++;
      if ($scope.cc == 2) {
        // $(this).change();
        $scope.cc = 0;
      }
    };

    $scope.changeSelect = function (index) {
      var userinput = jQuery('#clinicalNote');
      var statement = $scope.statementsText[index];

      var phraseItem = {id: statement.id, tag: $scope.clinicalTag};
      $scope.clinicalStatementCreate.contentStore.phrases.push(phraseItem);
      // Parse inputs
      var inner = statement.phrase.replace(/(.*)(\{|\|)([^~|])(\}|\|)(.*)/, '$1<span class="editable" contenteditable="false" data-arr-subject="$1" editable-text data-arr-unit="$3" data-arr-value="$5">$3</span>$5');
      var html = '<span class="tag" data-id="' + index + '" data-phrase="' + statement.phrase + '" contenteditable="false">' + inner + '. <a class="remove" contenteditable="false"><i class="fa fa-close" contenteditable="false"></i></a></span>';

      helper.pasteHtmlAtCaret(html, userinput);
      // Apply Editable
      $('span.tag .editable').editable({
        type: 'text',
        title: 'Edit Text',
        success: function(response, newValue) {
          phraseItem.value = newValue;
        }
      });

      // Bind Remove to tag
      helper.removeTags('#clinicalNote');

      $scope.cc = -1;
    };
    
  }
}

const ClinicalstatementsCreateComponent = {
  template: templateClinicalstatementsCreate,
  controller: ClinicalstatementsCreateController
};

ClinicalstatementsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'usSpinnerService', 'serviceRequests', 'serviceFormatted'];
export default ClinicalstatementsCreateComponent;
