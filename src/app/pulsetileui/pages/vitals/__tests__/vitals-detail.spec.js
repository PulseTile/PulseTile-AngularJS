'use strict';
import VitalsDetailComponent from '../vitals-detail.component';

describe('VitalsDetailComponent', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;
  
  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _vitalsActions_, _serviceRequests_, _usSpinnerService_, _serviceVitalsSigns_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = VitalsDetailComponent.template;
    ctrl = controller(VitalsDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      vitalsActions: _vitalsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceVitalsSigns: _serviceVitalsSigns_,
      serviceFormatted: _serviceFormatted_
    });
  }));

  beforeEach(function() {
    spyOn(scope, 'actionUpdateDetail');
    spyOn(scope, 'getHighlighterClass');
    spyOn(scope, 'changeVital');
    spyOn(scope, 'changeNewScore');
    spyOn(scope, 'confirmEdit');
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'actionLoadDetail');
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'cancelEdit');
    spyOn(ctrl, 'setCurrentPageData');

    scope.actionUpdateDetail();
    scope.getHighlighterClass();
    scope.changeVital();
    scope.changeNewScore();
    scope.confirmEdit();
    ctrl.actionLoadList();
    ctrl.actionLoadDetail();
    ctrl.edit();
    ctrl.cancelEdit();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('ctrl exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('actionUpdateDetail was called', function() {
    expect(scope.actionUpdateDetail).toHaveBeenCalled();
  });
  it('getHighlighterClass was called', function() {
    expect(scope.getHighlighterClass).toHaveBeenCalled();
  });
  it('changeVital was called', function() {
    expect(scope.changeVital).toHaveBeenCalled();
  });
  it('changeNewScore was called', function() {
    expect(scope.changeNewScore).toHaveBeenCalled();
  });
  it('confirmEdit was called', function() {
    expect(scope.confirmEdit).toHaveBeenCalled();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('actionLoadDetail was called', function() {
    expect(ctrl.actionLoadDetail).toHaveBeenCalled();
  });
  it('edit was called', function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it('cancelEdit was called', function() {
    expect(ctrl.cancelEdit).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});