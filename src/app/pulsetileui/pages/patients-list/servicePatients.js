import { httpHandleErrors } from '../../handle-errors/handle-errors-actions';
import { httpSetTokenToCookie } from '../../../helpers/httpMiddleware';

class servicePatients {
  constructor (patientsActions, $http, $ngRedux) {
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

        $http(options).then(response => {
          httpSetTokenToCookie(response.data);
          return response;
        }).then(function (responce) {
          if (responce.data.length) {
            patient = Object.assign(patient, responce.data[0]);
          }
        }.bind(this)).catch(function (err) {
					$ngRedux.dispatch(httpHandleErrors(err));
				});
      }
    };
    
  }
}
servicePatients.$inject = ['patientsActions', '$http', '$ngRedux'];
export default servicePatients;