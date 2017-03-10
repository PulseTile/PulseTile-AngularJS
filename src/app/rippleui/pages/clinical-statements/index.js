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
import reducer from "./clinicalstatements-reducer-all";
import clinicalstatementsListComponent from './clinicalstatements-list.component';
import clinicalstatementsCreateComponent from './clinicalstatements-create.component';
import clinicalstatementsDetailComponent from './clinicalstatements-detail.component';
import clinicalstatementsActions from './clinicalstatements-actions';

export default {
    "name": 'clinicalstatements',
    "routes": routes,
    "reducer": reducer,
    "components": {
        clinicalstatementsListComponent,
        clinicalstatementsCreateComponent,
        clinicalstatementsDetailComponent
    },
    "actions": {
        clinicalstatementsActions
    },
    "sidebarInfo": {
        name: 'clinicalStatements',
        link: 'clinicalstatements',
        title: 'Clinical Statements'
    }
}