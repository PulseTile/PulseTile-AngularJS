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
let templateDocumentsList = require('./documents-list.html');

class DocumentsListController {
  constructor($scope, $state, $stateParams, $ngRedux, documentsActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    this.query = '';

    $scope.search = function (row) {
      return (
        angular.lowercase(row.documentType).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.documentDate).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.source).indexOf(angular.lowercase($scope.query) || '') !== -1
      );
    };

    if ($stateParams.filter) {
      this.query = $stateParams.filter;
    }
    
    this.go = function (id, documentType, source) {
      $state.go('documents-detail', {
        patientId: $scope.patient.id,
        documentType: documentType,
        documentIndex: id,
        filter: $scope.query,
        page: $scope.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: source
      });
    };

    $scope.selected = function (documentIndex) {
      return documentIndex === $stateParams.documentIndex;
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.documents.data) {
        this.documents = data.documents.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
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

DocumentsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'documentsActions', 'serviceRequests', 'usSpinnerService'];
export default DocumentsListComponent;