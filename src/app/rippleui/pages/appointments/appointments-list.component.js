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
let templateAppointmentsList = require('./appointments-list.html');

class AppointmentsListController {
  constructor($scope, $state, $stateParams, $ngRedux, appointmentsActions, serviceRequests, AppointmentsModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    $scope.query = '';

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      $scope.query = $stateParams.filter;
    }

    this.go = function (id, appointmentSource) {
      $state.go('appointments-detail', {
        patientId: $stateParams.patientId,
        appointmentIndex: id,
        filter: $scope.query,
        page: this.currentPage,
        source: appointmentSource
      });
    };

    this.selected = function (appointmentIndex) {
      return appointmentIndex === $stateParams.appointmentIndex;
    };

    this.create = function () {
      AppointmentsModal.openModal(this.currentPatient, {title: 'Create Appointment'}, {}, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.appointments.data) {
        this.appointments = data.appointments.data;
        // this.appointments.sort(function (a, b) {
        //   return (a.dateOfAppointment == b.dateOfAppointment) ?
        //     (a.timeOfAppointment > b.timeOfAppointment ? 1 : -1) :
        //     (a.dateOfAppointment > b.dateOfAppointment ? 1 : -1);
        // });

        for (var i = 0; i < this.appointments.length; i++) {
          if (angular.isNumber(this.appointments[i].dateOfAppointment)) {
            this.appointments[i].dateOfAppointment = moment(this.appointments[i].dateOfAppointment).format('DD-MMM-YYYY');
          }
          if (angular.isNumber(this.appointments[i].timeOfAppointment)) {
            this.appointments[i].timeOfAppointment = moment(this.appointments[i].timeOfAppointment).format('h:mma') + '-' + moment(this.appointments[i].timeOfAppointment).add(59, 'm').format('h:mma');
          }
        }
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    this.search = function (row) {
      return (
        row.dateOfAppointment && row.dateOfAppointment.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.timeOfAppointment && row.timeOfAppointment.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.serviceTeam && row.serviceTeam.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.source && row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.appointmentsLoad = appointmentsActions.all;
    this.appointmentsLoad($stateParams.patientId);
  }
}

const AppointmentsListComponent = {
  template: templateAppointmentsList,
  controller: AppointmentsListController
};

AppointmentsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'appointmentsActions', 'serviceRequests', 'AppointmentsModal', 'usSpinnerService'];
export default AppointmentsListComponent;