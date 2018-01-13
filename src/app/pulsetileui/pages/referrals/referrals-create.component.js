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

  	$scope.referralsEdit = {};
  	$scope.referralsEdit.dateCreated = new Date();

		this.goList = function () {
			$state.go('referrals', {
				patientId: $stateParams.patientId,
				reportType: $stateParams.reportType,
				searchString: $stateParams.searchString,
				queryType: $stateParams.queryType,
				page: $stateParams.page
			});
		};
		this.cancel = function () {
			this.goList();
		};

		$scope.isEdit = false;

		this.setCurrentPageData = function (data) {
      if (data.referrals.dataCreate !== null) {
        this.goList();
      }
		  if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
		  }
		  if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.referralsEdit.author = $scope.currentUser.email;
		  }
		};

		let unsubscribe = $ngRedux.connect(state => ({
      		getStoreData: this.setCurrentPageData(state)
		}))(this);

		$scope.create = function (referralsForm, referral) {
			$scope.formSubmitted = true;

			if (referralsForm.$valid) {
        serviceFormatted.propsToString(referral);
				$scope.referralsCreate(this.currentPatient.id, referral);
			}
		}.bind(this);

		$scope.referralsCreate = referralsActions.create;

    $scope.$on('$destroy', unsubscribe);
  }
}

const ReferralsCreateComponent = {
  template: templateCreate,
  controller: ReferralsCreateController
};

ReferralsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'referralsActions', 'usSpinnerService', 'serviceRequests', 'serviceFormatted'];
export default ReferralsCreateComponent;