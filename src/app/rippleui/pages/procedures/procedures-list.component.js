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
let templateProceduresList = require('./procedures-list.html');

class ProceduresListController {
  constructor($scope, $state, $stateParams, $ngRedux, proceduresActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

		this.isShowCreateBtn = $state.router.globals.$current.name !== 'procedures-create';
		this.isShowExpandBtn = $state.router.globals.$current.name !== 'procedures';


		this.create = function () {
			$state.go('procedures-create', {
				patientId: $stateParams.patientId
			});
		};

    this.go = function (id, source) {
      $state.go('procedures-detail', {
        patientId: $stateParams.patientId,
        detailsIndex: id,
        page: $scope.currentPage || 1,
        source: source
      });
    };

    // this.search = function (row) {
    //   return (
    //     row.name.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
    //     row.date.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
    //     row.time.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
    //     row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
    //   );
    // };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.procedures.data) {
        this.procedures = data.procedures.data;

        for (var i = 0; i < this.procedures.length; i++) {
          if (angular.isNumber(this.procedures[i].date)) {
            this.procedures[i].date = moment(this.procedures[i].date).format('DD-MMM-YYYY');
          } else if (this.procedures[i].date === null) {
            this.procedures[i].date = '';
          }

          if (angular.isNumber(this.procedures[i].time)) {
            this.procedures[i].time = moment(this.procedures[i].time).format('HH:mm');
          } else if (this.procedures[i].time === null) {
            this.procedures[i].time = '';
          }
        }
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.proceduresLoad = proceduresActions.all;
    this.proceduresLoad($stateParams.patientId);
  }
}

const ProceduresListComponent = {
  template: templateProceduresList,
  controller: ProceduresListController
};

ProceduresListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'proceduresActions', 'serviceRequests', 'usSpinnerService'];
export default ProceduresListComponent;