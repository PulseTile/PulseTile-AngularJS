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

// Todo - Use a service to get the latest tag names
const TAG_NAMES = [
  "PC", "XM", "Ix", "Vitals", "Rx", "Ortho", "Dx", "Meds", "MH", "HA", "Shoulder"
]

class ClinicalstatementsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, usSpinnerService, serviceRequests) {
    this.clinicalStatement = $stateParams.source;
    $scope.statements = [
      {"id":1,"phrase":"Presented with Shoulder Pain"},
      {"id":2,"phrase":"Pain is of 6 months"},
      {"id":4,"phrase":"Pain is right side"},
      {"id":5,"phrase":"Pain is left side"},
      {"id":3,"phrase":"Onset is from a fall"},
      {"id":7,"phrase":"Internal rotation to 30 degrees"},
      {"id":8,"phrase":"Internal rotation to 45 degrees"},
      {"id":9,"phrase":"Internal rotation to |?| degrees"},
      {"id":10,"phrase":"Abduction to 30 degrees"},
      {"id":11,"phrase":"Abduction to 45 degrees"},
      {"id":12,"phrase":"Xray shows early OsteoArthritis change"},
      {"id":13,"phrase":"Utrasound shows rotator cuff tear"},
      {"id":14,"phrase":"Plan is physio for 3 sessions"},
      {"id":15,"phrase":"If doesn't improve, will need laparoscopic surgical exploration +/- repair"},
      {"id":16,"phrase":"Presented with Knee Pain"}
    ];
    $scope.statementsText = _.map($scope.statements, function (el) {
      return el.phrase;
    });


    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
        $scope.clinicalStatementEdit = Object.assign({}, this.clinicalStatement);
        $scope.clinicalStatementEdit.dateCreated = new Date();
        $scope.clinicalStatementEdit.author = this.currentUser.email;
      }
      // if (data.clinicalStatements.dataGet) {
      //   this.clinicalStatement = data.clinicalStatements.dataGet;
      //   this.statementsText = _.map(this.clinicalStatement.statements, helper.toText);
      // }
      usSpinnerService.stop("clinicalStatementDetail-spinner");
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
      
      // let toAdd = {
      //   // code: $scope.clinicalStatement.code,
      //   dateOfOnset: $scope.clinicalStatement.dateOfOnset.toISOString().slice(0, 10),
      //   description: $scope.clinicalStatement.description,
      //   problem: $scope.clinicalStatement.problem,
      //   source: $scope.clinicalStatement.source,
      //   sourceId: '',
      //   terminology: $scope.clinicalStatement.terminology
      // };
      if (clinicalStatementForm.$valid) {
        this.goList();
      //   $scope.isEdit = false;
      //   clinicalStatement = Object.assign(clinicalStatement, $scope.clinicalStatementEdit);
      //   $scope.diagnosesUpdate($scope.patient.id, toAdd);
      }
    }.bind(this);


    var keys = new Array();
    // Add Dropdown to Input (select or change value)
    $scope.cc = 0;
    $scope.clickSelect = function () {
      console.log('clickSelect');
      $scope.cc++;
      if ($scope.cc == 2) {
        // $(this).change();
        $scope.cc = 0;
      }
    };
    $scope.atemp = 'lalalala';
    $scope.changeSelect = function () {
      console.log('changeSelect');
      var userinput = jQuery('#clinicalNote');
      var id = $scope.clinicalStatementEdit.search;
      var phrase = $scope.statementsText[id];

      // Parse inputs
      var inner = phrase.replace(/(.*)(\{|\|)([^~|])(\}|\|)(.*)/, '$1<span class="editable" contenteditable="false" data-arr-subject="$1" editable-text="atemp" data-arr-unit="$3" data-arr-value="$5">$3</span>$5');
      var html = '<span class="tag" data-id="' + id + '" data-phrase="' + phrase + '" contenteditable="false">' + inner + '. <a class="remove" contenteditable="false"><i class="fa fa-close" contenteditable="false"></i></a></span>';
      console.log('userinput');
      console.log(userinput);
      pasteHtmlAtCaret(html, userinput);

      // Apply Editable
      $('span.tag .editable').editable({
        type: 'text',
        title: 'Edit Text',
        success: function(response, newValue) {
          //userModel.set('username', newValue); //update backbone model
        },
        //mode: 'inline'
      });

      // Bind Remove to tag
      removeTags('#clinicalNote');

      $scope.cc = -1;
    };





    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalstatementsLoad = clinicalstatementsActions.get;
    this.clinicalstatementsLoad($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source);





    jQuery(document).ready(function(){
      // Update Structure Data as user types
      $('#update').click(function(e){
        e.preventDefault();
        var userinput = $('#clinicalNote');
        // Store Structured
        setStructured(userinput);
      });
      // Remove tags on click
      // removeTags('#clinicalNote');
    });

    function removeTags(userinput){
      // Bind remove events
      $(userinput).find('a.remove').each(function(){
        // Remove binding is already assigned
        $(this).unbind('click');

        // Re-bind
        $(this).click(function(){
          $(this).closest('span').remove();

          // Store Structured
          setStructured(userinput);
        });
      });


    }


    function setStructured(userinput){
      // Parse the text box for all tags
      var tags = [];
      $(userinput).contents().each(function(){

        // Is it a tag?
        if( $(this).hasClass('tag') ){

          var editable = $(this).find('.editable');
          // console.log('editable');
          // console.log(editable);
          if( $(editable).length > 0 ){
            // Contains structured data
            var newTag = {
              id: $(this).attr('data-id'),
              //subject: editable.attr('data-arr-subject'),
              value: editable.html(),
              //value: editable.attr('data-arr-value')
              //phrase: $(this).attr('data-phrase')
            }
          } else {
            // Just a typed phrase
            var newTag = {
              id: $(this).attr('data-id')
              //subject: $(this).attr('data-phrase'),
              //unit: '',
              //value: '',
              //phrase: $(this).attr('data-phrase')
            }
          }

          // Found in array
          var found = false;

          if( !found ){
            tags.push(newTag);
          }

        } else if( this.wholeText.trim() != '' )  {
          // It's text

          var newTag = {
            //subject: this.wholeText,
            //unit: '',
            //value: '',
            phrase: this.wholeText
          }

          tags.push(newTag);

        }

      });

      //Update the structured box for output
      $( '#' + $(userinput).attr('data-structured') ).val( JSON.stringify(tags) );

      $('#plain-data').val( strip($(userinput).html()) );

    }

    // Credit: http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
    function pasteHtmlAtCaret(html, target) {

      // SG: Switch focus to target before inserting
      target.focus();

      var sel, range;
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

          // Range.createContextualFragment() would be useful here but is
          // only relatively recently standardized and is not supported in
          // some browsers (IE9, for one)
          var el = document.createElement("div");
          el.innerHTML = html + ' ';
          var frag = document.createDocumentFragment(), node, lastNode;
          while ( (node = el.firstChild) ) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);
          //console.log( range );

          // Preserve the selection
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
      }
    }

    function strip(html){
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      console.log( tmp.textContent||tmp.innerText );
      return tmp.textContent||tmp.innerText;

      /*
       var regex = /(<([^>]+)>)/ig
       var body = html
       var result = body.replace(regex, "").trim();

       return result;
       */
    }
  }
}

const ClinicalstatementsCreateComponent = {
  template: templateClinicalstatementsCreate,
  controller: ClinicalstatementsCreateController
};

ClinicalstatementsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'usSpinnerService', 'serviceRequests'];
export default ClinicalstatementsCreateComponent;
