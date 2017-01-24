'use strict';
import ReportChartComponent from '../../../../app/rippleui/search/report-chart.component';
import '../../../../app/index';

describe('ReportChartComponent', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, state, template, serviceRequests;
    
    beforeEach(inject(($injector, $controller, _$rootScope_, _$window_, _$uibModal_, _$state_, _$stateParams_, _searchReport_, _$timeout_, _$ngRedux_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;

        template = ReportChartComponent.template;
        ctrl = controller(ReportChartComponent.controller, {
            $scope: scope,
            $rootScope: _$rootScope_,
            $window: _$window_,
            $uibModal: _$uibModal_,
            $state: _$state_,
            $stateParams: _$stateParams_,
            searchReport: _searchReport_,
            $timeout: _$timeout_,
            $ngRedux: _$ngRedux_,
            serviceRequests: _serviceRequests_
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'openModal');
        spyOn(ctrl, 'ageChart');
        spyOn(ctrl, 'setDataRequest');

        ctrl.openModal();
        ctrl.ageChart();
        ctrl.setDataRequest();
    });

    it('Controller exist', function() {
        expect(ctrl).toBeDefined();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it("openModal was called", function() {
        expect(ctrl.openModal).toHaveBeenCalled();
    });
    it("ageChart was called", function() {
        expect(ctrl.ageChart).toHaveBeenCalled();
    });
    it("setDataRequest was called", function() {
        expect(ctrl.setDataRequest).toHaveBeenCalled();
    });
});