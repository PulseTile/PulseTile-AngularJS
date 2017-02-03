import GenericMdtListComponent from './generic-mdt-list.component';
import GenericMdtDetailComponent from './generic-mdt-detail.component';
import GenericMdtCreateComponent from './generic-mdt-create.component';

angular.module('ripple-ui.generic-mdt', [])
  .component('genericMdtListComponent', GenericMdtListComponent)
  .component('genericMdtDetailComponent', GenericMdtDetailComponent)
  .component('genericMdtCreateComponent', GenericMdtCreateComponent);