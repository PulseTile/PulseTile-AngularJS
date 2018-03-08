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
import clinicalnotes from './clinical-notes/index';
import dicom from './dicom/index';
import documents from './documents/index';
import orders from './orders/index';
import personalnotes from './personal-notes/index';
import procedures from './procedures/index';
import referrals from './referrals/index';
import results from './results/index';
import transferOfCare from './transfer-of-care/index';
import vaccinations from './vaccinations/index';
import vitals from './vitals/index';
import clinicalstatements from './clinical-statements/index';
import events from './events/index';
import drawings from './drawings/index';
import eolcareplans from './care-plans/index';
import heightAndWeight from './height-and-weight/index';

export default [
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
  transferOfCare,

  eolcareplans,
  heightAndWeight
]