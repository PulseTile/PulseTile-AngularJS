'use strict';
import ResultsDetailComponent from '../results-detail.component.js';

describe('Results Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _resultsActions_, _serviceRequests_ ,_usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = ResultsDetailComponent.template;
    ctrl = controller(ResultsDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      resultsActions: _resultsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'actionLoadDetail');
    spyOn(ctrl, 'setCurrentPageData');

    ctrl.actionLoadDetail();
    ctrl.setCurrentPageData();
  });

  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('actionLoadDetail was called', function() {
    expect(ctrl.actionLoadDetail).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});