'use strict';
import ServiceRequests from '../serviceRequests';

describe('ServiceRequests', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let ctrl, controller;

  beforeEach(inject(($injector, $controller) => {
    controller = $controller;
    ctrl = controller(ServiceRequests, {
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'publisher');
    spyOn(ctrl, 'subscriber');
    spyOn(ctrl, 'initialise');
    spyOn(ctrl, 'login');
    spyOn(ctrl, 'setAppTheme');
    spyOn(ctrl, 'getAppSettings');
    spyOn(ctrl, 'checkIsNotCurrentPage');
    spyOn(ctrl, 'checkIsCanLoadingListData');
    spyOn(ctrl, 'setPluginPage');

    ctrl.publisher();
    ctrl.subscriber();
    ctrl.initialise();
    ctrl.login();
    ctrl.setAppTheme();
    ctrl.getAppSettings();
    ctrl.checkIsNotCurrentPage();
    ctrl.checkIsCanLoadingListData();
    ctrl.setPluginPage();

  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('publisher was called', function() {
    expect(ctrl.publisher).toHaveBeenCalled();
  });
  it('subscriber was called', function() {
    expect(ctrl.subscriber).toHaveBeenCalled();
  });
  it('initialise was called', function() {
    expect(ctrl.initialise).toHaveBeenCalled();
  });
  it('login was called', function() {
    expect(ctrl.login).toHaveBeenCalled();
  });
  it('setAppTheme was called', function() {
    expect(ctrl.setAppTheme).toHaveBeenCalled();
  });
  it('getAppSettings was called', function() {
    expect(ctrl.getAppSettings).toHaveBeenCalled();
  });
  it('checkIsNotCurrentPage was called', function() {
    expect(ctrl.checkIsNotCurrentPage).toHaveBeenCalled();
  });
  it('checkIsCanLoadingListData was called', function() {
    expect(ctrl.checkIsCanLoadingListData).toHaveBeenCalled();
  });
  it('setPluginPage was called', function() {
    expect(ctrl.setPluginPage).toHaveBeenCalled();
  });

});