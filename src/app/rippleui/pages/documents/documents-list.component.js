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
let templateDocumentsList = require('./documents-list.html');

class DocumentsListController {
  constructor($scope, $state, $stateParams, $ngRedux, documentsActions, serviceRequests, usSpinnerService, serviceFormatted, templateService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.go = function (id, documentType) {
      templateService.setTemplateType(documentType);
      $state.go('documents-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1
      });
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.documents.data) {
        this.documents = data.documents.data;
        serviceFormatted.formattingTablesDate(this.documents, ['dateCreated'], serviceFormatted.formatCollection.DDMMMYYYY);
        serviceFormatted.filteringKeys = ['documentType', 'dateCreated', 'source'];
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.documentsLoad = documentsActions.findAllDocuments;
    this.documentsLoad($stateParams.patientId);

  }
}

const DocumentsListComponent = {
  template: templateDocumentsList,
  controller: DocumentsListController
};

DocumentsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'documentsActions', 'serviceRequests', 'usSpinnerService', 'serviceFormatted', 'templateService'];
export default DocumentsListComponent;