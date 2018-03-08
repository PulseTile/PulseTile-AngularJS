'use strict';
import VitalsCreateComponent from '../vitals-create.component';

describe('VitalsCreateComponent', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;
  
  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _vitalsActions_, _serviceRequests_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = VitalsCreateComponent.template;
    ctrl = controller(VitalsCreateComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      patientsActions: _patientsActions_,
      vitalsActions: _vitalsActions_,
      serviceRequests: _serviceRequests_,
      serviceFormatted: _serviceFormatted_,
    });
  }));

  beforeEach(function() {
    spyOn(scope, 'actionLoadList');
    spyOn(scope, 'actionCreateDetail');
    spyOn(scope, 'getHighlighterClass');
    spyOn(scope, 'changeVital');
    spyOn(scope, 'changeNewScore');
    spyOn(scope, 'create');
    spyOn(ctrl, 'goList');
    spyOn(ctrl, 'cancel');
    spyOn(ctrl, 'setCurrentPageData');

    scope.actionLoadList();
    scope.actionCreateDetail();
    scope.getHighlighterClass();
    scope.changeVital();
    scope.changeNewScore();
    scope.create();
    ctrl.goList();
    ctrl.cancel();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('ctrl exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('actionLoadList was called', function() {
    expect(scope.actionLoadList).toHaveBeenCalled();
  });
  it('actionCreateDetail was called', function() {
    expect(scope.actionCreateDetail).toHaveBeenCalled();
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
  it('create was called', function() {
    expect(scope.create).toHaveBeenCalled();
  });

  it('goList was called', function() {
    expect(ctrl.goList).toHaveBeenCalled();
  });
  it('cancel was called', function() {
    expect(ctrl.cancel).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});