/*
  ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
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
let templateEventsDetail = require('./events-detail.html');

class EventsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, eventsActions, serviceRequests, usSpinnerService, serviceDateTimePicker, serviceFormatted) {
    this.actionLoadList = eventsActions.all;
    this.actionLoadDetail = eventsActions.get;
    $scope.actionUpdateDetail = eventsActions.update;

    usSpinnerService.spin('detail-spinner');
    this.actionLoadDetail($stateParams.patientId, $stateParams.detailsIndex);

    var socket = io.connect('wss://' + window.location.hostname + ':' + 8070);
    $scope.isEdit = false;

    this.currentUser = serviceRequests.currentUserData;
    $scope.currentUser = this.currentUser;

    $scope.formDisabled = true;
    $scope.messages = [];
    $scope.startDateBeforeRender = serviceDateTimePicker.startDateBeforeRender;

    /* istanbul ignore next */
    this.edit = function () {
      $scope.isEdit = true;
      $scope.eventEdit = Object.assign({}, this.event);
      $scope.eventEdit.dataCreated = new Date();
    };
    
    /* istanbul ignore next */
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };

    /* istanbul ignore next */
    $scope.confirmEdit = function (eventForm, event) {
      $scope.formSubmitted = true;

      let toAdd = {
        name: event.name,
        type: event.type,
        description: event.description,
        dateTime: event.dateTime,
        author: event.author,
        source: event.source,
        sourceId: event.sourceId
      };

      if (eventForm.$valid) {
        $scope.isEdit = false;

        serviceFormatted.propsToString(toAdd);
        $scope.actionUpdateDetail($stateParams.patientId, event.sourceId, toAdd);
      }
    }.bind(this);

    /* istanbul ignore next */
    this.setCurrentPageData = function (store) {
      const state = store.events;
      const { patientId, detailsIndex } = $stateParams;

      // Get Details data
      if (state.dataGet) {
        this.appointment = state.dataGet;
        this.event = state.dataGet;
        $scope.appt = this.appointment;

        (detailsIndex === state.dataGet.sourceId) ? usSpinnerService.stop('detail-spinner') : null;
        socket.emit('appointment:messages', {appointmentId: this.appointment.sourceId});
      }

      // Update Detail
      if (state.dataUpdate !== null) {
        // After Update we request all list firstly
        this.actionLoadList(patientId);
      }
      if (state.isUpdateProcess) {
        usSpinnerService.spin('detail-update-spinner');
        if (!state.dataGet && !state.isGetFetching) {
          // We request detail when data is empty
          // Details are cleared after request LoadAll list
          this.actionLoadDetail(patientId, detailsIndex);
        }
      } else {
        usSpinnerService.stop('detail-update-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
        $scope.patient =  this.currentUser;

      }

      if (state.error) {
        usSpinnerService.stop('detail-spinner');
        usSpinnerService.stop('detail-update-spinner');
      }
    };
    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    $scope.$on('$destroy', unsubscribe);



    /* istanbul ignore next */
    window.onbeforeunload = function (e) {
      var dialogText = 'Please, close the appointment by pressing "End call" or the appointment will stay active!';
      e.returnValue = dialogText;
      return dialogText;
    };

    /* istanbul ignore next */
    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }

    var appointmentId = $stateParams.detailsIndex;
    var user = serviceRequests.currentUserData;
    var ROLE_DOCTOR = 'IDCR';
    var token = getCookie('JSESSIONID');

    const currentUser = $scope.currentUser || $scope.patient;

    // username field is used as ID !
    socket.emit('user:init', {
      username: currentUser.username || currentUser.sub,
      nhsNumber: currentUser.nhsNumber,
      role: currentUser.role,
      surname: currentUser.family_name,
      name: currentUser.given_name
    });

    socket.on('appointment:init', function(data) {
      $scope.showJoinAppointment = data.appointmentId;
      // console.log('ON appointment:init', $scope.showJoinAppointment);
    });

    /* istanbul ignore next */
    function isDoctor(user) {
      return user && user.role == ROLE_DOCTOR;
    }

    // $scope.patient =  this.currentPatient;
    $scope.appt =  this.appointment;

    /* istanbul ignore next */
    $scope.canStartAppointment = function () {
      /* istanbul ignore if  */
      if (!$scope.isDoctor())
        return false;

      return !$scope.isClosed && !$scope.showJoinAppointment;
    };

    /* istanbul ignore next */
    $scope.isDoctor = function () {
      return currentUser && currentUser.role === 'IDCR';
    };
    
    /* istanbul ignore next */
    $scope.canJoinAppointment = function () {
      /* istanbul ignore if  */
      if (!$scope.isPatient())
        return false;

      var canJoin = $scope.showJoinAppointment;
      return !$scope.isClosed && Boolean(canJoin) && canJoin == $scope.appt.sourceId;
    };

    /* istanbul ignore next */
    $scope.isPatient = function () {
      return !$scope.isDoctor();
    };

    $scope.isShow = false;
    function timer() {
      setTimeout(function(){ $scope.isShow = true; }, 1000);
    };
    timer();
    
    /* istanbul ignore next */
    $scope.startAppointment = function () {
      // console.log('startAppointment ===> ',  $scope.patient, $scope.appt);
      if (!$scope.appt) return;

      socket.emit('appointment:init', {
        patientId: $scope.patient.id,
        appointmentId: $scope.appt.sourceId
      });

      openPopup($scope.appt.sourceId);
    };

    /* istanbul ignore next */
    $scope.joinAppointment = function () {
      // socket.emit('appointment:start', $scope.patient.id);
      openPopup($scope.appt.sourceId);
    };

    /* istanbul ignore next  */
    function openPopup(id) {
      window.windowObjectReference = window.windowObjectReference || null;
      var center = popupCenter(972, 734);
      var options = center + ',resizable=yes,scrollbars=yes,status=yes,minimizable=yes,location=no';
      if (window.windowObjectReference == null || window.windowObjectReference.closed) {
        window.windowObjectReference = window.open(window.location.origin + '/videochat/videochat.html?appointmentId=' + id,
            'Video Chat', options);
        window.windowObjectReference.focus();
      } else {
        window.windowObjectReference.focus();
      }
    }

    /* istanbul ignore next  */
    function popupCenter(w, h) {
      var dualScreenLeft = (window.screenLeft != undefined) ? window.screenLeft : screen.left;
      var dualScreenTop = (window.screenTop != undefined) ? window.screenTop : screen.top;

      var width = (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth) ? document.documentElement.clientWidth : screen.width;
      var height = (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight) ? document.documentElement.clientHeight : screen.height;

      var left = ((width / 2) - (w / 2)) + dualScreenLeft;
      var top = ((height / 2) - (h / 2)) + dualScreenTop;
      return 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left;
    }

    socket.emit('appointment:status', {appointmentId: $stateParams.detailsIndex, token: token});
    socket.off('appointment:messages'); // remove dublicate socket listeners
    socket.off('appointment:close');
    socket.off('appointment:status');
    socket.on('appointment:messages', onMessages);
    socket.on('appointment:close', onClose);
    socket.on('appointment:status', onStatus);

    /* istanbul ignore next  */
    function onMessages(dt) {
      var data = JSON.parse(JSON.stringify(dt));
      usSpinnerService.stop('appointmentsDetail-spinner');
      if (!data.appointment || $state.current.name != 'events-detail' || $stateParams.detailsIndex != data.appointmentId) return;

      $scope.messages = data.messages.map(function (message) {
        message.timestamp = moment(+message.timestamp).format('HH:mm');
        if (!message.author) {
          message.author = '';
        } else {
          var role = $scope.isDoctor(currentUser) ?  'doctor' : 'patient';
          var opponent = $scope.isPatient(currentUser) ?  'doctor' : 'patient';
          if (message.author == role) {
            message.author = 'You: ';
          } else {
            message.author = data.appointment[opponent] + ': ';
          }
        }
        return message;
      });
      // console.log('onMessages ---> ', $scope.messages);
    }

    /* istanbul ignore next */
    function onClose(data) {
      // console.log('onClose ---> ', data);
      $scope.showJoinAppointment = null;
      if (data.appointmentId == $stateParams.detailsIndex) {
        socket.emit('appointment:status', {appointmentId: $stateParams.detailsIndex, token: token});
        socket.emit('appointment:messages', {appointmentId: $stateParams.detailsIndex, token: token});
      }
    }

    /* istanbul ignore next */
    function onStatus(data) {
      // console.log('onStatus ---> ', data, data.appointmentId, ' == ', $stateParams.detailsIndex);
      if (data.appointmentId == $stateParams.detailsIndex) {
        $scope.isClosed = data.isClosed;
      }
    }
  }
}

const EventsDetailComponent = {
  template: templateEventsDetail,
  controller: EventsDetailController
};

EventsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eventsActions', 'serviceRequests', 'usSpinnerService', 'serviceDateTimePicker', 'serviceFormatted'];
export default EventsDetailComponent;