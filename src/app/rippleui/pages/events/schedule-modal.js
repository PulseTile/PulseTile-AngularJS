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
export default function ScheduleModal($uibModal, $ngRedux, serviceRequests) {
  var isModalClosed = true;

  var openModal = function (patient, modal, schedule, currentUser) {
    /* istanbul ignore if  */
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./schedule-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.eventSource = [];
          $scope.currentUser = currentUser;
          $scope.schedule = schedule;
          $scope.patient = patient;
          $scope.modal = modal;
          // $scope.schedule.location = schedule.location || 'Leeds General';
          // $scope.schedule.status = schedule.status || 'Not Scheduled';

          // if ($scope.schedule.status === 'Scheduled') {
          //   $scope.timeSlotFull = moment(schedule.timeOfschedule).format('h:mma') + '-' + moment(schedule.timeOfschedule).add(59, 'm').format('h:mma');
          // }

          $scope.uiConfig = {
            calendar: {
              height: 433,
              width: 400,
              editable: true,
              aspectRatio: 1.7,
              defaultDate: '2017-03-14',
              Duration: '01:00:00',
              lang: 'en-gb',
              eventColor: '#689f43',
              events: [
                { title: 'Time Slot 1', start: '2017-03-14 09:00', end: '2017-03-14 09:59' },
                { title: 'Time Slot 2', start: '2017-03-14 10:00', end: '2017-03-14 10:59' },
                { title: 'Time Slot 3', start: '2017-03-14 11:00', end: '2017-03-14 11:59' },
                { title: 'Time Slot 4', start: '2017-03-14 12:00', end: '2017-03-14 12:59' },
                { title: 'Time Slot 5', start: '2017-03-14 13:00', end: '2017-03-14 13:59' },
                { title: 'Time Slot 6', start: '2017-03-14 14:00', end: '2017-03-14 14:59' },
                { title: 'Time Slot 7', start: '2017-03-14 15:00', end: '2017-03-14 15:59' },
                { title: 'Time Slot 8', start: '2017-03-14 16:00', end: '2017-03-14 16:59' },

                { title: 'Time Slot 1', start: '2017-03-15 09:00', end: '2017-03-15 09:59' },
                { title: 'Time Slot 2', start: '2017-03-15 10:00', end: '2017-03-15 10:59' },
                { title: 'Time Slot 3', start: '2017-03-15 11:00', end: '2017-03-15 11:59' },
                { title: 'Time Slot 4', start: '2017-03-15 12:00', end: '2017-03-15 12:59' },
                { title: 'Time Slot 5', start: '2017-03-15 13:00', end: '2017-03-15 13:59' },
                { title: 'Time Slot 6', start: '2017-03-15 14:00', end: '2017-03-15 14:59' },
                { title: 'Time Slot 7', start: '2017-03-15 15:00', end: '2017-03-15 15:59' },
                { title: 'Time Slot 8', start: '2017-03-15 16:00', end: '2017-03-15 16:59' },

                { title: 'Time Slot 1', start: '2017-03-11 09:00', end: '2017-03-11 09:59' },
                { title: 'Time Slot 2', start: '2017-03-11 10:00', end: '2017-03-11 10:59' },
                { title: 'Time Slot 3', start: '2017-03-11 11:00', end: '2017-03-11 11:59' },
                { title: 'Time Slot 4', start: '2017-03-11 12:00', end: '2017-03-11 12:59' },
                { title: 'Time Slot 5', start: '2017-03-11 13:00', end: '2017-03-11 13:59' },
                { title: 'Time Slot 6', start: '2017-03-11 14:00', end: '2017-03-11 14:59' },
                { title: 'Time Slot 7', start: '2017-03-11 15:00', end: '2017-03-11 15:59' },
                { title: 'Time Slot 8', start: '2017-03-11 16:00', end: '2017-03-11 16:59' },

                { title: 'Time Slot 1', start: '2017-03-12 09:00', end: '2017-03-12 09:59' },
                { title: 'Time Slot 2', start: '2017-03-12 10:00', end: '2017-03-12 10:59' },
                { title: 'Time Slot 3', start: '2017-03-12 11:00', end: '2017-03-12 11:59' },
                { title: 'Time Slot 4', start: '2017-03-12 12:00', end: '2017-03-12 12:59' },
                { title: 'Time Slot 5', start: '2017-03-12 13:00', end: '2017-03-12 13:59' },
                { title: 'Time Slot 6', start: '2017-03-12 14:00', end: '2017-03-12 14:59' },
                { title: 'Time Slot 7', start: '2017-03-12 15:00', end: '2017-03-12 15:59' },
                { title: 'Time Slot 8', start: '2017-03-12 16:00', end: '2017-03-12 16:59' },

                { title: 'Time Slot 1', start: '2017-03-13 09:00', end: '2017-03-13 09:59' },
                { title: 'Time Slot 2', start: '2017-03-13 10:00', end: '2017-03-13 10:59' },
                { title: 'Time Slot 3', start: '2017-03-13 11:00', end: '2017-03-13 11:59' },
                { title: 'Time Slot 4', start: '2017-03-13 12:00', end: '2017-03-13 12:59' },
                { title: 'Time Slot 5', start: '2017-03-13 13:00', end: '2017-03-13 13:59', color: '#418bca' },
                { title: 'Time Slot 6', start: '2017-03-13 14:00', end: '2017-03-13 14:59' },
                { title: 'Time Slot 7', start: '2017-03-13 15:00', end: '2017-03-13 15:59' },
                { title: 'Time Slot 8', start: '2017-03-13 16:00', end: '2017-03-13 16:59' }
              ],
              header: {
                right: 'prev,next',
                center: 'title',
                left: 'month,agendaWeek,agendaDay'
              },
              eventClick: function (calEvent) {
                $scope.setTimeSlot(calEvent.start);
              },
              eventMouseover: function (event) {
                if (event.color === '#418bca') {
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
            $scope.schedule.timeOfschedule = data.time;
            $scope.schedule.status = 'Scheduled';
            $scope.schedule.dateOfschedule = data.time.toISOString().slice(0, 10);
            $scope.timeSlotFull = moment($scope.schedule.timeOfschedule).format('h:mma') + '-' + moment($scope.schedule.timeOfschedule).add(59, 'm').format('h:mma');
            setBookedSlot();

            if ($scope.isEdit) {
              $scope.schedulesUpdate(patient.id,$scope.schedule);
            } else {
              $scope.schedulesCreate(patient.id,$scope.schedule);
            }
          };

          function innerModal(time) {
            // scheduleConfirmModal.openModal({title: 'Confirm Date'}, time);
            serviceRequests.subscriber('apptTime', $scope.confirmationAppt);
          }

          if (modal.title === 'Edit schedule') {
            $scope.isEdit = true;
            $scope.schedule.dateCreated = new Date($scope.schedule.dateCreated).toISOString().slice(0, 10);
            $scope.schedule.dateOfschedule = new Date($scope.schedule.dateOfschedule).toISOString().slice(0, 10);
            $scope.schedule.timeOfschedule = new Date($scope.schedule.timeOfschedule);
            setBookedSlot();
          }
          else {
            $scope.isEdit = false;
            $scope.schedule.dateCreated = new Date().toISOString().slice(0, 10);
          }


          function setBookedSlot() {
            var booking = new Date($scope.schedule.dateOfschedule).toISOString().slice(0, 10) + ' ' + $scope.schedule.timeOfschedule.toISOString().slice(11, 13) + ':00';
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

          var isBooked = function () {
            return $scope.schedule.dateOfschedule && $scope.schedule.timeOfschedule;
          };

          $scope.getScheduleLabel = function () {
            return isBooked() ? ' Re-Schedule' : ' Schedule';
          };

          $scope.getScheduleLabel = function () {
            return isBooked() ? ' Re-Schedule' : ' Schedule';
          };

          $scope.ok = function (scheduleForm, schedule) {
            if (scheduleForm.$valid) {
              $uibModalInstance.close();
              $state.go('schedules', {
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

          // $scope.schedulesCreate = schedulesActions.create;
          // $scope.schedulesUpdate = schedulesActions.update;
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
ScheduleModal.$inject = ['$uibModal', '$ngRedux', 'serviceRequests'];