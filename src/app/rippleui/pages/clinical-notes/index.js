/*
 ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
 ~  
 ~  Licensed under the Apache License, Version 2.0 (the "License");
 ~  you may not use this file except in compliance with the License.
 ~  You may obtain a copy of the License at
 ~  
 ~    http://www.apache.org/licenses/LICENSE-2.0

 ~  Unless required by applicable law or agreed to in writing, software
 ~  distributed under the License is distributed on an "AS IS" BASIS,
 ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~  See the License for the specific language governing permissions and
 ~  limitations under the License.
 */
import routes from "./index.route";
import reducer from "./clinicalnotes-reducer-all";
import clinicalnotesListComponent from './clinicalnotes-list.component';
import clinicalnotesCreateComponent from './clinicalnotes-create.component';
import clinicalnotesDetailComponent from './clinicalnotes-detail.component';
import clinicalnotesActions from './clinicalnotes-actions';

export default {
  "name": 'clinicalnotes',
  "routes": routes,
  "reducer": reducer,
  "components": {
    clinicalnotesListComponent,
    clinicalnotesCreateComponent,
    clinicalnotesDetailComponent
  },
  "actions": {
    clinicalnotesActions
  },
  "sidebarInfo": {
    name: 'clinicalNotes',
    link: 'clinicalNotes',
    title: 'Clinical Notes'
  }
}