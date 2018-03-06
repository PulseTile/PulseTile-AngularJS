'use strict';
import HomeSidebarComponent from '../home-sidebar.component.js'

describe('HomeSidebar', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, ctrl, template;

  beforeEach(inject(($injector, $controller, _$state_, _serviceRequests_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = HomeSidebarComponent.template;
    ctrl = controller(HomeSidebarComponent.controller, {
      $scope: scope,
      $state: _$state_,
      serviceRequests: _serviceRequests_
    });
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});