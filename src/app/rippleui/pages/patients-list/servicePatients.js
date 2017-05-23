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
    this.queryPatientCounts = function (id, patient) {
      if (this.isQueryPatientsCounts(id)) {
        this.isQueryCache[id] = true;

        var options = {
            method: 'GET',
            url: '/api/patients/'+ id + '/counts'
        };
        console.log(' ----------> ' + id);

        $http(options).then(function (responce) {
          console.log(responce);
          console.log(patient);
          console.log(id);
          if (responce.data.length) {
            patient = Object.assign(patient, responce.data[0]);
          }
          // debugger
        }.bind(this));
      }
    };

    this.getAppSettings = function() {
    };
    
  }
}
servicePatients.$inject = ['patientsActions', '$http'];
export default servicePatients;