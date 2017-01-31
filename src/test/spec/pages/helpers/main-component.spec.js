'use strict';
import MainComponent from '../../../../app/helpers/main.component.js';
import '../../../../app/index';

describe('MainComponent', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, rootScope, $window, state, serviceRequests, foo, fetchedBar, bar;
    
    beforeEach(inject(($injector, $controller, _$rootScope_, _$window_, _$state_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        serviceRequests = _serviceRequests_;
        rootScope = _$rootScope_;
        $window = _$window_;
        state = _$state_;

        template = MainComponent.template;
        ctrl = controller(MainComponent.controller, {
            $scope: scope,
            $rootScope: rootScope,
            $window: $window,
            $state: state,
            serviceRequests: serviceRequests
        });
    }));
    beforeEach(function() {
        spyOn(ctrl, 'getPageComponents');

        ctrl.getPageComponents();
    });

    it('$scope.pageHeader exist', function() {
        expect(scope.classShowSidebar).toBe('');
    });
    it('$scope.mainWidth exist', function() {
        expect(scope.isSidebar).toBe(false);
    });
    it('$scope.detailWidth', function() {
        expect(scope.isSecondPanel).toBe(false);
    });
    it('Controller exist', function() {
        expect(ctrl).toBeDefined();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it("serviceRequests exist", function() {
        expect(serviceRequests).toBeDefined();
    });
    it("getPageComponents was called", function() {
        expect(ctrl.getPageComponents).toHaveBeenCalled();
    });
});