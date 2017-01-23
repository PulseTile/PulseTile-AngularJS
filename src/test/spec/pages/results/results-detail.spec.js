'use strict';
import ResultsDetailComponent from '../../../../app/rippleui/pages/results/results-detail.component.js';
import '../../../../app/index';

describe('Results Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, resultsActions, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _resultsActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    resultsActions = _resultsActions_;
    usSpinnerService = _usSpinnerService_;

    template = ResultsDetailComponent.template;
    ctrl = controller(ResultsDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      resultsActions: resultsActions,
      usSpinnerService: usSpinnerService
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'resultsLoad');

    ctrl.resultsLoad();
    ctrl.setCurrentPageData();
  });

  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("resultsLoad was called", function() {
    expect(ctrl.resultsLoad).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});