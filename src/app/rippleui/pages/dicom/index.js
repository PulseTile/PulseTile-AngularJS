import ImageListComponent from './image-list.component';
import ImageDetailComponent from './image-detail.component';

angular.module('ripple-ui.dicom', [])
  .component('imageListComponent', ImageListComponent)
  .component('imageDetailComponent', ImageDetailComponent);