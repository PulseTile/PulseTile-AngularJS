import ProceduresListComponent from './procedures-list.component';
import ProceduresDetailComponent from './procedures-detail.component';
import ProceduresCreateComponent from './procedures-create.component';

angular.module('ripple-ui.procedures', [])
  .component('proceduresListComponent', ProceduresListComponent)
  .component('proceduresDetailComponent', ProceduresDetailComponent)
  .component('proceduresCreateComponent', ProceduresCreateComponent);