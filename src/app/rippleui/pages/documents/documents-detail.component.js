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
let templateDocumentsDetail= require('./documents-detail.html');

class DocumentsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, documentsActions) {

    $scope.documentType = $stateParams.documentType;

    this.setCurrentPageData = function (data) {
      if (data.documentsFindDischarge.data) {
        this.clinicalDocument = data.documentsFindDischarge.data;
      }
      if (data.documentsFindReferral.data) {
        this.clinicalDocument = data.documentsFindReferral.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    if ($scope.documentType == 'Healthlink Discharge summary') {
      this.documentsFindDischarge = documentsActions.findDischarge;
      this.documentsFindDischarge($stateParams.patientId, $stateParams.documentIndex, $stateParams.source);
    }
    else if ($scope.documentType == 'Healthlink Referral') {
      this.documentsFindReferral = documentsActions.findReferral;
      this.documentsFindReferral($stateParams.patientId, $stateParams.documentIndex, $stateParams.source);
    }
  }
}

const DocumentsDetailComponent = {
  template: templateDocumentsDetail,
  controller: DocumentsDetailController
};

DocumentsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'documentsActions'];
export default DocumentsDetailComponent;