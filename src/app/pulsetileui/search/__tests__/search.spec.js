'use strict';
import SearchComponent from '../search.component.js';

describe('SearchComponent', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, state, template, serviceRequests, isClickToAdvancedSearch;

  beforeEach(inject(($injector, $controller, _serviceRequests_, _$state_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;

    template = SearchComponent.template;
    ctrl = controller(SearchComponent.controller, {
      $scope: scope,
      serviceRequests: serviceRequests,
      $state: state
    });
    isClickToAdvancedSearch = ctrl.isClickToAdvancedSearch;
  }));

  beforeEach(function() {
    spyOn(ctrl, 'hideSearch');
    ctrl.hideSearch();
  });

  it('mainSearchEnabled is true', function() {
    expect(ctrl.mainSearchEnabled).toBe(true);
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('serviceRequests exist', function() {
    expect(serviceRequests).toBeDefined();
  });
  it('hideSearch was called', function() {
    expect(ctrl.hideSearch).toHaveBeenCalled();
  });
});