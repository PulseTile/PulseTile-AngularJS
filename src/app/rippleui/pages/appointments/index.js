import AppointmentsListComponent from './appointments-list.component';
import AppointmentsDetailComponent from './appointments-detail.component';

angular.module('ripple-ui.appointments', [])
  .component('appointmentsListComponent', AppointmentsListComponent)
  .component('appointmentsDetailComponent', AppointmentsDetailComponent);