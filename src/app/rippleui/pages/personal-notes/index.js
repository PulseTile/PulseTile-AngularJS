"use strict";

import PersonalnotesListComponent from './personalnotes-list.component';
import PersonalnotesCreateComponent from './personalnotes-create.component';
import PersonalnotesDetailComponent from './personalnotes-detail.component';

angular.module('ripple-ui.personal', [])
  .component('personalnotesListComponent', PersonalnotesListComponent)
  .component('personalnotesCreateComponent', PersonalnotesCreateComponent)
  .component('personalnotesDetailComponent', PersonalnotesDetailComponent);