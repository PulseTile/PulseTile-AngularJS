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

class serviceTransferOfCare {

  constructor (diagnosesActions, eventsActions, vitalsActions, referralsActions, medicationsActions, serviceFormatted) {
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
    
    /* istanbul ignore next */
    this.isInCache = function (type, id) {
      if (this.cache[type] && this.cache[type][id]) {
        return true;
      }

      return false;
    };

    /* istanbul ignore next */
    this.setInCache = function (type, id, data) {
      if (typeof this.cache[type] === 'undefined') {
        this.cache[type] = {};
      }

      this.cache[type][id] = data;
    };

    /* istanbul ignore next */
    this.getInCache = function (type, id) {
      return this.cache[type][id];
    };

    /* istanbul ignore next */
    this.changeArraysForTable = function (arr, name, date) {
      arr.map(function (el) {
        el.date = serviceFormatted.formattingDate(el[date], serviceFormatted.formatCollection.DDMMMYYYY);
        el.tableName = el[name];
        el.selectName = el[name];
        return el;
      });
    };

    /* istanbul ignore next */
    this.setDiagnosisRecords = function (data) {
      this.config.diagnosis.records = data;
      this.changeArraysForTable(this.config.diagnosis.records, 'problem', 'dateOfOnset');
    };

    /* istanbul ignore next */
    this.setMedicationRecords = function (data) {
      this.config.medications.records = data;
      this.changeArraysForTable(this.config.medications.records, 'name', 'dateCreated');
    };

    /* istanbul ignore next */
    this.setReferralsRecords = function (data) {
      this.config.referrals.records = data;
      this.config.referrals.records.map(function (el) {
        var date = serviceFormatted.formattingDate(el.dateOfReferral, serviceFormatted.formatCollection.DDMMMYYYY);
        el.date = date;
        el.tableName = date + ' ' + el.referralFrom + ' ' + el.referralTo;
        el.selectName = date + ' - ' + el.referralFrom + ' -> ' + el.referralTo;
        return el;
      });
    };

    /* istanbul ignore next */
    this.modificateEventsArr = function (arr) {
      // goto: Later types will come
      arr = _.chain(arr)
            .filter(function (value) {
              return value.dateOfAppointment;
            })
            .each(function (value, index) {
              value.type = 'Appointment';
              value.date = serviceFormatted.formattingDate(value.dateOfAppointment, serviceFormatted.formatCollection.DDMMMYYYY);
              value.tableName = value.serviceTeam;
              value.selectName = value.serviceTeam;
              return value;
            })
            .groupBy(function(value) {
              return value.type;
            })
            .value();

      return arr;
    };

    /* istanbul ignore next */
    this.setEventsRecords = function (data) {
      this.config.events.records = this.modificateEventsArr(data);
    };

    /* istanbul ignore next */
    this.setVitalsRecords = function (data) {
      this.config.vitals.records = [];
      this.config.vitals.records.push(data[1]);

      this.config.vitals.records[0].date = serviceFormatted.formattingDate(this.config.vitals.records[0].dateCreate, serviceFormatted.formatCollection.DDMMMYYYY);
      this.config.vitals.records[0].selectName = 'Latest Vitals Data';
      this.config.vitals.records[0].tableName = 'Latest Vitals Data (News Score: ' + this.config.vitals.records[0].newsScore + ')';
    };
  }
}
serviceTransferOfCare.$inject = ['diagnosesActions', 'eventsActions', 'vitalsActions', 'referralsActions', 'medicationsActions', 'serviceFormatted'];
export default serviceTransferOfCare;