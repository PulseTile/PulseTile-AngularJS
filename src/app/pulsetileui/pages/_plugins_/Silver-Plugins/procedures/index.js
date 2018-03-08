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
import reducer from "./procedures-reducer-all";
import proceduresListComponent from './procedures-list.component';
import proceduresDetailComponent from './procedures-detail.component';
import proceduresCreateComponent from './procedures-create.component';
import proceduresActions from './procedures-actions';

export default {
  "name": 'procedures',
  "routes": routes,
  "reducer": reducer,
  "components": {
    proceduresListComponent,
    proceduresCreateComponent,
    proceduresDetailComponent
  },
  "actions": {
    proceduresActions
  },
  "sidebarInfo": {
    name: 'procedures',
    link: 'procedures',
    title: 'Procedures'
  }
}