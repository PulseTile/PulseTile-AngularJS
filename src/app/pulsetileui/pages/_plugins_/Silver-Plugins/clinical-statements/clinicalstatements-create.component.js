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
import * as helper from './clinicalstatements-helper';

let templateClinicalstatementsCreate = require('./clinicalstatements-create.html');
let _ = require('underscore');

class ClinicalstatementsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, usSpinnerService, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = clinicalstatementsActions.all;
    $scope.actionCreateDetail = clinicalstatementsActions.create;
    this.clinicalstatementsTags = clinicalstatementsActions.getTags;
    this.clinicalstatementsQuery = clinicalstatementsActions.query;

    this.clinicalstatementsTags($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source);

    this.clinicalStatement = $stateParams.source;
    $scope.statements = [];
    $scope.statementsText = [];
    $scope.tags = [];
    $scope.clinicalTag = '';
    $scope.clinicalStatementCreate = {};
    $scope.tempPhrases = {};
    $scope.clinicalStatementCreate.contentStore = {
      name: "ts",
      phrases: []
    };
    $scope.queryFilter = '';
    /* istanbul ignore next */
    this.getTag = function (tag) {
      $scope.clinicalTag = tag;
      $scope.queryFilter = '';
      this.clinicalstatementsQuery(null, tag);
    };
    /* istanbul ignore next */
    this.removeTag = function () {
      $scope.clinicalTag = '';
      $scope.queryFilter = '';
      $scope.statements = [];
      $scope.statementsText = [];
    };
    /* istanbul ignore next */
    this.goList = function () {
      $state.go('clinicalstatements', {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };
    /* istanbul ignore next */
    this.cancelEdit = function () {
      this.goList();
    };

    /* istanbul ignore next */
    $scope.confirmEdit = function (clinicalStatementForm, clinicalStatement) {
      $scope.formSubmitted = true;
      const tempEl = $('<div>');
      tempEl.html($('#clinicalNote').html());
      tempEl.find('.popover').remove();
      $scope.clinicalStatementCreate.text = tempEl.text();

      $scope.statements.length = 0;
      $scope.statementsText = [];
      $scope.clinicalTag = '';
      
      if (clinicalStatementForm.$valid) {
        $scope.clinicalStatementCreate.contentStore.phrases = [];
        for (var key in $scope.tempPhrases) {
          if ($scope.tempPhrases[key]) {
            $scope.clinicalStatementCreate.contentStore.phrases.push($scope.tempPhrases[key])
          }
        }
        $scope.actionCreateDetail($stateParams.patientId, $scope.clinicalStatementCreate);
      }
    }.bind(this);

    serviceFormatted.filteringKeys2 = ['phrase'];
    /* istanbul ignore next */
    $scope.queryFiltering = function (row) {
      return serviceFormatted.formattedSearching2(row, $scope.queryFilter);
    };

    $scope.filteringTags = function (item) {
      const str = item ? `${item.toString().toLowerCase()} ` : '';

      return str.indexOf($scope.queryFilter.replace(/&nbsp;/g, ' ').trim().toLowerCase() || '') !== -1
    };

    $scope.createMarkup = function (text, queryFilter) {
      const regular = new RegExp(`(${queryFilter.replace(/&nbsp;/g, ' ').trim()})`, 'gi');
      return text.replace(regular, '<b class="text-mark">$1</b>');
    };

    /* istanbul ignore next  */
    this.setCurrentPageData = function (store) {
      const state = store.clinicalstatements;

      if (state.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
        $scope.clinicalStatementCreate.dateCreated = new Date();
        $scope.clinicalStatementCreate.author = this.currentUser.email;
      }
      if (state.dataTags) {
        $scope.tags = state.dataTags;
      }
      if (state.searchData && $scope.clinicalTag.length) {
        $scope.statements = state.searchData;
        $scope.statementsText = _.map($scope.statements, function (el, index) {
          el.index = index;
          return el;
        });
      }
      usSpinnerService.stop("clinicalStatementDetail-spinner");
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);

    /* istanbul ignore next */
    $scope.changeSelect = function (index) {
      var userinput = jQuery('#clinicalNote');
      var statement = $scope.statementsText[index];
      var tagId = new Date().getTime();

      var phraseItem = {id: statement.id, tag: $scope.clinicalTag};
      $scope.tempPhrases[tagId] = phraseItem;
      // Parse inputs
      var inner = statement.phrase.replace(/(.*)(\{|\|)([^~|])(\}|\|)(.*)/, '$1<span class="editable" contenteditable="false" data-arr-subject="$1" editable-text data-arr-unit="$3" data-arr-value="$5">$3</span>$5');
      var html = '<span class="tag" data-tag-id="' + tagId + '" data-id="' + index + '" data-phrase="' + statement.phrase + '" contenteditable="false">' + inner + '. <a class="remove" contenteditable="false"><i class="fa fa-close" contenteditable="false"></i></a></span>';

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
      helper.removeTags('#clinicalNote', function (tagId) {
        $scope.tempPhrases[+tagId] = null;
      });
    };
    
  }
}

const ClinicalstatementsCreateComponent = {
  template: templateClinicalstatementsCreate,
  controller: ClinicalstatementsCreateController
};

ClinicalstatementsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'usSpinnerService', 'serviceRequests', 'serviceFormatted'];
export default ClinicalstatementsCreateComponent;
