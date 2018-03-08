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

let templateClinicalstatementsDetail = require('./clinicalstatements-detail.html');

class ClinicalstatementsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, serviceRequests, usSpinnerService) {
    this.actionLoadDetail = clinicalstatementsActions.get;

    usSpinnerService.spin('detail-spinner');
    this.actionLoadDetail($stateParams.patientId, $stateParams.detailsIndex);
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.clinicalstatements;
      const { detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        this.clinicalStatement = state.dataGet;
        var mapObj = {
          'fa-close':'',
          'tag':'',
          'editable':''

        };
        this.clinicalStatement.text = this.clinicalStatement.text.replace(/fa-close|tag|editable/gi, function(matched){
          return mapObj[matched];
        });
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

const ClinicalstatementsDetailComponent = {
  template: templateClinicalstatementsDetail,
  controller: ClinicalstatementsDetailController
};

ClinicalstatementsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'serviceRequests', 'usSpinnerService'];
export default ClinicalstatementsDetailComponent;