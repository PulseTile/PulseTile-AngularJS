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
const DOCUMENT_TYPE_DISCHARGE = 'discharge';
const DOCUMENT_TYPE_REFERRAL = 'referral';

const templateDocumentsDetail = require('./documents-detail.html');

class DocumentsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, documentsActions, usSpinnerService, serviceRequests) {
    this.actionLoaddetail = documentsActions.get;

    usSpinnerService.spin('detail-spinner');
    this.actionLoaddetail($stateParams.patientId, $stateParams.detailsIndex);

    $scope.typeOfDocument = '';
    this.clinicalDocument = {};
    /* istanbul ignore next */
    $scope.sendDocument = function () {
      serviceRequests.publisher('setDocument', {document: this.clinicalDocument, type: $scope.typeOfDocument });
    }.bind(this);
    serviceRequests.subscriber('getDocument', $scope.sendDocument);
    /* istanbul ignore next */
    $scope.getTypeOfDocument = () => {
      if (this.clinicalDocument.documentType) {
        const documentType = this.clinicalDocument.documentType.toLowerCase();

        if (documentType.indexOf(DOCUMENT_TYPE_DISCHARGE) >= 0) {
          $scope.typeOfDocument = DOCUMENT_TYPE_DISCHARGE;
        }
        if (documentType.indexOf(DOCUMENT_TYPE_REFERRAL) >= 0) {
          $scope.typeOfDocument = DOCUMENT_TYPE_REFERRAL;
        }
      }
     };
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.documents;
      const { detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        this.clinicalDocument = state.dataGet;
        // Variable $scope.clinicalDocument need for render DocumentsType Component
        $scope.clinicalDocument = state.dataGet;
        $scope.getTypeOfDocument();
        $scope.sendDocument();
        (detailsIndex === state.dataGet.sourceId) ? usSpinnerService.stop('detail-spinner') : null;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
      if (state.error) {
        usSpinnerService.stop('detail-spinner');
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}
DocumentsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'documentsActions', 'usSpinnerService', 'serviceRequests'];

const DocumentsDetailComponent = {
  template: templateDocumentsDetail,
  controller: DocumentsDetailController
};

export default DocumentsDetailComponent;