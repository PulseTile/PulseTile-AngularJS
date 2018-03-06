'use strict';
import InitialiseComponent from '../initialise.component';
// index file need for include module 'ripple-ui' of angular to tests
import '../../../index';

describe('InitialiseComponent', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, rootScope;

  beforeEach(inject(($injector, $controller, _$rootScope_, _$state_, _serviceRequests_, _serviceThemes_, _ConfirmationRedirectModal_, _$ngRedux_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    rootScope = _$rootScope_;

    template = InitialiseComponent.template;
    ctrl = controller(InitialiseComponent.controller, {
      $scope: scope,
      $rootScope: rootScope,
      $state: _$state_,
      serviceRequests: _serviceRequests_,
      serviceThemes: _serviceThemes_,
      ConfirmationRedirectModal: _ConfirmationRedirectModal_,
      $ngRedux: _$ngRedux_
    });
  }));
  beforeEach(function() {
    spyOn(scope, 'hidePageLoading');
    spyOn(scope, 'showInitialiseError');

    scope.hidePageLoading();
    scope.showInitialiseError();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('hidePageLoading was called', function() {
    expect(scope.hidePageLoading).toHaveBeenCalled();
  });
  it('showInitialiseError was called', function() {
    expect(scope.showInitialiseError).toHaveBeenCalled();
  });

});