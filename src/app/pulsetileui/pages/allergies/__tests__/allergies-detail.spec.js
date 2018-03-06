'use strict';
import AllergiesDetailComponent from '../allergies-detail.component.js';

describe('Allergies Detail', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, element;

  beforeEach(inject(($injector, $controller, $compile, _$state_, _$stateParams_, _$ngRedux_, _allergiesActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    element = angular.element('<allergies-detail-component></allergies-detail-component>');
    element = $compile(element)(scope);

    template = AllergiesDetailComponent.template;
    ctrl = controller(AllergiesDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      allergiesActions: _allergiesActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_
    });
    actions = $injector.get('allergiesActions');
  }));

  beforeEach(function() {
    spyOn(scope, 'actionUpdateDetail');
    spyOn(scope, 'confirmEdit');
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'actionLoadDetail');
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'cancelEdit');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(actions, 'all');
    spyOn(actions, 'get');
    spyOn(actions, 'create');
    spyOn(actions, 'update');

    scope.actionUpdateDetail();
    scope.confirmEdit();
    ctrl.actionLoadList();
    ctrl.actionLoadDetail();
    ctrl.edit();
    ctrl.cancelEdit();
    ctrl.setCurrentPageData();
    actions.all();
    actions.get();
    actions.create();
    actions.update();
  });

  it('Template element exist', function() {
    expect(element).toBeDefined();
  });
  it('allergiesActions methods was called', function() {
    expect(actions.all).toHaveBeenCalled();
    expect(actions.get).toHaveBeenCalled();
    expect(actions.create).toHaveBeenCalled();
    expect(actions.update).toHaveBeenCalled();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('actionUpdateDetail was called', function() {
    expect(scope.actionUpdateDetail).toHaveBeenCalled();
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