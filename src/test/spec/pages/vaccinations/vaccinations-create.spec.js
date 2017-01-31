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

    beforeEach(function() {
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(ctrl, 'goList');
        spyOn(ctrl, 'cancel');
        spyOn(scope, 'vaccinationsCreate');
        spyOn(scope, 'create');

        ctrl.setCurrentPageData();
        ctrl.goList();
        ctrl.cancel();
        scope.vaccinationsCreate();
        scope.create();

    });

    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
    it("goList was called", function() {
        expect(ctrl.goList).toHaveBeenCalled();
    });
    it("cancel was called", function() {
        expect(ctrl.cancel).toHaveBeenCalled();
    });
    it("vaccinationsCreate was called", function() {
        expect(scope.vaccinationsCreate).toHaveBeenCalled();
    });
    it("create was called", function() {
        expect(scope.create).toHaveBeenCalled();
    });
});