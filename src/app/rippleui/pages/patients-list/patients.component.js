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
let templatePatients = require('./patients-list.html');

class PatientsController {
  constructor($scope, $state, $stateParams, $location, $ngRedux, patientsActions, serviceRequests, Patient) {
    let vm = this;

    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-list'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Lists', isShowTitle: true});
    
    vm.query = '';
    vm.isFilter = false;
    
    vm.toggleFilter = function () {
      vm.isFilter = !vm.isFilter;
    };

    vm.sort = function (field) {
      var reverse = vm.reverse;
      
      if (vm.order === field) {
        vm.reverse = !reverse;
      } else {
        vm.order = field;
        vm.reverse = false;
      }
    };

    vm.sortClass = function (field) {
      if (vm.order === field) {
        return vm.reverse ? 'sorted desc' : 'sorted asc';
      }
    };

    vm.go = function (patient) {
      $state.go('patients-summary', {
        patientId: patient.id,
        patientsList: vm.patients
      });
    };

    vm.patientFilter = function (patient) {
      if (vm.filters.department) {
        return (patient.department === vm.filters.department);
      }

      if (vm.filters.ageRange) {
        return (patient.ageRange === vm.filters.ageRange);
      }

      return true;
    };

    vm.setPatients = function (patients) {
      var curPatients = [];

      angular.forEach(patients, function (patient) {
        var curPatient = new Patient.patient(patient);
        curPatients.push(curPatient);
      });

      vm.patients = curPatients.slice();
    };

    if ($stateParams.patientsList.length === 0 && !$stateParams.displayEmptyTable) {
      vm.order = $stateParams.order || 'nhsNumber';
      vm.reverse = $stateParams.reverse === 'true';
      vm.filters = {
        department: $stateParams.department,
        ageRange: $stateParams.ageRange
      };

      let unsubscribe = $ngRedux.connect(state => ({
        isFetching: state.patients.isFetching,
        error: state.patients.error,
        // patients: state.patients.data,
        getPatients: vm.setPatients(state.patients.data)
      }))(this);

      $scope.$on('$destroy', unsubscribe);

      this.loadPatientsList = patientsActions.loadPatients;
      this.loadPatientsList();
    } else {
      // vm.patients = $stateParams.patientsList;
      vm.filters = {
        advancedSearch: true,
        advancedSearchParams: $stateParams.advancedSearchParams
      };
      vm.setPatients($stateParams.patientsList);
      $location.url($location.path());

    }
  }
}

const PatientsComponent = {
  template: templatePatients,
  controller: PatientsController
};

PatientsController.$inject = ['$scope', '$state', '$stateParams', '$location', '$ngRedux', 'patientsActions', 'serviceRequests', 'Patient'];
export default PatientsComponent;