import DocumentsListComponent from './documents-list.component';
import DocumentsDetailComponent from './documents-detail.component';

angular.module('ripple-ui.documents', [])
  .component('documentsListComponent', DocumentsListComponent)
  .component('documentsDetailComponent', DocumentsDetailComponent);