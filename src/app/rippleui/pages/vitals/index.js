import VitalsListComponent from './vitals-list.component';
import VitalsCreateComponent from './vitals-create.component';
import VitalsDetailComponent from './vitals-detail.component';

angular.module('ripple-ui.vitals', [])
  .component('vitalsListComponent', VitalsListComponent)
  .component('vitalsCreateComponent', VitalsCreateComponent)
  .component('vitalsDetailComponent', VitalsDetailComponent);