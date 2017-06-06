'use strict';
import DrawingsCreateComponent from '../../../../app/rippleui/pages/drawings/drawings-create.component';
import '../../../../app/index';

describe('Drawings Create', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state, stateParams, ngRedux, drawingsActions, serviceRequests, serviceFormatted, usSpinnerService, $window;

    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _drawingsActions_, _serviceRequests_, _serviceFormatted_, _usSpinnerService_, _$window_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;
        stateParams = _$stateParams_;
        ngRedux = _$ngRedux_;
        drawingsActions = _drawingsActions_;
        serviceRequests = _serviceRequests_;
        serviceFormatted = _serviceFormatted_;
        usSpinnerService = _usSpinnerService_;
        $window = _$window_;

        template = DrawingsCreateComponent.template;
        ctrl = controller(DrawingsCreateComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: stateParams,
            $ngRedux: ngRedux,
            drawingsActions: drawingsActions,
            serviceRequests: serviceRequests,
            serviceFormatted: serviceFormatted,
            usSpinnerService: usSpinnerService,
            $window: $window
        });
    }));

    beforeEach(function() {
        spyOn(scope, 'getCanvasImage64');
        spyOn(scope, 'resizeDrawing');
 
        spyOn(ctrl, 'goList');
        spyOn(ctrl, 'cancel');
        spyOn(ctrl, 'create');
        spyOn(ctrl, 'setCurrentPageData');

        scope.getCanvasImage64();
        scope.resizeDrawing();
        ctrl.goList();
        ctrl.cancel();
        ctrl.create();
        ctrl.setCurrentPageData();

    });

    it("Controller exist", function() {
        expect(ctrl).toBeDefined();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });

    it("getCanvasImage64 was called", function() {
        expect(scope.getCanvasImage64).toHaveBeenCalled();
    });
    it("resizeDrawing was called", function() {
        expect(scope.resizeDrawing).toHaveBeenCalled();
    });
    it("goList was called", function() {
        expect(ctrl.goList).toHaveBeenCalled();
    });
    it("cancel was called", function() {
        expect(ctrl.cancel).toHaveBeenCalled();
    });
    it("create was called", function() {
        expect(ctrl.create).toHaveBeenCalled();
    });
    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
});
