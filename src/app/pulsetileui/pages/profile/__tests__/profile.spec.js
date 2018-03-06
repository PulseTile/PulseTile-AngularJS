'use strict';
import ProfileComponent from '../profile.component.js'

describe('Profile', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _serviceRequests_, _usSpinnerService_, _$timeout_, _serviceThemes_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = ProfileComponent.template;
    ctrl = controller(ProfileComponent.controller, {
      $scope: scope,
      $state: _$state_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      $timeout: _$timeout_,
      serviceThemes: _serviceThemes_
    });
  }));
  beforeEach(function() {
    spyOn(scope, 'sendData');
    spyOn(scope, 'confirmAppSettingsEdit');
    spyOn(scope, 'confirmPersonalEdit');
    spyOn(scope, 'confirmContactEdit');
    spyOn(scope, 'changeThemeForExample');
    spyOn(ctrl, 'appSettingsEdit');
    spyOn(ctrl, 'personalEdit');
    spyOn(ctrl, 'contactEdit');
    spyOn(ctrl, 'cancelAppSettingsEdit');
    spyOn(ctrl, 'cancelPersonalEdit');
    spyOn(ctrl, 'cancelContactEdit');
    spyOn(ctrl, 'getBase64Image');
    spyOn(ctrl, 'upload');
    spyOn(ctrl, 'setProfileData');
    spyOn(ctrl, 'setCurrentPageData');

    scope.sendData();
    scope.confirmAppSettingsEdit();
    scope.confirmPersonalEdit();
    scope.confirmContactEdit();
    scope.changeThemeForExample();
    ctrl.appSettingsEdit();
    ctrl.personalEdit();
    ctrl.contactEdit();
    ctrl.cancelAppSettingsEdit();
    ctrl.cancelPersonalEdit();
    ctrl.cancelContactEdit();
    ctrl.getBase64Image();
    ctrl.upload();
    ctrl.setProfileData();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('sendData was called', function() {
    expect(scope.sendData).toHaveBeenCalled();
  });
  it('confirmAppSettingsEdit was called', function() {
    expect(scope.confirmAppSettingsEdit).toHaveBeenCalled();
  });
  it('confirmPersonalEdit was called', function() {
    expect(scope.confirmPersonalEdit).toHaveBeenCalled();
  });
  it('confirmContactEdit was called', function() {
    expect(scope.confirmContactEdit).toHaveBeenCalled();
  });
  it('changeThemeForExample was called', function() {
    expect(scope.changeThemeForExample).toHaveBeenCalled();
  });

  it('appSettingsEdit was called', function() {
    expect(ctrl.appSettingsEdit).toHaveBeenCalled();
  });
  it('personalEdit was called', function() {
    expect(ctrl.personalEdit).toHaveBeenCalled();
  });
  it('contactEdit was called', function() {
    expect(ctrl.contactEdit).toHaveBeenCalled();
  });
  it('cancelPersonalEdit was called', function() {
    expect(ctrl.cancelPersonalEdit).toHaveBeenCalled();
  });
  it('cancelContactEdit was called', function() {
    expect(ctrl.cancelContactEdit).toHaveBeenCalled();
  });
  it('getBase64Image was called', function() {
    expect(ctrl.getBase64Image).toHaveBeenCalled();
  });
  it('upload was called', function() {
    expect(ctrl.upload).toHaveBeenCalled();
  });
  it('setProfileData was called', function() {
    expect(ctrl.setProfileData).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});