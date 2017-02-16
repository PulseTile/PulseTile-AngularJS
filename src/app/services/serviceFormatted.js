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
let _ = require('lodash');

class ServiceFormatted {

  constructor () {
    this.farmatCollection = {
      DDMMMYYYY: 'DD-MMM-YYYY'
    };

    this.formattingTablesDate = function(collection, dateArgs) {
      for (var i = 0; i < collection.length; i++) {
        for (var j = 0; j < dateArgs.length; j++) {
          collection[i][dateArgs[j]] = moment(collection[i][dateArgs[j]]).format(this.farmatCollection.DDMMMYYYY);
        }
      }
      return collection;
    };

    this.formattedSearching = function(collection, dateArgs) {
      // return (
          // row.testName.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
          // row.sampleTaken.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
          // row.dateCreated.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
          // row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      // );
    };
      
  };
}

ServiceFormatted.$inject = [];
export default ServiceFormatted;