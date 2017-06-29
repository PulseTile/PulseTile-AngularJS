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
class DocumentsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, documentsActions, usSpinnerService, ConfirmationDocsModal, templateService) {

    // $scope.documentType = $stateParams.documentType;

    this.setCurrentPageData = function (data) {
      // if (data.documents.data) {
      //   this.clinicalDocument = data.findDischarge.data;
      // }
      if (data.documents.data) {
        this.clinicalDocument = data.findReferral.data;
      }
      usSpinnerService.stop('documentssDetail-spinner');
    };

    $scope.importToCreate = function (typeCreate, data) {
      ConfirmationDocsModal.openModal(function () {
        data.isImport = true;
        data.originalSource = location.href;
        data.originalComposition = templateService.getTemplateType();
        /* istanbul ignore if */
        if (typeCreate && data) {
          $state.go(typeCreate + '-create', {
            patientId: $stateParams.patientId,
            importData: {
              data: data,
              documentIndex: $stateParams.detailsIndex
            }

          });
        } 
      });
    }

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

      this.documentsFindReferral = documentsActions.findReferral;
      this.documentsFindReferral($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source);
  }
}

const DocumentsDetailComponent = {
  template: function($element, $attrs, templateService) {
    let templateDocumentsType = require('./' + templateService.getTemplate());
    return templateDocumentsType;
  },
  controller: DocumentsDetailController
};

DocumentsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'documentsActions', 'usSpinnerService', 'ConfirmationDocsModal', 'templateService'];
export default DocumentsDetailComponent;