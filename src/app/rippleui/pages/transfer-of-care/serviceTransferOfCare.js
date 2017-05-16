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

class serviceTransferOfCare {

  constructor (diagnosesActions, eventsActions, vitalsActions, referralsActions, medicationsActions) {
    this.currentData = null;
    this.config = {
      diagnosis: {
        title: 'Problems / Diagnosis',
        actionsFuncAll: diagnosesActions.all,
        actionsFuncOne: diagnosesActions.get,
        records: null
      },
      medications: {
        title: 'Medications',
        actionsFuncAll: medicationsActions.all,
        actionsFuncOne: medicationsActions.get,
        records: null
      },
      referrals: {
        title: 'Referrals',
        actionsFuncAll: referralsActions.all,
        actionsFuncOne: referralsActions.get,
        records: null
      },
      events: {
        title: 'Events',
        actionsFuncAll: eventsActions.all,
        actionsFuncOne: eventsActions.get,
        records: null
      },
      vitals: {
        title: 'Vitals',
        actionsFuncAll: vitalsActions.all,
        actionsFuncOne: vitalsActions.get,
        records: null
      }
    }

    this.cache = {};

    /* istanbul ignore next */
    this.getConfig = function () {
      return this.config;
    };

    this.isInCache = function (type, id) {
      console.log(this.cache);
      if (this.cache[type] && this.cache[type][id]) {
        return true;
      }

      return false;
    };

    this.setInCache = function (type, id, data) {
      if (typeof this.cache[type] === 'undefined') {
        this.cache[type] = {};
      }

      this.cache[type][id] = data;
    };

    this.getInCache = function (type, id) {
      return this.cache[type][id];
    };
  }
}
serviceTransferOfCare.$inject = ['diagnosesActions', 'eventsActions', 'vitalsActions', 'referralsActions', 'medicationsActions'];
export default serviceTransferOfCare;