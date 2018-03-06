'use strict';
import HeaderComponent from '../header.component.js';

describe('HeaderComponent', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, rootScope;

  beforeEach(inject(($injector, $controller, _$rootScope_, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _serviceRequests_, _serviceThemes_, _$window_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    rootScope = _$rootScope_;

    template = HeaderComponent.template;
    ctrl = controller(HeaderComponent.controller, {
      $scope: scope,
      $rootScope: rootScope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      patientsActions: _patientsActions_,
      serviceRequests: _serviceRequests_,
      serviceThemes: _serviceThemes_,
      $window: _$window_
    });
  }));
  beforeEach(function() {
    scope.title = 'IDCR';
    rootScope.searchMode = false;

    spyOn(scope, 'setUserData');
    spyOn(scope, 'changeLogo');
    spyOn(scope, 'isActiveTypeSearch');
    spyOn(scope, 'checkIsToggleSearch');
    spyOn(scope, 'isShowSearch');

    spyOn(ctrl, 'closeAdvancedSearch');
    spyOn(ctrl, 'openAdvancedSearch');
    spyOn(ctrl, 'goBack');
    spyOn(ctrl, 'goLogo');
    spyOn(ctrl, 'goProfile');
    spyOn(ctrl, 'signout');
    spyOn(ctrl, 'containsReportString');
    spyOn(ctrl, 'containsSettingString');
    spyOn(ctrl, 'containsPatientString');
    spyOn(ctrl, 'containsReportTypeString');
    spyOn(ctrl, 'processReportTypeMode');
    spyOn(ctrl, 'processReportMode');
    spyOn(ctrl, 'processSettingMode');
    spyOn(ctrl, 'processPatientMode');
    spyOn(ctrl, 'checkExpression');
    spyOn(ctrl, 'searchFunction');
    spyOn(ctrl, 'cancelSearchMode');
    spyOn(ctrl, 'cancelReportType');
    spyOn(ctrl, 'getPageComponents');
    spyOn(ctrl, 'clickSidebarBtn');
    spyOn(ctrl, 'getPopulateHeaderSearch');
    spyOn(ctrl, 'getPageHeader');
    spyOn(ctrl, 'checkIsShowPreviousBtn');


    scope.setUserData();
    scope.changeLogo();
    scope.isActiveTypeSearch();
    scope.checkIsToggleSearch();
    scope.isShowSearch();

    ctrl.closeAdvancedSearch();
    ctrl.openAdvancedSearch();
    ctrl.goBack();
    ctrl.goLogo();
    ctrl.goProfile();
    ctrl.signout();
    ctrl.containsReportString();
    ctrl.containsSettingString();
    ctrl.containsPatientString();
    ctrl.containsReportTypeString();
    ctrl.processReportTypeMode();
    ctrl.processReportMode();
    ctrl.processSettingMode();
    ctrl.processPatientMode();
    ctrl.checkExpression();
    ctrl.searchFunction();
    ctrl.cancelSearchMode();
    ctrl.cancelReportType();
    ctrl.getPageComponents();
    ctrl.clickSidebarBtn();
    ctrl.getPopulateHeaderSearch();
    ctrl.getPageHeader();
    ctrl.checkIsShowPreviousBtn();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('setUserData was called', function() {
    expect(scope.setUserData).toHaveBeenCalled();
  });
  it('changeLogo was called', function() {
    expect(scope.changeLogo).toHaveBeenCalled();
  });
  it('isActiveTypeSearch was called', function() {
    expect(scope.isActiveTypeSearch).toHaveBeenCalled();
  });
  it('checkIsToggleSearch was called', function() {
    expect(scope.checkIsToggleSearch).toHaveBeenCalled();
  });
  it('isShowSearch was called', function() {
    expect(scope.isShowSearch).toHaveBeenCalled();
  });


  it('closeAdvancedSearch was called', function() {
    expect(ctrl.closeAdvancedSearch).toHaveBeenCalled();
  });
  it('openAdvancedSearch was called', function() {
    expect(ctrl.openAdvancedSearch).toHaveBeenCalled();
  });
  it('goBack was called', function() {
    expect(ctrl.goBack).toHaveBeenCalled();
  });
  it('goLogo was called', function() {
    expect(ctrl.goLogo).toHaveBeenCalled();
  });
  it('goProfile was called', function() {
    expect(ctrl.goProfile).toHaveBeenCalled();
  });
  it('signout was called', function() {
    expect(ctrl.signout).toHaveBeenCalled();
  });
  it('containsReportString was called', function() {
    expect(ctrl.containsReportString).toHaveBeenCalled();
  });
  it('containsSettingString was called', function() {
    expect(ctrl.containsSettingString).toHaveBeenCalled();
  });
  it('containsPatientString was called', function() {
    expect(ctrl.containsPatientString).toHaveBeenCalled();
  });
  it('containsReportTypeString was called', function() {
    expect(ctrl.containsReportTypeString).toHaveBeenCalled();
  });
  it('processReportTypeMode was called', function() {
    expect(ctrl.processReportTypeMode).toHaveBeenCalled();
  });
  it('processReportMode was called', function() {
    expect(ctrl.processReportMode).toHaveBeenCalled();
  });
  it('processSettingMode was called', function() {
    expect(ctrl.processSettingMode).toHaveBeenCalled();
  });
  it('processPatientMode was called', function() {
    expect(ctrl.processPatientMode).toHaveBeenCalled();
  });
  it('checkExpression was called', function() {
    expect(ctrl.checkExpression).toHaveBeenCalled();
  });
  it('searchFunction was called', function() {
    expect(ctrl.searchFunction).toHaveBeenCalled();
  });
  it('cancelSearchMode was called', function() {
    expect(ctrl.cancelSearchMode).toHaveBeenCalled();
  });
  it('cancelReportType was called', function() {
    expect(ctrl.cancelReportType).toHaveBeenCalled();
  });
  it('getPageComponents was called', function() {
    expect(ctrl.getPageComponents).toHaveBeenCalled();
  });
  it('clickSidebarBtn was called', function() {
    expect(ctrl.clickSidebarBtn).toHaveBeenCalled();
  });
  it('getPopulateHeaderSearch was called', function() {
    expect(ctrl.getPopulateHeaderSearch).toHaveBeenCalled();
  });
  it('getPageHeader was called', function() {
    expect(ctrl.getPageHeader).toHaveBeenCalled();
  });
  it('checkIsShowPreviousBtn was called', function() {
    expect(ctrl.checkIsShowPreviousBtn).toHaveBeenCalled();
  });
});