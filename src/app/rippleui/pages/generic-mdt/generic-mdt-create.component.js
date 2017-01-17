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
let templateGenericMdtCreate= require('./generic-mdt-create.html');

class GenericMdtCreateController {
    constructor($scope, $state, $stateParams, $ngRedux, patientsActions, genericmdtActions, serviceRequests) {
        $scope.genericMdt = {};
        $scope.genericMdt.dateSubmitted = new Date();
        // $scope.contact.dateSubmitted = new Date().toISOString().slice(0, 10);
        $scope.genericMdt.relationshipCode = 'at0039';
        $scope.genericMdt.relationshipTerminology = 'local';

        $scope.openDatepicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
        };
        
        this.setCurrentPageData = function (data) {
            if (data.genericmdt.dataCreate !== null) {
                this.goList();
            }
            if (data.patientsGet.data) {
                $scope.currentPatient = data.patientsGet.data;
            }
            if (serviceRequests.currentUserData) {
                $scope.currentUser = serviceRequests.currentUserData;
            }
        };

        this.goList = function () {
            $state.go('genericMdt', {
                patientId: $stateParams.patientId,
                reportType: $stateParams.reportType,
                searchString: $stateParams.searchString,
                queryType: $stateParams.queryType
            });
        };
        
        this.cancel = function () {
            this.goList();
        };
        
        $scope.create = function (mdtForm, genericMdt) {
            $scope.formSubmitted = true;

            if (mdtForm.$valid) {
                $scope.genericmdtCreate($scope.currentPatient.id, genericMdt);
                this.goList();
            }
        };

        let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: this.setCurrentPageData(state)
        }))(this);

        $scope.$on('$destroy', unsubscribe);

        $scope.genericmdtCreate = genericmdtActions.create;
    }
}

const GenericMdtCreateComponent = {
    template: templateGenericMdtCreate,
    controller: GenericMdtCreateController
};

GenericMdtCreateController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'genericmdtActions', 'serviceRequests'];
export default GenericMdtCreateComponent;