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
  constructor($scope, $state, $stateParams, $ngRedux, referralsActions, usSpinnerService, serviceRequests) {

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
		  if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
		  }
		  if (data.referrals.dataGet) {
        this.referral = data.referrals.dataGet;
        usSpinnerService.stop('referralsDetail-spinner');
		  }
		  if (serviceRequests.currentUserData) {
        $scope.currentUser = serviceRequests.currentUserData;
        $scope.referralsEdit.author = $scope.currentUser.email;
		  }
		};

		let unsubscribe = $ngRedux.connect(state => ({
      		getStoreData: this.setCurrentPageData(state)
		}))(this);

		// this.edit = function () {

		// 	$scope.isEdit = true;

		// 	$scope.currentUser = this.currentUser;
		// 	$scope.referralsEdit = Object.assign({}, this.referral);
		// 	$scope.patient = this.currentPatient;

		// 	$scope.referralsEdit.dateCreated = new Date(this.clinicalNote.dateCreated).toISOString().slice(0, 10);
		// };

		// this.cancelEdit = function () {
		// 	$scope.isEdit = false;
		// };

		$scope.create = function (referralsForm, referral) {
			$scope.formSubmitted = true;

			if (referralsForm.$valid) {

				$scope.referralsCreate($scope.currentPatient.id, referral);
			}
		};

		$scope.referralsCreate = referralsActions.create;


    $scope.$on('$destroy', unsubscribe);

    this.referralsLoad = referralsActions.get;
    this.referralsLoad($stateParams.patientId, $stateParams.referralId);
  }
}

const ReferralsCreateComponent = {
  template: templateCreate,
  controller: ReferralsCreateController
};

ReferralsCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'referralsActions', 'usSpinnerService', 'serviceRequests'];
export default ReferralsCreateComponent;