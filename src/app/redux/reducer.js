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
import { combineReducers } from 'redux';

import patients from '../rippleui/pages/patients-list/patients-reducer-all';
import patientsGet from '../rippleui/pages/patients-list/patients-reducer-get';
import user from './user';
import search from '../rippleui/search/search-reducer-all';
import diagnoses from '../rippleui/pages/diagnoses/diagnoses-reducer-all';
import allergies from '../rippleui/pages/allergies/allergies-reducer-all';
import medication from '../rippleui/pages/medications/medication-reducer-all';
import contacts from '../rippleui/pages/contacts/contacts-reducer-all';
import orders from '../rippleui/pages/orders/orders-reducer-all';
import referrals from '../rippleui/pages/referrals/referrals-reducer-all';
import procedures from '../rippleui/pages/procedures/procedures-reducer-all';
import results from '../rippleui/pages/results/results-reducer-all';
import chart from '../rippleui/search/chart-reducer-get';
import documents from '../rippleui/pages/documents/documents-reducer-all';
import documentsFindDischarge from '../rippleui/pages/documents/documents-reducer-find-discharge';
import documentsFindReferral from '../rippleui/pages/documents/documents-reducer-find-referral';
import documentsUploadDischarge from '../rippleui/pages/documents/documents-reducer-upload-discharge';
import documentsUploadReferral from '../rippleui/pages/documents/documents-reducer-upload-referral';
import appointments from '../rippleui/pages/appointments/appointments-reducer-all';
import studies from '../rippleui/pages/dicom/studies-reducer-all';
import series from '../rippleui/pages/dicom/series-reducer-all';
import instanceGet from '../rippleui/pages/dicom/instance-reducer-get';
import instanceIdGet from '../rippleui/pages/dicom/instance-id-reducer-get';
import eolcareplans from '../rippleui/pages/care-plans/eolcareplans-reducer-all';
import heightAndWeight from '../rippleui/pages/height-and-weight/heightAndWeight-reducer-all';
import personalnotes from '../rippleui/pages/clinical-notes/clinicalnotes-reducer-all';
import genericmdt from '../rippleui/pages/generic-mdt/generic-mdt-reducer-all';
import transferOfCare from '../rippleui/pages/transfer-of-care/transfer-of-care-reducer-all';

export default combineReducers({
  patients,
  patientsGet,
  user, 
  search, 
  diagnoses,
  allergies,
  medication,
  contacts,
  orders,
  referrals,
  procedures,
  results,
  chart,
  documents,
  documentsFindDischarge,
  documentsFindReferral,
  documentsUploadDischarge,
  documentsUploadReferral,
  appointments,
  studies,
  series,
  instanceGet,
  instanceIdGet,
  eolcareplans,
  heightAndWeight,
  personalnotes,
  genericmdt,
  transferOfCare
});