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
const templateDocumentsDetailReferral = require('./documents-detail-referral.html');
const templateDocumentsDetailDischarge = require('./documents-detail-discharge.html');

class DocumentsDetailTypeController {
  constructor($scope, $state, $stateParams, serviceRequests, ConfirmationDocsModal) {
    $scope.documentData = $scope.$parent.clinicalDocument || {};
    $scope.typeOfDocument = $scope.$parent.typeOfDocument || '';

    /* istanbul ignore next */
    $scope.setDocument = function (data) {
      $scope.documentData = data.document;
      $scope.typeOfDocument = data.type;
    };
    serviceRequests.subscriber('setDocument', $scope.setDocument);

    setTimeout(function () {
      serviceRequests.publisher('getDocument');
    }, 1000);

    /* istanbul ignore next */
    $scope.importToCreate = function (typeCreate, data) {
      ConfirmationDocsModal.openModal(function () {
        data.isImport = true;
        data.originalSource = location.href;
        data.originalComposition = $scope.typeOfDocument;
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
  }
}
DocumentsDetailTypeController.$inject = ['$scope', '$state', '$stateParams', 'serviceRequests', 'ConfirmationDocsModal'];

export const documentsDetailReferralComponent = {
  template: templateDocumentsDetailReferral,
  controller: DocumentsDetailTypeController
};

export const documentsDetailDischargeComponent = {
  template: templateDocumentsDetailDischarge,
  controller: DocumentsDetailTypeController
};
