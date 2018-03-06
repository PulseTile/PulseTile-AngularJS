'use strict';
import SearchAdvancedComponent from '../search-advanced.component';

describe('SearchAdvancedComponent', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;
  
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
    spyOn(scope, 'getSearchParams');
    spyOn(scope, 'clearSearchParams');
    spyOn(scope, 'refreshSlider');
    spyOn(scope, 'isNhsNumberRequired');
    spyOn(scope, 'isNhsNumberTooShort');
    spyOn(scope, 'isNhsNumberFieldInvalid');
          
    scope.cancel();
    scope.ok();
    scope.getSearchParams();
    scope.clearSearchParams();
    scope.refreshSlider();
    scope.isNhsNumberRequired();
    scope.isNhsNumberTooShort();
    scope.isNhsNumberFieldInvalid();
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

  it('cancel was called', function() {
    expect(scope.cancel).toHaveBeenCalled();
  });
  it('ok was called', function() {
    expect(scope.ok).toHaveBeenCalled();
  });
  it('getSearchParams was called', function() {
    expect(scope.getSearchParams).toHaveBeenCalled();
  });
  it('clearSearchParams was called', function() {
    expect(scope.clearSearchParams).toHaveBeenCalled();
  });
  it('refreshSlider was called', function() {
    expect(scope.refreshSlider).toHaveBeenCalled();
  });
  it('isNhsNumberRequired was called', function() {
    expect(scope.isNhsNumberRequired).toHaveBeenCalled();
  });
  it('isNhsNumberTooShort was called', function() {
    expect(scope.isNhsNumberTooShort).toHaveBeenCalled();
  });
  it('isNhsNumberFieldInvalid was called', function() {
    expect(scope.isNhsNumberFieldInvalid).toHaveBeenCalled();
  });
});