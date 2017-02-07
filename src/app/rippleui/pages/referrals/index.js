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
import ReferralsListComponent from './referrals-list.component';
import ReferralsDetailComponent from './referrals-detail.component';
import ReferralsCreateComponent from './referrals-create.component';

angular.module('ripple-ui.referrals', [])
  .component('referralsListComponent', ReferralsListComponent)
  .component('referralsDetailComponent', ReferralsDetailComponent)
  .component('referralsCreateComponent', ReferralsCreateComponent);