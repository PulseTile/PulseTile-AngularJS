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
  constructor($scope, $state, $stateParams, $ngRedux, referralsActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

		this.isShowCreateBtn = $state.router.globals.$current.name !== 'referrals-create';
		this.isShowExpandBtn = $state.router.globals.$current.name !== 'referrals';

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    this.go = function (id) {
      $state.go('referrals-detail', {
        patientId: $stateParams.patientId,
        referralId: id,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.selected = function (referralId) {
      return referralId === $stateParams.referralId;
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
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

		this.create = function () {
			$state.go('referrals-create', {
				patientId: $stateParams.patientId,
				page: this.currentPage,
				reportType: $stateParams.reportType,
				searchString: $stateParams.searchString,
				queryType: $stateParams.queryType
			});
		};

		$scope.openDatepicker = function ($event, name) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope[name] = true;
		};

		this.sort = function (field) {
			var reverse = this.reverse;
			if (this.order === field) {
				this.reverse = !reverse;
			} else {
				this.order = field;
				this.reverse = false;
			}
		};

		this.sortClass = function (field) {
			if (this.order === field) {
				return this.reverse ? 'sorted desc' : 'sorted asc';
			}
		};

		this.order = serviceRequests.currentSort.order || 'dateOfReferral';
		this.reverse = serviceRequests.currentSort.reverse || false;
		
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

ReferralsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'referralsActions', 'serviceRequests', 'usSpinnerService'];
export default ReferralsListComponent;