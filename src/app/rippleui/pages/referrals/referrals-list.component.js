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
let templateReferralsList = require('./referrals-list.html');

class ReferralsListController {
  constructor($scope, $state, $stateParams, $ngRedux, referralsActions, serviceRequests, ReferralsModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    this.query = '';
		this.isShowExpandBtn = true;//$state.router.globals.$current.name !== 'clinicalNotes'
		this.isFilter = false;

    if ($stateParams.filter) {
      this.query = $stateParams.filter;
    }

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    // $scope.search = function (row) {
    //   return (
    //     row.dateOfReferral.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
    //     row.referralFrom.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
    //     row.referralTo.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
    //     row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
    //   );
    // };

    this.go = function (id) {
      $state.go('referrals-detail', {
        patientId: $stateParams.patientId,
        referralId: id,
        filter: $scope.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.selected = function (referralId) {
      return referralId === $stateParams.referralId;
    };

    this.create = function () {
      ReferralsModal.openModal(this.currentPatient, {title: 'Create Referral'}, {}, this.currentUser);
    };

		this.toggleFilter = function () {
			this.isFilter = !this.isFilter;
		};

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }

      if (data.referrals.data) {
        this.referrals = data.referrals.data;

        for (var i = 0; i < this.referrals.length; i++) {
          this.referrals[i].dateOfReferral = moment(this.referrals[i].dateOfReferral).format('DD-MMM-YYYY');
        }
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.referralsLoad = referralsActions.all;
    this.referralsLoad($stateParams.patientId);
  }
}

const ReferralsListComponent = {
  template: templateReferralsList,
  controller: ReferralsListController
};

ReferralsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'referralsActions', 'serviceRequests', 'ReferralsModal', 'usSpinnerService'];
export default ReferralsListComponent;