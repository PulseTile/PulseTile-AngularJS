import ClinicalnotesListComponent from './clinicalnotes-list.component';
import ClinicalnotesCreateComponent from './clinicalnotes-create.component';
import ClinicalnotesDetailComponent from './clinicalnotes-detail.component';

angular.module('ripple-ui.clinicalnotes', [])
  .component('clinicalnotesListComponent', ClinicalnotesListComponent)
  .component('clinicalnotesCreateComponent', ClinicalnotesCreateComponent)
  .component('clinicalnotesDetailComponent', ClinicalnotesDetailComponent);