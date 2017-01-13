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
let templateReferralsDetail= require('./referrals-detail.html');

class ReferralsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, referralsActions, ReferralsModal, usSpinnerService) {

		$scope.isEdit = false;

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.referrals.dataGet) {
        this.referral = data.referrals.dataGet;
        usSpinnerService.stop('referralsDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
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

			$scope.referralsEdit.dateCreated = new Date(this.clinicalNote.dateCreated).toISOString().slice(0, 10);
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
					dateOfReferral: referrals.dateOfReferral,
					reason: referrals.reason,
					clinicalSummary: referrals.clinicalSummary,
					author: referrals.author,
					dateCreated: referrals.dateCreated,
					source: referrals.source
				};

				this.referralsEdit = Object.assign(referrals, $scope.clinicalNoteEdit);
				$scope.isEdit = false;
				referralsActions.update($scope.patient.id, toUpdate);
				setTimeout(function () {
					$state.go('clinicalNotes-detail', {
						patientId: $scope.patient.id,
						clinicalNoteIndex: referrals.sourceId
					});
				}, 1000);
			}
		};


    $scope.$on('$destroy', unsubscribe);
console.log('$stateParams.referralId', $stateParams.referralId);
    this.referralsLoad = referralsActions.get;
    this.referralsLoad($stateParams.patientId, $stateParams.referralId);
  }
}

const ReferralsDetailComponent = {
  template: templateReferralsDetail,
  controller: ReferralsDetailController
};

ReferralsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'referralsActions', 'ReferralsModal', 'usSpinnerService'];
export default ReferralsDetailComponent;