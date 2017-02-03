import AllergiesListComponent from './allergies-list.component';
import AllergiesCreateComponent from './allergies-create.component';
import AllergiesDetailComponent from './allergies-detail.component';

angular.module('ripple-ui.allergies', [])
  .component('allergiesListComponent', AllergiesListComponent)
  .component('allergiesCreateComponent', AllergiesCreateComponent)
  .component('allergiesDetailComponent', AllergiesDetailComponent);