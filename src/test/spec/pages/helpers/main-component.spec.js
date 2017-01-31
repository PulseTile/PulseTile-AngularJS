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
        spyOn(scope, 'getState');
        spyOn(ctrl, 'getPageComponents');

        scope.getState('main-search');
        ctrl.getPageComponents();
    });

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            },
            getBar: function() {
                return bar;
            }
        };

        spyOn(foo, 'getBar').and.callThrough();

        foo.setBar(123);
        fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", function() {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not affect other functions", function() {
        expect(bar).toEqual(123);
    });

    it('$scope.previousState exist', function() {
        expect(scope.previousState).toBe('');
    });
    it('$scope.pageHeader exist', function() {
        expect(scope.classShowSidebar).toBe('');
    });
    it('$scope.previousPage exist', function() {
        expect(scope.previousPage).toBe('');
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
    it("getState was called", function() {
        expect(scope.getState).toHaveBeenCalled();
    });
    it("getState was called with params", function() {
        expect(scope.getState).toHaveBeenCalledWith('main-search');
    });
    it("getPageComponents was called", function() {
        expect(ctrl.getPageComponents).toHaveBeenCalled();
    });
});