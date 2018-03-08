/*
 ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
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
import reducer from "./medications-reducer-all";
import medicationsListComponent from './medications-list.component';
import medicationsCreateComponent from './medications-create.component';
import medicationsDetailComponent from './medications-detail.component';
import medicationsActions from './medications-actions';
export default {
  "name": 'medication',
  "routes": routes,
  "reducer": reducer,
  "components": {
    medicationsListComponent,
    medicationsCreateComponent,
    medicationsDetailComponent
  },
  "actions": {
    medicationsActions
  },
  "sidebarInfo": {
    name: 'medications',
    link: 'medications',
    title: 'Medications'
  }
}