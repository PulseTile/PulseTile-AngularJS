'use strict';
import VitalsListComponent from '../vitals-list.component';

describe('Vitals List', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _vitalsActions_, _serviceRequests_, _usSpinnerService_, _$window_, _$timeout_, _serviceVitalsSigns_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = VitalsListComponent.template;
    ctrl = controller(VitalsListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      vitalsActions: _vitalsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      $window: _$window_,
      $timeout: _$timeout_,
      serviceVitalsSigns: _serviceVitalsSigns_, 
      serviceFormatted: _serviceFormatted_
    });
  }));
  
  beforeEach(function() {
    spyOn(scope, 'go');
    spyOn(scope, 'getChartDataSet');
    spyOn(scope, 'chartLoad');
    spyOn(scope, 'getVitalsForChart');
    spyOn(scope, 'chartUpdate');
    spyOn(scope, 'isViewList');
    spyOn(scope, 'changeViewList');
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    scope.go();
    scope.getChartDataSet();
    scope.chartLoad();
    scope.getVitalsForChart();
    scope.chartUpdate();
    scope.isViewList();
    scope.changeViewList();
    ctrl.actionLoadList();
    ctrl.create();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('ctrl exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('go was called', function() {
    expect(scope.go).toHaveBeenCalled();
  });
  it('getChartDataSet was called', function() {
    expect(scope.getChartDataSet).toHaveBeenCalled();
  });
  it('chartLoad was called', function() {
    expect(scope.chartLoad).toHaveBeenCalled();
  });
  it('getVitalsForChart was called', function() {
    expect(scope.getVitalsForChart).toHaveBeenCalled();
  });
  it('chartUpdate was called', function() {
    expect(scope.chartUpdate).toHaveBeenCalled();
  });
  it('isViewList was called', function() {
    expect(scope.isViewList).toHaveBeenCalled();
  });
  it('changeViewList was called', function() {
    expect(scope.changeViewList).toHaveBeenCalled();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});