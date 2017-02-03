import DiagnosesListComponent from './diagnoses-list.component';
import DiagnosesCreateComponent from './diagnoses-create.component';
import DiagnosesDetailComponent from './diagnoses-detail.component';

angular.module('ripple-ui.diagnoses', [])
  .component('diagnosesListComponent', DiagnosesListComponent)
  .component('diagnosesCreateComponent', DiagnosesCreateComponent)
  .component('diagnosesDetailComponent', DiagnosesDetailComponent);