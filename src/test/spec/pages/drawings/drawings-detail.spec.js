'use strict';
import DrawingsComponent from '../../../../app/pulsetileui/pages/drawings/drawings-detail.component';
import '../../../../app/index';

describe('Drawings Details', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state, stateParams, ngRedux, drawingsActions, usSpinnerService, serviceRequests, $timeout, $window;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _drawingsActions_, _usSpinnerService_, _serviceRequests_, _$timeout_, _$window_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;
        stateParams = _$stateParams_;
        ngRedux = _$ngRedux_;
        drawingsActions = _drawingsActions_;
        usSpinnerService = _usSpinnerService_;
        serviceRequests = _serviceRequests_;
        $timeout = _$timeout_;
        $window = _$window_;

        template = DrawingsComponent.template;
        ctrl = controller(DrawingsComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: stateParams,
            $ngRedux: ngRedux,
            drawingsActions: drawingsActions,
            usSpinnerService: usSpinnerService,
            serviceRequests: serviceRequests,
            $timeout: $timeout,
            $window: $window
        });
    }));

    beforeEach(function() {
        spyOn(scope, 'confirmEdit');
        spyOn(scope, 'confirmEditDetail');
        spyOn(scope, 'resizeDrawing');
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(ctrl, 'edit');
        spyOn(ctrl, 'cancelEdit');
        spyOn(ctrl, 'editDetail');
        spyOn(ctrl, 'cancelEditDetail');

        scope.confirmEdit();
        scope.confirmEditDetail();
        scope.resizeDrawing();
        ctrl.setCurrentPageData();
        ctrl.edit();
        ctrl.cancelEdit();
        ctrl.editDetail();
        ctrl.cancelEditDetail();
    });

    it("Controller exist", function() {
        expect(ctrl).toBeDefined();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });

    it("confirmEdit was called", function() {
        expect(scope.confirmEdit).toHaveBeenCalled();
    });
    it("confirmEditDetail was called", function() {
        expect(scope.confirmEditDetail).toHaveBeenCalled();
    });
    it("resizeDrawing was called", function() {
        expect(scope.resizeDrawing).toHaveBeenCalled();
    });
    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
    it("edit was called", function() {
        expect(ctrl.edit).toHaveBeenCalled();
    });
    it("cancelEdit was called", function() {
        expect(ctrl.cancelEdit).toHaveBeenCalled();
    });
    it("editDetail was called", function() {
        expect(ctrl.editDetail).toHaveBeenCalled();
    });
    it("cancelEditDetail was called", function() {
        expect(ctrl.cancelEditDetail).toHaveBeenCalled();
    });
});