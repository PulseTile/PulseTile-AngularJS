'use strict';
import TransferOfCareDetailComponent from '../../../../app/rippleui/pages/transfer-of-care/transfer-of-care-detail.component';
import '../../../../app/index';

describe('Vaccinations List', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _transferOfCareActions_, _serviceRequests_, _usSpinnerService_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;

        template = TransferOfCareDetailComponent.template;
        ctrl = controller(TransferOfCareDetailComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            transferOfCareActions: _transferOfCareActions_,
            serviceRequests: _serviceRequests_,
            usSpinnerService: _usSpinnerService_
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'setCurrentPageData');

        ctrl.setCurrentPageData();

    });

    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });
});