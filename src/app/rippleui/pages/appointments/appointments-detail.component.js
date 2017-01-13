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
let templateAppointmentsDetail= require('./appointments-detail.html');

class AppointmentsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, appointmentsActions, AppointmentsModal, usSpinnerService) {
    this.edit = function () {
      AppointmentsModal.openModal(this.currentPatient, {title: 'Edit Appointment'}, this.appointment, this.currentUser);
    };

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.appointments.dataGet) {
        this.appointment = data.appointments.dataGet;
        usSpinnerService.stop('appointmentsDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.appointmentsLoad = appointmentsActions.get;
    this.appointmentsLoad($stateParams.patientId, $stateParams.appointmentIndex, $stateParams.source);
  }
}

const AppointmentsDetailComponent = {
  template: templateAppointmentsDetail,
  controller: AppointmentsDetailController
};

AppointmentsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'appointmentsActions', 'AppointmentsModal', 'usSpinnerService'];
export default AppointmentsDetailComponent;