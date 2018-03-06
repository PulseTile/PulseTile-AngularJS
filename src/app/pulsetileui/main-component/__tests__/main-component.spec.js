'use strict';
import MainComponent from '../main.component.js';

describe('MainComponent', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, rootScope;

  beforeEach(inject(($injector, $controller, _$window_, _$rootScope_, _$state_, _$stateParams_, _serviceRequests_, _$timeout_, _deviceDetector_, _serviceThemes_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    rootScope = _$rootScope_;

    template = MainComponent.template;
    ctrl = controller(MainComponent.controller, {
      $scope: scope,
      $rootScope: rootScope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      serviceRequests: _serviceRequests_,
      $timeout: _$timeout_,
      deviceDetector: _deviceDetector_,
      serviceThemes: _serviceThemes_,
    });
  }));
  beforeEach(function() {
    spyOn(scope, 'changeActiveTheme');
    spyOn(scope, 'setBreadcrumbs');
    spyOn(scope, 'getFullPanelClass');
    spyOn(scope, 'getClasses');
    spyOn(scope, 'detectDevice');
    spyOn(ctrl, 'getPageComponents');
    spyOn(ctrl, 'goBreadcrumb');
    spyOn(ctrl, 'changeFullPanel');
    spyOn(ctrl, 'hideSidebar');
    spyOn(ctrl, 'hideSidebarOnMobile');
    spyOn(ctrl, 'changeIsClassShowSidebar');
    spyOn(ctrl, 'checkIsViews');
    spyOn(ctrl, 'setPositionForSidebar');

    scope.changeActiveTheme();
    scope.setBreadcrumbs();
    scope.getFullPanelClass();
    scope.getClasses();
    scope.detectDevice();
    ctrl.getPageComponents();
    ctrl.goBreadcrumb();
    ctrl.changeFullPanel();
    ctrl.hideSidebar();
    ctrl.hideSidebarOnMobile();
    ctrl.changeIsClassShowSidebar();
    ctrl.checkIsViews();
    ctrl.setPositionForSidebar();
  });

  it('$scope.mainWidth exist', function() {
      expect(scope.isSidebar).toBe(false);
  });
  it('$scope.detailWidth', function() {
      expect(scope.isSecondPanel).toBe(false);
  });
  it('Controller exist', function() {
      expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
      expect(template).toBeDefined();
  });

  it('changeActiveTheme was called', function() {
      expect(scope.changeActiveTheme).toHaveBeenCalled();
  });
  it('setBreadcrumbs was called', function() {
      expect(scope.setBreadcrumbs).toHaveBeenCalled();
  });
  it('getFullPanelClass was called', function() {
      expect(scope.getFullPanelClass).toHaveBeenCalled();
  });
  it('getClasses was called', function() {
      expect(scope.getClasses).toHaveBeenCalled();
  });
  it('detectDevice was called', function() {
      expect(scope.detectDevice).toHaveBeenCalled();
  });
  it('getPageComponents was called', function() {
      expect(ctrl.getPageComponents).toHaveBeenCalled();
  });
  it('goBreadcrumb was called', function() {
      expect(ctrl.goBreadcrumb).toHaveBeenCalled();
  });
  it('changeFullPanel was called', function() {
      expect(ctrl.changeFullPanel).toHaveBeenCalled();
  });
  it('hideSidebar was called', function() {
      expect(ctrl.hideSidebar).toHaveBeenCalled();
  });
  it('hideSidebarOnMobile was called', function() {
      expect(ctrl.hideSidebarOnMobile).toHaveBeenCalled();
  });
  it('changeIsClassShowSidebar was called', function() {
      expect(ctrl.changeIsClassShowSidebar).toHaveBeenCalled();
  });
  it('checkIsViews was called', function() {
      expect(ctrl.checkIsViews).toHaveBeenCalled();
  });
  it('setPositionForSidebar was called', function() {
      expect(ctrl.setPositionForSidebar).toHaveBeenCalled();
  });
});