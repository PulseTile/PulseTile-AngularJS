'use strict';
import ReportChartComponent from '../report-chart.component';

describe('ReportChartComponent', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, state, template;

  beforeEach(inject(($injector, $controller, _$state_, _$ngRedux_, _$stateParams_, _searchActions_, _serviceRequests_, _Patient_, _$window_, _$timeout_,) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;

    template = ReportChartComponent.template;
    ctrl = controller(ReportChartComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $ngRedux: _$ngRedux_,
      $stateParams: _$stateParams_,
      searchActions: _searchActions_,
      serviceRequests: _serviceRequests_,
      Patient: _Patient_,
      $window: _$window_,
      $timeout: _$timeout_
    });
  }));

  beforeEach(function() {
    spyOn(scope, 'isSearchParams');
    spyOn(scope, 'getSearchParams');
    spyOn(ctrl, 'setDataRequest');

    ctrl.setDataRequest();
    scope.isSearchParams();
    scope.getSearchParams();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('setDataRequest was called', function() {
    expect(ctrl.setDataRequest).toHaveBeenCalled();
  });
  it('isSearchParams was called', function() {
    expect(scope.isSearchParams).toHaveBeenCalled();
  });

  it('setDataRequest was called', function() {
    expect(ctrl.setDataRequest).toHaveBeenCalled();
  });
});