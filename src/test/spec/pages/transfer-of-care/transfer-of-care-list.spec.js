'use strict';
import TransferOfCareListComponent from '../../../../app/pulsetileui/pages/transfer-of-care/transfer-of-care-list.component';
import '../../../../app/index';

describe('Transfer Of Care List', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state, stateParams, ngRedux, transferOfCareActions, serviceRequests, usSpinnerService, serviceFormatted;

    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _transferOfCareActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;
        stateParams = _$stateParams_;
        ngRedux = _$ngRedux_;
        transferOfCareActions = _transferOfCareActions_;
        serviceRequests = _serviceRequests_;
        usSpinnerService = _usSpinnerService_;
        serviceFormatted = _serviceFormatted_;

        template = TransferOfCareListComponent.template;
        
        ctrl = controller(TransferOfCareListComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: stateParams,
            $ngRedux: ngRedux,
            transferOfCareActions: transferOfCareActions,
            serviceRequests: serviceRequests,
            usSpinnerService: usSpinnerService,
            serviceFormatted: serviceFormatted
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'create');
        spyOn(ctrl, 'go');
        spyOn(ctrl, 'setCurrentPageData');

        ctrl.create();
        ctrl.go();
        ctrl.setCurrentPageData();

    });

    it("Controller exist", function() {
        expect(ctrl).toBeDefined();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });

    it("create was called", function() {
        expect(ctrl.create).toHaveBeenCalled();
    });
    it("go was called", function() {
        expect(ctrl.go).toHaveBeenCalled();
    });
    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
    


});