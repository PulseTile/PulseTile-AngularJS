import VaccinationsListComponent from './vaccinations-list.component';
import VaccinationsCreateComponent from './vaccinations-create.component';
import VaccinationsDetailComponent from './vaccinations-detail.component';

angular.module('ripple-ui.vaccinations', [])
  .component('vaccinationsListComponent', VaccinationsListComponent)
  .component('vaccinationsCreateComponent', VaccinationsCreateComponent)
  .component('vaccinationsDetailComponent', VaccinationsDetailComponent);