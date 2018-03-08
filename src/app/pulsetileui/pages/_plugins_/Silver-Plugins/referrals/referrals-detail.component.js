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
let templateReferralsDetail= require('./referrals-detail.html');

class ReferralsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, referralsActions, usSpinnerService, serviceRequests, serviceFormatted) {
    this.actionLoadList = referralsActions.all;
    this.actionLoadDetail = referralsActions.get;
    $scope.actionUpdateDetail = referralsActions.update;

    usSpinnerService.spin('detail-spinner');
    this.actionLoadDetail($stateParams.patientId, $stateParams.detailsIndex);

		$scope.isEdit = false;
    /* istanbul ignore next */
		this.edit = function () {
			$scope.isEdit = true;

			$scope.currentUser = this.currentUser;
			$scope.referralsEdit = Object.assign({}, this.referral);
			$scope.referralsEdit.dateCreated = new Date();
		};
    /* istanbul ignore next */
		this.cancelEdit = function () {
			$scope.isEdit = false;
		};
    /* istanbul ignore next */
		$scope.confirmEdit = function (referralsForm, referrals) {
			$scope.formSubmitted = true;

			if (referralsForm.$valid) {
				let toUpdate = {
					referralFrom: referrals.referralFrom,
					referralTo: referrals.referralTo,
					dateOfReferral: new Date(referrals.dateOfReferral),
					referralReason: referrals.referralReason,
					referralSummary: referrals.referralSummary,
					author: referrals.author,
					dateCreated: referrals.dateCreated,
          source: referrals.source,
          sourceId: referrals.sourceId,
          userId: $stateParams.patientId
				};

				$scope.isEdit = false;
        serviceFormatted.propsToString(toUpdate);
        $scope.actionUpdateDetail($stateParams.patientId, referrals.sourceId, toUpdate);
			}
		};
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.referrals;
      const { patientId, detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        this.referral = state.dataGet;
        (detailsIndex === state.dataGet.sourceId) ? usSpinnerService.stop('detail-spinner') : null;
      }

      // Update Detail
      if (state.dataUpdate !== null) {
        // After Update we request all list firstly
        this.actionLoadList(patientId);
      }
      if (state.isUpdateProcess) {
        usSpinnerService.spin('detail-update-spinner');
        if (!state.dataGet && !state.isGetFetching) {
          // We request detail when data is empty
          // Details are cleared after request LoadAll list
          this.actionLoadDetail(patientId, detailsIndex);
        }
      } else {
        usSpinnerService.stop('detail-update-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }

      if (state.error) {
        usSpinnerService.stop('detail-spinner');
        usSpinnerService.stop('detail-update-spinner');
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const ReferralsDetailComponent = {
  template: templateReferralsDetail,
  controller: ReferralsDetailController
};

ReferralsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'referralsActions', 'usSpinnerService', 'serviceRequests', 'serviceFormatted'];
export default ReferralsDetailComponent;