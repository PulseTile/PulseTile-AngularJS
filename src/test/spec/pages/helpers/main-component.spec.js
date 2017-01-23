'use strict';
import MainComponent from '../../../../app/helpers/main.component.js';
import '../../../../app/index';

describe('MainComponent', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, rootScope, $scope, serviceRequests;

    beforeEach(inject(($injector, $controller, _$rootScope_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        serviceRequests = _serviceRequests_;
        rootScope = _$rootScope_;

        template = MainComponent.template;
        ctrl = controller(MainComponent.controller, {
            $rootScope: rootScope,
            $scope: scope,
            serviceRequests: serviceRequests
        });
    }));
    beforeEach(function() {
        spyOn(scope, 'getState');
        spyOn(ctrl, 'getPageComponents');

        scope.getState();
        ctrl.getPageComponents();
    });

    // it('$scope.previousState exist', function() {
    //     expect(scope.previousState).toBe('');
    // });
    // it('$scope.pageHeader exist', function() {
    //     expect(scope.classShowSidebar).toBe('');
    // });
    // it('$scope.previousPage exist', function() {
    //     expect(scope.previousPage).toBe('');
    // });
    // it('$scope.mainWidth exist', function() {
    //     expect(scope.isSidebar).toBe(false);
    // });
    // it('$scope.detailWidth', function() {
    //     expect(scope.isSecondPanel).toBe(false);
    // });
    // it('Controller exist', function() {
    //     expect(ctrl).toBeDefined();
    // });
    // it('Template exist', function() {
    //     expect(template).toBeDefined();
    // });
    // it("serviceRequests exist", function() {
    //     expect(serviceRequests).toBeDefined();
    // });
    // it("getState was called", function() {
    //     expect(scope.getState).toHaveBeenCalled();
    // });
    // it("getPageComponents was called", function() {
    //     expect(ctrl.getPageComponents).toHaveBeenCalled();
    // });
});