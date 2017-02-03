import ResultsListComponent from './results-list.component';
import ResultsDetailComponent from './results-detail.component';

angular.module('ripple-ui.results', [])
  .component('resultsListComponent', ResultsListComponent)
  .component('resultsDetailComponent', ResultsDetailComponent);