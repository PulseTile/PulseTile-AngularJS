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
export default function AppointmentsModal($uibModal, appointmentsActions, $ngRedux, AppointmentConfirmModal, serviceRequests) {
  var isModalClosed = true;

  var openModal = function (patient, modal, appointment, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./appointments-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.eventSource = [];
          $scope.currentUser = currentUser;
          $scope.appointment = appointment;
          $scope.patient = patient;
          $scope.modal = modal;
          $scope.radioModel = 'Tab1';
          $scope.appointment.location = appointment.location || 'Leeds General';
          $scope.appointment.status = appointment.status || 'Not Scheduled';

          if ($scope.appointment.status === 'Scheduled') {
            $scope.timeSlotFull = moment(appointment.timeOfAppointment).format('h:mma') + '-' + moment(appointment.timeOfAppointment).add(59, 'm').format('h:mma');
          }

          $scope.uiConfig = {
            calendar: {
              height: 450,
              width: 400,
              editable: true,
              aspectRatio: 1.7,
              defaultDate: '2015-02-12',
              Duration: '01:00:00',
              lang: 'en-gb',
              eventColor: '#378006',
              events: [
                { title: 'Time Slot 1', start: '2015-02-09 09:00', end: '2015-02-09 09:59' },
                { title: 'Time Slot 2', start: '2015-02-09 10:00', end: '2015-02-09 10:59' },
                { title: 'Time Slot 3', start: '2015-02-09 11:00', end: '2015-02-09 11:59' },
                { title: 'Time Slot 4', start: '2015-02-09 12:00', end: '2015-02-09 12:59' },
                { title: 'Time Slot 5', start: '2015-02-09 13:00', end: '2015-02-09 13:59' },
                { title: 'Time Slot 6', start: '2015-02-09 14:00', end: '2015-02-09 14:59' },
                { title: 'Time Slot 7', start: '2015-02-09 15:00', end: '2015-02-09 15:59' },
                { title: 'Time Slot 8', start: '2015-02-09 16:00', end: '2015-02-09 16:59' },

                { title: 'Time Slot 1', start: '2015-02-10 09:00', end: '2015-02-10 09:59' },
                { title: 'Time Slot 2', start: '2015-02-10 10:00', end: '2015-02-10 10:59' },
                { title: 'Time Slot 3', start: '2015-02-10 11:00', end: '2015-02-10 11:59' },
                { title: 'Time Slot 4', start: '2015-02-10 12:00', end: '2015-02-10 12:59' },
                { title: 'Time Slot 5', start: '2015-02-10 13:00', end: '2015-02-10 13:59' },
                { title: 'Time Slot 6', start: '2015-02-10 14:00', end: '2015-02-10 14:59' },
                { title: 'Time Slot 7', start: '2015-02-10 15:00', end: '2015-02-10 15:59' },
                { title: 'Time Slot 8', start: '2015-02-10 16:00', end: '2015-02-10 16:59' },

                { title: 'Time Slot 1', start: '2015-02-11 09:00', end: '2015-02-11 09:59' },
                { title: 'Time Slot 2', start: '2015-02-11 10:00', end: '2015-02-11 10:59' },
                { title: 'Time Slot 3', start: '2015-02-11 11:00', end: '2015-02-11 11:59' },
                { title: 'Time Slot 4', start: '2015-02-11 12:00', end: '2015-02-11 12:59' },
                { title: 'Time Slot 5', start: '2015-02-11 13:00', end: '2015-02-11 13:59' },
                { title: 'Time Slot 6', start: '2015-02-11 14:00', end: '2015-02-11 14:59' },
                { title: 'Time Slot 7', start: '2015-02-11 15:00', end: '2015-02-11 15:59' },
                { title: 'Time Slot 8', start: '2015-02-11 16:00', end: '2015-02-11 16:59' },

                { title: 'Time Slot 1', start: '2015-02-12 09:00', end: '2015-02-12 09:59' },
                { title: 'Time Slot 2', start: '2015-02-12 10:00', end: '2015-02-12 10:59' },
                { title: 'Time Slot 3', start: '2015-02-12 11:00', end: '2015-02-12 11:59' },
                { title: 'Time Slot 4', start: '2015-02-12 12:00', end: '2015-02-12 12:59' },
                { title: 'Time Slot 5', start: '2015-02-12 13:00', end: '2015-02-12 13:59' },
                { title: 'Time Slot 6', start: '2015-02-12 14:00', end: '2015-02-12 14:59' },
                { title: 'Time Slot 7', start: '2015-02-12 15:00', end: '2015-02-12 15:59' },
                { title: 'Time Slot 8', start: '2015-02-12 16:00', end: '2015-02-12 16:59' },

                { title: 'Time Slot 1', start: '2015-02-13 09:00', end: '2015-02-13 09:59' },
                { title: 'Time Slot 2', start: '2015-02-13 10:00', end: '2015-02-13 10:59' },
                { title: 'Time Slot 3', start: '2015-02-13 11:00', end: '2015-02-13 11:59' },
                { title: 'Time Slot 4', start: '2015-02-13 12:00', end: '2015-02-13 12:59' },
                { title: 'Time Slot 5', start: '2015-02-13 13:00', end: '2015-02-13 13:59', color: '#dd2b08' },
                { title: 'Time Slot 6', start: '2015-02-13 14:00', end: '2015-02-13 14:59' },
                { title: 'Time Slot 7', start: '2015-02-13 15:00', end: '2015-02-13 15:59' },
                { title: 'Time Slot 8', start: '2015-02-13 16:00', end: '2015-02-13 16:59' }
              ],
              header: {
                right: 'month,agendaWeek,agendaDay',
                center: 'title',
                left: 'prev,next'
              },
              eventClick: function (calEvent) {
                $scope.setTimeSlot(calEvent.start);
              },
              eventMouseover: function (event) {
                if (event.color === '#dd2b08') {
                  $(this).css('cursor', 'not-allowed');
                }
              },
              eventDrop: $scope.alertOnDrop,
              eventResize: $scope.alertOnResize,
              defaultView: 'agendaWeek',
              allDaySlot: false,
              minTime: '9:00',
              maxTime: '17:00',
              weekends: false
            }
          };

          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.setTimeSlot = function (time) {
            for (var i = 0; i < $scope.uiConfig.calendar.events.length; i++) {
              var event = $scope.uiConfig.calendar.events[i];

              if (event.start === time._i) {
                if (event.color !== '#dd2b08') {
                  innerModal(time);
                }
              }
            }
          };

          $scope.confirmationAppt = function (data) {
            $scope.appointment.timeOfAppointment = data.time;
            $scope.appointment.status = 'Scheduled';
            $scope.appointment.dateOfAppointment = data.time.toISOString().slice(0, 10);
            $scope.timeSlotFull = moment($scope.appointment.timeOfAppointment).format('h:mma') + '-' + moment($scope.appointment.timeOfAppointment).add(59, 'm').format('h:mma');
            setBookedSlot();
            $scope.radioModel = 'Tab1';

            if ($scope.isEdit) {
              $scope.appointmentsUpdate(patient.id,$scope.appointment);
            } else {
              $scope.appointmentsCreate(patient.id,$scope.appointment);
            }
          };

          function innerModal(time) {
            AppointmentConfirmModal.openModal({title: 'Confirm Date'}, time);
            serviceRequests.subscriber('apptTime', $scope.confirmationAppt);
          }

          if (modal.title === 'Edit Appointment') {
            $scope.isEdit = true;
            $scope.appointment.dateCreated = new Date($scope.appointment.dateCreated).toISOString().slice(0, 10);
            $scope.appointment.dateOfAppointment = new Date($scope.appointment.dateOfAppointment).toISOString().slice(0, 10);
            $scope.appointment.timeOfAppointment = new Date($scope.appointment.timeOfAppointment);
            setBookedSlot();
          }
          else {
            $scope.isEdit = false;
            $scope.appointment.dateCreated = new Date().toISOString().slice(0, 10);
          }


          function setBookedSlot() {
            var booking = new Date($scope.appointment.dateOfAppointment).toISOString().slice(0, 10) + ' ' + $scope.appointment.timeOfAppointment.toISOString().slice(11, 13) + ':00';
            for (var i = 0; i < $scope.uiConfig.calendar.events.length; i++) {
              var event = $scope.uiConfig.calendar.events[i];
              if (event.color === '#6599C8') {
                event.color = '#378006';
              }
              if (event.start === booking) {
                event.color = '#6599C8';
              }
            }
          }

          $scope.schedule = function () {
            $scope.radioModel = 'Tab2';
          };

          var isBooked = function () {
            return $scope.appointment.dateOfAppointment && $scope.appointment.timeOfAppointment;
          };

          $scope.getScheduleLabel = function () {
            return isBooked() ? ' Re-Schedule' : ' Schedule';
          };

          $scope.getScheduleLabel = function () {
            return isBooked() ? ' Re-Schedule' : ' Schedule';
          };

          $scope.ok = function (appointmentForm, appointment) {
            if (appointmentForm.$valid) {
              $uibModalInstance.close();
              $state.go('appointments', {
                patientId: patient.id,
                filter: $scope.query,
                page: $scope.currentPage
              }, {
                reload: true
              });
            }
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.appointmentsCreate = appointmentsActions.create;
          $scope.appointmentsUpdate = appointmentsActions.update;
        }
      });
    }

    modalInstance.result.then(function() {
      isModalClosed = true;
    }, function() {
      isModalClosed = true;
    });

  };

  return {
    isModalClosed: isModalClosed,
    openModal: openModal
  };
}
AppointmentsModal.$inject = ['$uibModal', 'appointmentsActions', '$ngRedux', 'AppointmentConfirmModal', 'serviceRequests'];