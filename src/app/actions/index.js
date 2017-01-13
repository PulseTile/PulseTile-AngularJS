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
import userActions from './user';
import searchActions from '../rippleui/search/search-actions';
import searchReport from '../rippleui/search/search-report-actions';
import diagnosesActions from '../rippleui/pages/diagnoses/diagnoses-actions';
import allergiesActions from '../rippleui/pages/allergies/allergies-actions';
import medicationsActions from '../rippleui/pages/medications/medications-actions';
import contactsActions from '../rippleui/pages/contacts/contacts-actions';
import vaccinationsActions from '../rippleui/pages/vaccinations/vaccinations-actions';
import ordersActions from '../rippleui/pages/orders/orders-actions';
import resultsActions from '../rippleui/pages/results/results-actions';
import referralsActions from '../rippleui/pages/referrals/referrals-actions';
import proceduresActions from '../rippleui/pages/procedures/procedures-actions';
import documentsActions from '../rippleui/pages/documents/documents-actions.js';
import appointmentsActions from '../rippleui/pages/appointments/appointments-actions';
import imageActions from '../rippleui/pages/dicom/image-actions';
import eolcareplansActions from '../rippleui/pages/care-plans/eolcareplans-actions';
import personalnotesActions from '../rippleui/pages/clinical-notes/clinicalnotes-actions';
import heightAndWeightActions from '../rippleui/pages/height-and-weight/heightAndWeight-actions';
import genericmdtActions from '../rippleui/pages/generic-mdt/generic-mdt-actions';
import transferOfCareActions from '../rippleui/pages/transfer-of-care/transfer-of-care-actions';

export default angular
    .module('app.actions', [])
    .factory('patientsActions', patientsActions)
    .factory('userActions', userActions)
    .factory('searchActions', searchActions)
    .factory('searchReport', searchReport)
    .factory('diagnosesActions', diagnosesActions)
    .factory('allergiesActions', allergiesActions)
    .factory('medicationsActions', medicationsActions)
    .factory('contactsActions', contactsActions)
    .factory('vaccinationsActions', vaccinationsActions)
    .factory('ordersActions', ordersActions)
    .factory('resultsActions', resultsActions)
    .factory('referralsActions', referralsActions)
    .factory('proceduresActions', proceduresActions)
    .factory('documentsActions', documentsActions)
    .factory('appointmentsActions', appointmentsActions)
    .factory('imageActions', imageActions)
    .factory('eolcareplansActions', eolcareplansActions)
    .factory('personalnotesActions', personalnotesActions)
    .factory('heightAndWeightActions', heightAndWeightActions)
    .factory('genericmdtActions', genericmdtActions)
    .factory('transferOfCareActions', transferOfCareActions)
    .name;