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
import reducer from "./events-reducer-all";

import eventsListComponent from './events-list.component';
import eventsCreateComponent from './events-create.component';
import eventsDetailComponent from './events-detail.component';
import eventsActions from './events-actions';

export default {
  "name": 'events',
  "routes": routes,
  "reducer": reducer,
  "components": {
    eventsListComponent,
    eventsCreateComponent,
    eventsDetailComponent
  },
  "actions": {
    eventsActions
  },
  "sidebarInfo": {
    name: 'events',
    link: 'events',
    title: 'Events'
  }
}