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
let _ = require('lodash');

class ServiceFormatted {

  constructor () {
    this.formatCollection = {
      DDMMMYYYY: 'DD-MMM-YYYY',
      DDMMMMYYYY: 'DD MMMM YYYY',
      HHmm: 'HH:mm',
      DDMMMYYYYHHmm: 'DD-MMM-YYYY  HH:mm'
    };
    this.filteringKeys = [];
    this.filteringKeys2 = [];

    /* istanbul ignore next  */
    this.formattingDate = function(date, format) {
      var dateType;
      
      if (date) {
        if (angular.isNumber(date)) {
          return moment(date).format(format);
        } else {
          dateType = new Date(date).getTime();
          return moment(dateType).format(format);
        }
      }

      return;
    };

    /* istanbul ignore next  */
    this.formattingTablesDate = function(collection, dateArgs, format) {
      for (var i = 0; i < collection.length; i++) {
        for (var j = 0; j < dateArgs.length; j++) {
          collection[i][dateArgs[j]] = this.formattingDate(collection[i][dateArgs[j]], format);
        }
      }
      return collection;
    };

    /* istanbul ignore next  */
    this.formattedSearching = function(row, query) {
      var str = '';
      var farmatedStr;
      
      Object.keys(row).map((key, index)=>{
        if (typeof row[key] !== 'string') {
          row[key] += '';
        }
        if (this.filteringKeys.indexOf(key) !== -1) {
          str += ' ' + row[key].toLowerCase();
        }
        farmatedStr = str.indexOf(query.toLowerCase() || '') !== -1;
      });
      
      return farmatedStr;
    };
    this.formattedSearching2 = function(row, query) {
      var str = '';
      var farmatedStr;

      Object.keys(row).map((key, index)=>{
        if (typeof row[key] !== 'string') {
          row[key] += '';
        }
        if (this.filteringKeys2.indexOf(key) !== -1) {
          str += ' ' + row[key].toLowerCase();
        }
        query = query.replace('&nbsp;', ' ');
        farmatedStr = str.indexOf(query.toLowerCase() || '') !== -1;
      });

      return farmatedStr;
    };
      
  };
}

ServiceFormatted.$inject = [];
export default ServiceFormatted;