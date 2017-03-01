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

let templateClinicalstatementsDetail = require('./clinicalstatements-detail.html');
let _ = require('underscore');

class ClinicalstatementsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, serviceRequests, usSpinnerService) {
    
    $scope.isEdit = false;
    /*
      TODO: Only for demo
    */
    this.clinicalStatement = $stateParams.source;
    var statements = [{"id":1,"phrase":"Presented with Shoulder Pain"},{"id":2,"phrase":"Pain is of 6 months"},{"id":4,"phrase":"Pain is right side"},{"id":5,"phrase":"Pain is left side"},{"id":3,"phrase":"Onset is from a fall"},{"id":7,"phrase":"Internal rotation to 30 degrees"},{"id":8,"phrase":"Internal rotation to 45 degrees"},{"id":9,"phrase":"Internal rotation to |?| degrees"},{"id":10,"phrase":"Abduction to 30 degrees"},{"id":11,"phrase":"Abduction to 45 degrees"},{"id":12,"phrase":"Xray shows early OsteoArthritis change"},{"id":13,"phrase":"Utrasound shows rotator cuff tear"},{"id":14,"phrase":"Plan is physio for 3 sessions"},{"id":15,"phrase":"If doesn't improve, will need laparoscopic surgical exploration +/- repair"},{"id":16,"phrase":"Presented with Knee Pain"}]


    this.setCurrentPageData = function (data) {
      // if (data.patientsGet.data) {
      //   this.currentPatient = data.patientsGet.data;
      // }
      // if (data.clinicalStatements.dataGet) {
      //   this.clinicalStatement = data.clinicalStatements.dataGet;
      //   this.statementsText = _.map(this.clinicalStatement.statements, helper.toText);
      // }
      this.statementsText = _.map(statements, helper.toText);
      // usSpinnerService.stop("clinicalStatementDetail-spinner");
    };

    this.edit = function () {
      $scope.isEdit = true;
      $scope.clinicalStatementEdit = Object.assign({}, this.clinicalStatement);
      $scope.clinicalStatementEdit.dateCreated = new Date(this.clinicalStatement.dateCreated);
    };
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    $scope.confirmEdit = function (clinicalStatementForm, clinicalStatement) {
      $scope.formSubmitted = true;

      let toAdd = {
        code: $scope.clinicalStatement.code,
        dateOfOnset: $scope.clinicalStatement.dateOfOnset.toISOString().slice(0, 10),
        description: $scope.clinicalStatement.description,
        problem: $scope.clinicalStatement.problem,
        source: $scope.clinicalStatement.source,
        sourceId: '',
        terminology: $scope.clinicalStatement.terminology
      };
      if (clinicalStatementForm.$valid) {
        $scope.isEdit = false;
        clinicalStatement = Object.assign(clinicalStatement, $scope.clinicalStatementEdit);
        $scope.diagnosesUpdate($scope.patient.id, toAdd);
      }
    }.bind(this);

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalstatementsLoad = clinicalstatementsActions.get;
    this.clinicalstatementsLoad($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source);
  }
}

const ClinicalstatementsDetailComponent = {
  template: templateClinicalstatementsDetail,
  controller: ClinicalstatementsDetailController
};

ClinicalstatementsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'serviceRequests', 'usSpinnerService'];
export default ClinicalstatementsDetailComponent;