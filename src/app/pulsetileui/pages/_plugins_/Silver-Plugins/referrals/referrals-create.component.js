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
let templateCreate= require('./referrals-create.html');

class ReferralsCreateController {
  constructor($scope, $state, $stateParams, $ngRedux, referralsActions, usSpinnerService, serviceRequests, serviceFormatted) {
    $scope.actionLoadList = referralsActions.all;
    $scope.actionCreateDetail = referralsActions.create;

  	$scope.referralsEdit = {};
  	$scope.referralsEdit.dateCreated = new Date();
    /* istanbul ignore next */
		this.goList = function () {
			$state.go('referrals', {
				patientId: $stateParams.patientId,
				reportType: $stateParams.reportType,
				searchString: $stateParams.searchString,
				queryType: $stateParams.queryType,
				page: $stateParams.page
			});
		};
    /* istanbul ignore next */
		this.cancel = function () {
			this.goList();
		};

		$scope.isEdit = false;
    /* istanbul ignore next */
		$scope.create = function (referralsForm, referral) {
			$scope.formSubmitted = true;

			if (referralsForm.$valid) {
        serviceFormatted.propsToString(referral);
        $scope.actionCreateDetail($stateParams.patientId, referral);
			}
		}.bind(this);
    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      if (store.referrals.dataCreate !== null) {
        $scope.actionLoadList($stateParams.patientId);
        this.goList();
      }
      if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.referralsEdit.author = $scope.currentUser.email;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);
  }
}

const ReferralsCreateComponent = {
  template: templateCreate,
  controller: ReferralsCreateController
};

ReferralsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'referralsActions', 'usSpinnerService', 'serviceRequests', 'serviceFormatted'];
export default ReferralsCreateComponent;