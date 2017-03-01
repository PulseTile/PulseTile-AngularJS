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
let templateProceduresDetail= require('./procedures-detail.html');

class ProceduresDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, proceduresActions, usSpinnerService, serviceRequests) {

		$scope.isEdit = false;

		this.edit = function () {
			$scope.isEdit = true;

			$scope.procedureEdit = Object.assign({}, this.procedure);
			$scope.procedureEdit.dateSubmitted = new Date();
		};

		this.cancelEdit = function () {
			$scope.isEdit = false;
		};

		$scope.confirmEdit = function (procedureForm) {
			$scope.formSubmitted = true;
			if (procedureForm.$valid) {
				$scope.isEdit = false;
				this.procedure = Object.assign(this.contact, $scope.procedureEdit);
				proceduresActions.update(this.currentPatient.id, this.procedure);
			}
		}.bind(this);

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.procedures.dataGet) {
        this.procedure = data.procedures.dataGet;
        usSpinnerService.stop('proceduresDetail-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.proceduresLoad = proceduresActions.get;
    this.proceduresLoad($stateParams.patientId, $stateParams.detailsIndex, $stateParams.source);
  }
}

const ProceduresDetailComponent = {
  template: templateProceduresDetail,
  controller: ProceduresDetailController
};

ProceduresDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'proceduresActions', 'usSpinnerService', 'serviceRequests'];
export default ProceduresDetailComponent;