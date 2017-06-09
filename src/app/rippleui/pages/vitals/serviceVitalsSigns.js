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

class ServiceVitalsSigns {

    constructor () {
        this.vitalsConfig = {
          respirationRate: [
            {
              label: '≤ 8',
              condition: function (value) {
                return value < 9
              },
              column: 1,
              point: 3
            }, {
              label: '9-11',
              condition: function (value) {
                return value > 8 && value < 12
              },
              column: 3,
              point: 1
            }, {
              label: '12-20',
              condition: function (value) {
                return value > 11 && value < 21
              },
              column: 4,
              point: 0
            }, {
              label: '21-24',
              condition: function (value) {
                return value > 20 && value < 25
              },
              column: 6,
              point: 2
            }, {
              label: '≥ 25',
              condition: function (value) {
                return value > 24
              },
              column: 7,
              point: 3
            }
          ],
          oxygenSaturation: [
            {
              label: '≤ 91',
              condition: function (value) {
                return value < 92
              },
              column: 1,
              point: 3
            }, {
              label: '92-93',
              condition: function (value) {
                return value == 92 || value == 93
              },
              column: 2,
              point: 2
            }, {
              label: '94-95',
              condition: function (value) {
                return value == 94 || value == 95
              },
              column: 3,
              point: 1
            }, {
              label: '≥ 96',
              condition: function (value) {
                return value > 95
              },
              column: 4,
              point: 0  
            }
          ],
          oxygenSupplemental: [
            {
              label: 'Yes',
              condition: function (value) {
                return value == true
              },
              column: 2,
              point: 2
            }, {
              label: 'No',
              condition: function (value) {
                return value == false
              },
              column: 4,
              point: 0
            }
          ],
          temperature: [
            {
              label: '≤ 35.0',
              condition: function (value) {
                return value <= 35
              },
              column: 1,
              point: 3
            }, {
              label: '35.1-36.0',
              condition: function (value) {
                return value > 35 && value <= 36
              },
              column: 3,
              point: 1
            }, {
              label: '36.1-38.0',
              condition: function (value) {
                return value > 36 && value <= 38
              },
              column: 4,
              point: 0
            }, {
              label: '38.1-39.0',
              condition: function (value) {
                return value > 38 && value <= 39
              },
              column: 5,
              point: 1
            }, {
              label: '≥ 39.1',
              condition: function (value) {
                return value > 39
              },
              column: 6,
              point: 2
            }
          ],
          systolicBP: [
            {
              label: '≤ 90',
              condition: function (value) {
                return value < 91
              },
              column: 1,
              point: 3
            }, {
              label: '91-100',
              condition: function (value) {
                return value > 90 && value < 101
              },
              column: 2,
              point: 2
            }, {
              label: '101-110',
              condition: function (value) {
                return value > 100 && value < 111
              },
              column: 3,
              point: 1
            }, {
              label: '111-219',
              condition: function (value) {
                return value > 110 && value < 220
              },
              column: 4,
              point: 0
            }, {
              label: '≥ 220',
              condition: function (value) {
                return value > 219
              },
              column: 7,
              point: 3
            }
          ],
          heartRate: [
            {
              label: '≤ 40',
              condition: function (value) {
                return value < 41
              },
              column: 1,
              point: 3
            }, {
              label: '41-50',
              condition: function (value) {
                return value > 40 && value < 51
              },
              column: 3,
              point: 1
            }, {
              label: '51-90',
              condition: function (value) {
                return value > 50 && value < 91
              },
              column: 4,
              point: 0
            }, {
              label: '91-110',
              condition: function (value) {
                return value > 90 && value < 111
              },
              column: 5,
              point: 1
            }, {
              label: '111-130',
              condition: function (value) {
                return value > 110 && value < 131
              },
              column: 6,
              point: 2
            }, {
              label: '≥ 131',
              condition: function (value) {
                return value > 130
              },
              column: 7,
              point: 3
            }
          ],
          levelOfConsciousness: [
            {
              label: 'A',
              condition: function (value) {
                return value == 'Alert'
              },
              column: 4,
              point: 0
            }, {
              label: 'V,P or U',
              condition: function (value) {
                return value == 'Verbal' || value == 'Pain' || value == 'Unresponsive'
              },
              column: 7,
              point: 3
            }
          ],
          newsScore: [
            {
              label: '0',
              condition: function (value) {
                return value == 0
              },
              column: 4
            }, {
              label: '1-4',
              condition: function (value) {
                return value > 0 && value < 5
              },
              column: 5
            }, {
              label: '5-6',
              condition: function (value) {
                return value == 5 || value == 6
              },
              column: 6
            }, {
              label: '> 7',
              condition: function (value) {
                return value > 6
              },
              column: 7
            }
          ]
        };

        this.pattern = {
          number: '\\d+',
          numberPoint: '\\d+(\\.\\d+)?',
          numberPersent: '^(0|([1-9][0-9]?)|(100))$'
        };


        this.getLabels = function () {
          var labels = {};
          
          for (var vital in this.vitalsConfig) {
            labels[vital] = [];

            for (var i = 0; i < this.vitalsConfig[vital].length; i++) {
              labels[vital].push({
                text: this.vitalsConfig[vital][i].label,
                place: this.vitalsConfig[vital][i].column
              });
            }
          }

          return labels;
        };

        this.getStatusOnValue = function (value, key) {
          var cache = this.getStatusOnValue.cache;
          var range, status;

          if (typeof cache[key] === 'undefined') cache[key] = {};
          if (typeof cache[key][value] != 'undefined') {
            return cache[key][value];
          }

          range = this.determineRangeOnValue(value, key);
          status = {
            point: range.point
          }

          switch (range.column) {
            case 1:
            case 7: 
              status.type = 'danger';
              break;
            case 2:
            case 6: 
              status.type = 'warning';
              break;
            case 3: 
            case 5: 
              status.type = 'success';
              break;
          }

          cache[key][value] = status;

          return status;
        };
        this.getStatusOnValue.cache = {};

        this.determineRangeOnValue = function (value, key) {
          var vitalRanges = this.vitalsConfig[key];

          if (vitalRanges) {
            for (var i = 0; i < vitalRanges.length; i++) {
              if (vitalRanges[i].condition(value)) {
                return {
                  column: vitalRanges[i].column,
                  point: vitalRanges[i].point
                };
              }
            }
          }

          return false;
        };

        this.setVitalStatuses = function (vital) {
          var vitalStatuses = {};

          for (var vitalConfig in this.vitalsConfig) {
            vitalStatuses[vitalConfig] = this.getStatusOnValue(vital[vitalConfig], vitalConfig);
          }

          return vitalStatuses;
        };

        this.modificateVitalsArr = function (arr) {
          let _ = require('underscore');
          
          arr = _.sortBy(arr, function (value) {
            return value.dateCreated;
          });

          for (var i = 0; i < arr.length; i++) {
            arr[i].id = i + 1;
            this.convertVitalCharacteristics(arr[i]);
            arr[i].statusNewsScore = this.getStatusOnValue(arr[i].newsScore, 'newsScore').type;
          }
          return arr;
        };

        this.convertVitalCharacteristics = function (vital) {
          vital.respirationRate = +vital.respirationRate;
          vital.diastolicBP = +vital.diastolicBP;
          vital.oxygenSaturation = +vital.oxygenSaturation;
          vital.temperature = +vital.temperature;
          vital.systolicBP = +vital.systolicBP;
          vital.heartRate = +vital.heartRate; 
          vital.oxygenSupplemental = vital.oxygenSupplemental == 'true' || vital.oxygenSupplemental == true;

          return vital;
        };

        this.countNewsScore = function (statuses) {
          var newsScore = 0;
          for (var status in statuses) {
            if (status !== 'newsScore' && statuses[status].point) {
              newsScore += statuses[status].point;
            }
          }

          return newsScore;
        };

        this.getHighlighterClass = function (status) {
          if (typeof status === 'undefined') return 'highlighter-not-vital;'

          return 'highlighter-' + (status.type || 'not-vital');
        };
    }
}

export default ServiceVitalsSigns;