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
			this.currentUser = serviceRequests.currentUserData;
		}
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

		this.edit = function () {

			$scope.isEdit = true;

			$scope.currentUser = this.currentUser;
			$scope.referralsEdit = Object.assign({}, this.referral);
			$scope.patient = this.currentPatient;

      // $scope.referralsEdit.dateCreated = new Date(this.referralsEdit.dateCreated).toISOString().slice(0, 10);
			$scope.referralsEdit.dateCreated = new Date();
		};

		this.cancelEdit = function () {
			$scope.isEdit = false;
		};

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
          userId: $scope.patient.id.toString()
				};

				this.referral = Object.assign(this.referral, toUpdate);
				$scope.isEdit = false;
        serviceFormatted.propsToString(toUpdate);
				referralsActions.update($scope.patient.id, referrals.sourceId, toUpdate);
				setTimeout(function () {
					$state.go('referrals', {
						patientId: $scope.patient.id,
						clinicalNoteIndex: referrals.sourceId
					});
				}, 1000);
			}
		}.bind(this);


    $scope.$on('$destroy', unsubscribe);

    this.referralsLoad = referralsActions.get;
    this.referralsLoad($stateParams.patientId, $stateParams.detailsIndex);
  }
}

const ReferralsDetailComponent = {
  template: templateReferralsDetail,
  controller: ReferralsDetailController
};

ReferralsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'referralsActions', 'usSpinnerService', 'serviceRequests', 'serviceFormatted'];
export default ReferralsDetailComponent;