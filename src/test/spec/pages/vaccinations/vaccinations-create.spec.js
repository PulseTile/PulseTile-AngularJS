'use strict';
import VaccinationsCreateComponent from '../../../../app/rippleui/pages/vaccinations/vaccinations-create.component';
import '../../../../app/index';

describe('Vaccinations Create', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, stateParams, state, ngRedux, referralsActions, usSpinnerService;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _vaccinationsActions_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;

        template = VaccinationsCreateComponent.template;
        ctrl = controller(VaccinationsCreateComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            patientsActions: _patientsActions_,
            vaccinationsActions: _vaccinationsActions_,
            usSpinnerService: _serviceRequests_
        });
    }));


    it('Template exist', function() {
        expect(template).toBeDefined();
    });
});