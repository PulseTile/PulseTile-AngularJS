class servicePatients {

  constructor (patientsActions, $http) {
    this.isQueryCache = {};

    /* istanbul ignore next */
    this.isQueryPatientsCounts = function (id) {
      if (this.isQueryCache[id]) {
        return false;
      }

      return true;
    };

    /* istanbul ignore next */
    this.clearCache = function (id) {
      this.isQueryCache = {};
    };

    /* istanbul ignore next */
    this.queryPatientCounts = function (id, patient) {
      if (this.isQueryPatientsCounts(id)) {
        this.isQueryCache[id] = true;

        var options = {
            method: 'GET',
            url: '/api/patients/'+ id + '/counts'
        };

        $http(options).then(function (responce) {
          if (responce.data.length) {
            patient = Object.assign(patient, responce.data[0]);
          }
        }.bind(this));
      }
    };
    
  }
}
servicePatients.$inject = ['patientsActions', '$http'];
export default servicePatients;