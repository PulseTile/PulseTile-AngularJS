import MedicationsListComponent from './medications-list.component';
import MedicationsCreateComponent from './medications-create.component';
import MedicationsDetailComponent from './medications-detail.component';

angular.module('ripple-ui.medications', [])
  .component('medicationsListComponent', MedicationsListComponent)
  .component('medicationsCreateComponent', MedicationsCreateComponent)
  .component('medicationsDetailComponent', MedicationsDetailComponent);