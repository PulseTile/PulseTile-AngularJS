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
import reducer from "./personalnotes-reducer-all";
import personalnotesListComponent from './personalnotes-list.component';
import personalnotesCreateComponent from './personalnotes-create.component';
import personalnotesDetailComponent from './personalnotes-detail.component';
import personalnotesActions from './personalnotes-actions';

export default {
  "name": 'personalnotes',
  "routes": routes,
  "reducer": reducer,
  "components": {
    personalnotesListComponent,
    personalnotesCreateComponent,
    personalnotesDetailComponent
  },
  "actions": {
    personalnotesActions
  },
  "sidebarInfo": {
    name: 'personalNotes',
    link: 'personalNotes',
    title: 'Personal Notes'
  }
}