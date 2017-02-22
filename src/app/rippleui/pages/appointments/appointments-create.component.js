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
let templateAppointmentsCreate= require('./appointments-create.html');

class AppointmentsCreateController {
    constructor($scope, $state, $stateParams, appointmentsActions, $ngRedux, usSpinnerService, serviceRequests) {

        $scope.appointment = {
            dateCreated: new Date(),
            dateOfAppointment: "2017-02-10",
            location: "Leeds General",
            status: "Scheduled",
            timeOfAppointment: "2017-02-10T10:00:00.000Z"
        };

        this.goList = function () {
            $state.go('appointments', {
                patientId: $stateParams.patientId,
                reportType: $stateParams.reportType,
                searchString: $stateParams.searchString,
                queryType: $stateParams.queryType
            });
        }; 
        
        this.cancel = function () {
            this.goList();
        };

        $scope.create = function (appointmentsForm, appointment) {
            $scope.formSubmitted = true;

            $scope.appointment.status = 'Scheduled';
            
            if (appointmentsForm.$valid) {
                $scope.appointmentsCreate(this.currentPatient.id, appointment);
            }
        }.bind(this);

        $scope.openDatepicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
        };

        this.setCurrentPageData = function (data) {
            if (data.appointments.dataCreate !== null) {
                this.goList();
            }
            if (data.patientsGet.data) {
                this.currentPatient = data.patientsGet.data;
            }
            if (serviceRequests.currentUserData) {
                $scope.currentUser = serviceRequests.currentUserData;
            }
            if (data.appointments.dataGet) {
                this.appointment = data.appointments.dataGet;
                $scope.appt = this.appointment;

            }
        };
        let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: this.setCurrentPageData(state)
        }))(this);

        $scope.$on('$destroy', unsubscribe);

        $scope.appointmentsCreate = appointmentsActions.create;
    }
}

const AppointmentsCreateComponent = {
    template: templateAppointmentsCreate,
    controller: AppointmentsCreateController
};

AppointmentsCreateController.$inject = ['$scope', '$state', '$stateParams', 'appointmentsActions', '$ngRedux', 'usSpinnerService', 'serviceRequests'];
export default AppointmentsCreateComponent;