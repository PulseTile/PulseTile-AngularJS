'use strict';
import ServiceThemes from '../serviceThemes';

describe('ServiceThemes', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let ctrl, controller;

  beforeEach(inject(($injector, $controller, _serviceRequests_) => {
    controller = $controller;
    ctrl = controller(ServiceThemes, {
      serviceRequests: _serviceRequests_
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'getDataApplication');
    spyOn(ctrl, 'setDataApplication');
    spyOn(ctrl, 'setBrowserTitle');
    spyOn(ctrl, 'getLogoB64');
    spyOn(ctrl, 'setLogoB64');
    spyOn(ctrl, 'getThemes');
    spyOn(ctrl, 'getThemesAsArray');
    spyOn(ctrl, 'getThemeById');
    spyOn(ctrl, 'getActiveTheme');
    spyOn(ctrl, 'setActiveTheme');
    spyOn(ctrl, 'getThemeClassById');
    spyOn(ctrl, 'getActiveThemeClass');

    ctrl.getDataApplication();
    ctrl.setDataApplication();
    ctrl.setBrowserTitle();
    ctrl.getLogoB64();
    ctrl.setLogoB64();
    ctrl.getThemes();
    ctrl.getThemesAsArray();
    ctrl.getThemeById();
    ctrl.getActiveTheme();
    ctrl.setActiveTheme();
    ctrl.getThemeClassById();
    ctrl.getActiveThemeClass();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('getDataApplication was called', function() {
    expect(ctrl.getDataApplication).toHaveBeenCalled();
  });
  it('setDataApplication was called', function() {
    expect(ctrl.setDataApplication).toHaveBeenCalled();
  });
  it('setBrowserTitle was called', function() {
    expect(ctrl.setBrowserTitle).toHaveBeenCalled();
  });
  it('getLogoB64 was called', function() {
    expect(ctrl.getLogoB64).toHaveBeenCalled();
  });
  it('setLogoB64 was called', function() {
    expect(ctrl.setLogoB64).toHaveBeenCalled();
  });
  it('getThemes was called', function() {
    expect(ctrl.getThemes).toHaveBeenCalled();
  });
  it('getThemesAsArray was called', function() {
    expect(ctrl.getThemesAsArray).toHaveBeenCalled();
  });
  it('getThemeById was called', function() {
    expect(ctrl.getThemeById).toHaveBeenCalled();
  });
  it('getActiveTheme was called', function() {
    expect(ctrl.getActiveTheme).toHaveBeenCalled();
  });
  it('setActiveTheme was called', function() {
    expect(ctrl.setActiveTheme).toHaveBeenCalled();
  });
  it('getThemeClassById was called', function() {
    expect(ctrl.getThemeClassById).toHaveBeenCalled();
  });
  it('getActiveThemeClass was called', function() {
    expect(ctrl.getActiveThemeClass).toHaveBeenCalled();
  });
});