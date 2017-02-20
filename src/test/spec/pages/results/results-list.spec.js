'use strict';
import ResultsListComponent from '../../../../app/rippleui/pages/results/results-list.component.js';
import '../../../../app/index';

describe('Results List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, stateParams, state, ngRedux, resultsActions, serviceRequests, usSpinnerService, serviceFormatted;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _resultsActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    resultsActions = _resultsActions_;
    usSpinnerService = _usSpinnerService_;
    serviceFormatted = _serviceFormatted_;    

    template = ResultsListComponent.template;

    ctrl = controller(ResultsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      resultsActions: resultsActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();

    actions = $injector.get('resultsActions');
    
  }));

  beforeEach(function() {

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'resultsLoad');

    ctrl.go();
    ctrl.setCurrentPageData();
    ctrl.resultsLoad();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('serviceFormatted exist', function() {
    expect(serviceFormatted).toBeDefined();
  });
  it('Include resultsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("resultsLoad was called", function() {
    expect(ctrl.resultsLoad).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});