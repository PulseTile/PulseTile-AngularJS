'use strict';
import TransferOfCareDetailComponent from '../../../../app/pulsetileui/pages/transfer-of-care/transfer-of-care-detail.component';
import '../../../../app/index';

describe('Transfer Of Care Details', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state, stateParams, ngRedux, transferOfCareActions, usSpinnerService, serviceRequests;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _transferOfCareActions_, _usSpinnerService_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;
        stateParams = _$stateParams_;
        ngRedux = _$ngRedux_;
        transferOfCareActions = _transferOfCareActions_;
        usSpinnerService = _usSpinnerService_;
        serviceRequests = _serviceRequests_;

        template = TransferOfCareDetailComponent.template;
        ctrl = controller(TransferOfCareDetailComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: stateParams,
            $ngRedux: ngRedux,
            transferOfCareActions: transferOfCareActions,
            usSpinnerService: usSpinnerService,
            serviceRequests: serviceRequests
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'setCurrentPageData');

        ctrl.setCurrentPageData();

    });

    it("Controller exist", function() {
        expect(ctrl).toBeDefined();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });

    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
});