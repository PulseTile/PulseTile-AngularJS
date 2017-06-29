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
import clinicalnotes from './pulsetileui/pages/clinical-notes/index';
import allergies from './pulsetileui/pages/allergies/index';
import eolcareplans from './pulsetileui/pages/care-plans/index';
import contacts from './pulsetileui/pages/contacts/index';
import diagnoses from './pulsetileui/pages/diagnoses/index';
import dicom from './pulsetileui/pages/dicom/index';
import documents from './pulsetileui/pages/documents/index';
import genericmdt from './pulsetileui/pages/generic-mdt/index';
import heightAndWeight from './pulsetileui/pages/height-and-weight/index';
import medication from './pulsetileui/pages/medications/index';
import orders from './pulsetileui/pages/orders/index';
import personalnotes from './pulsetileui/pages/personal-notes/index';
import procedures from './pulsetileui/pages/procedures/index';
import referrals from './pulsetileui/pages/referrals/index';
import results from './pulsetileui/pages/results/index';
import transferOfCare from './pulsetileui/pages/transfer-of-care/index';
import vaccinations from './pulsetileui/pages/vaccinations/index';
import vitals from './pulsetileui/pages/vitals/index';
import clinicalstatements from './pulsetileui/pages/clinical-statements/index';
import events from './pulsetileui/pages/events/index';
import drawings from './pulsetileui/pages/drawings/index';

export default [
  diagnoses,
  medication,
  allergies,
  contacts,
  
  events,
  documents,
  
  orders,
  results,
  procedures,
  
  clinicalnotes,
  clinicalstatements,
  personalnotes,

  vaccinations,
  vitals,

  dicom,
  drawings,
  
  referrals,
  genericmdt,
  transferOfCare,
  
  eolcareplans,
  heightAndWeight
]