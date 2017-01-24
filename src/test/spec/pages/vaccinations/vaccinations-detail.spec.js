'use strict';
import VaccinationsDetailComponent from '../../../../app/rippleui/pages/vaccinations/vaccinations-detail.component';
import '../../../../app/index';

describe('Vaccinations Details', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, stateParams, state, ngRedux, referralsActions, usSpinnerService;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _vaccinationsActions_, _serviceRequests_, _usSpinnerService_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;

        template = VaccinationsDetailComponent.template;
        ctrl = controller(VaccinationsDetailComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            patientsActions: _patientsActions_,
            vaccinationsActions: _vaccinationsActions_,
            serviceRequests: _serviceRequests_,
            usSpinnerService: _usSpinnerService_
        });
    }));


    it('Template exist', function() {
        expect(template).toBeDefined();
    });
});