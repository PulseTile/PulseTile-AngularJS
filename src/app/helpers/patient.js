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
export default function Patient($window) {
  /* istanbul ignore next */
  var patient = function (attributes) {
    var self = this;
    
    _.extend(this, attributes);
    self.age = function () {
      self.age = moment().diff(self.dateOfBirth, 'years');
      return moment().diff(self.dateOfBirth, 'years');
    };

    self.ageRange = (function () {
      var age = self.age();
      /* istanbul ignore next */
      switch (true) {
        case (age >= 0 && age <= 10):
          return '0-10';
        case (age >= 11 && age <= 18):
          return '11-18';
        case (age >= 19 && age <= 30):
          return '19-30';
        case (age >= 31 && age <= 60):
          return '31-60';
        case (age >= 61 && age <= 80):
          return '61-80';
        case (age > 80):
          return '>80';
        default:
          return;
      }
    })();
  };
  return {
    patient: patient
  };
}

Patient.$inject = ['$window'];
