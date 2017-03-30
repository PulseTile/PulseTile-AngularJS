'use strict';
import SearchAdvancedComponent from '../../../../app/rippleui/search/search-advanced.component';
import '../../../../app/index';

describe('SearchAdvancedComponent', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, serviceRequests;
  
  beforeEach(inject(($injector, $controller, _$http_, _$ngRedux_, _serviceRequests_, _searchActions_, _$state_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = SearchAdvancedComponent.template;
    ctrl = controller(SearchAdvancedComponent.controller, {
      $scope: scope,
      $http: _$http_,
      $ngRedux: _$ngRedux_,
      serviceRequests: _serviceRequests_,
      searchActions: _searchActions_,
      $state: _$state_
    });
    
  }));

  beforeEach(function() {
    spyOn(scope, 'cancel');
    spyOn(scope, 'ok');

    scope.cancel();
    scope.ok();
  });

  it('formSubmitted is true', function() {
    expect(scope.formSubmitted).toBe(false);
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("cancel was called", function() {
    expect(scope.cancel).toHaveBeenCalled();
  });
  it("ok was called", function() {
    expect(scope.ok).toHaveBeenCalled();
  });
});