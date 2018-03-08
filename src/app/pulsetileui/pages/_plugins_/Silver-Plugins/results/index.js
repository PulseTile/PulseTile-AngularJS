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
import reducer from "./results-reducer-all";
import resultsListComponent from './results-list.component';
import resultsDetailComponent from './results-detail.component';
import resultsActions from './results-actions';

export default {
  "name": 'results',
  "routes": routes,
  "reducer": reducer,
  "components": {
    resultsListComponent,
    resultsDetailComponent
  },
  "actions": {
    resultsActions
  },
  "sidebarInfo": {
    name: 'results',
    link: 'results',
    title: 'Test Results'
  }
}