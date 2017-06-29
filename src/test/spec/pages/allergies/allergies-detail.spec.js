'use strict';
import AllergiesDetailComponent from '../../../../app/pulsetileui/pages/allergies/allergies-detail.component.js';
import '../../../../app/index';

describe('Allergies Detail', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, allergiesActions, serviceRequests, usSpinnerService, element;

  beforeEach(inject(($injector, $controller, $compile, _$state_, _$stateParams_, _$ngRedux_, _allergiesActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    allergiesActions = _allergiesActions_;
    serviceRequests = _serviceRequests_;
    usSpinnerService = _usSpinnerService_;

    element = angular.element('<allergies-detail-component></allergies-detail-component>');
    element = $compile(element)(scope);

    template = AllergiesDetailComponent.template;
    ctrl = controller(AllergiesDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      allergiesActions: allergiesActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
  }));

  beforeEach(function() {
    spyOn(scope, 'confirmEdit');
    spyOn(scope, 'confirmEditMeta');
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'allergiesLoad');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'cancelEdit');
    spyOn(ctrl, 'editMeta');
    spyOn(ctrl, 'cancelEditMeta');
    spyOn(allergiesActions, 'all');
    spyOn(allergiesActions, 'get');
    spyOn(allergiesActions, 'create');
    spyOn(allergiesActions, 'update');

    scope.confirmEdit();
    scope.confirmEditMeta();
    ctrl.edit();
    ctrl.allergiesLoad();
    ctrl.setCurrentPageData();
    ctrl.cancelEdit();
    ctrl.editMeta();
    ctrl.cancelEditMeta();
    allergiesActions.all();
    allergiesActions.get();
    allergiesActions.create();
    allergiesActions.update();
  });

  it('Template element exist', function() {
    expect(element).toBeDefined();
  });
  it("allergiesActions methods was called", function() {
    expect(allergiesActions.all).toHaveBeenCalled();
    expect(allergiesActions.get).toHaveBeenCalled();
    expect(allergiesActions.create).toHaveBeenCalled();
    expect(allergiesActions.update).toHaveBeenCalled();
  });
  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("confirmEdit was called", function() {
    expect(scope.confirmEdit).toHaveBeenCalled();
  });
  it("confirmEditMeta was called", function() {
    expect(scope.confirmEditMeta).toHaveBeenCalled();
  });
  it("edit was called", function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it("allergiesLoad was called", function() {
    expect(ctrl.allergiesLoad).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("cancelEdit was called", function() {
    expect(ctrl.cancelEdit).toHaveBeenCalled();
  });
  it("editMeta was called", function() {
    expect(ctrl.editMeta).toHaveBeenCalled();
  });
  it("cancelEditMeta was called", function() {
    expect(ctrl.cancelEditMeta).toHaveBeenCalled();
  });
});