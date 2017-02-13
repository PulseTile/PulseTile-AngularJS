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
import angular from 'angular';

import patientsActions from '../rippleui/pages/patients-list/patients-actions';
import searchActions from '../rippleui/search/search-actions';
import searchReport from '../rippleui/search/search-report-actions';
import medicationsActions from '../rippleui/pages/medications/medications-actions';
import vaccinationsActions from '../rippleui/pages/vaccinations/vaccinations-actions';
import vitalsActions from '../rippleui/pages/vitals/vitals-actions';
import ordersActions from '../rippleui/pages/orders/orders-actions';
import resultsActions from '../rippleui/pages/results/results-actions';
import referralsActions from '../rippleui/pages/referrals/referrals-actions';
import proceduresActions from '../rippleui/pages/procedures/procedures-actions';
import imageActions from '../rippleui/pages/dicom/image-actions';
import personalnotesActions from '../rippleui/pages/personal-notes/personalnotes-actions';
import heightAndWeightActions from '../rippleui/pages/height-and-weight/heightAndWeight-actions';
import genericmdtActions from '../rippleui/pages/generic-mdt/generic-mdt-actions';
import transferOfCareActions from '../rippleui/pages/transfer-of-care/transfer-of-care-actions';
import plugins from '../plugins';

let app = angular
  .module('app.actions', [])
  .factory('patientsActions', patientsActions)
  .factory('searchActions', searchActions)
  .factory('searchReport', searchReport)
  .factory('medicationsActions', medicationsActions)
  .factory('vaccinationsActions', vaccinationsActions)
  .factory('vitalsActions', vitalsActions)
  .factory('ordersActions', ordersActions)
  .factory('resultsActions', resultsActions)
  .factory('referralsActions', referralsActions)
  .factory('proceduresActions', proceduresActions)
  .factory('imageActions', imageActions)
  .factory('personalnotesActions', personalnotesActions)
  .factory('heightAndWeightActions', heightAndWeightActions)
  .factory('genericmdtActions', genericmdtActions)
  .factory('transferOfCareActions', transferOfCareActions)

plugins.forEach((plugin)=>{
  Object.keys(plugin.actions).forEach((name)=>{
    app = app.factory(name, plugin.actions[name]);
  })
});

export default app.name;