'use strict';
import GenericMdtDetailComponent from '../../../../app/rippleui/pages/generic-mdt/generic-mdt-detail.component.js';
import '../../../../app/index';

describe('GenericMdt Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, genericmdtActions, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _genericmdtActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    genericmdtActions = _genericmdtActions_;
    usSpinnerService = _usSpinnerService_;

    template = GenericMdtDetailComponent.template;
    ctrl = controller(GenericMdtDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      genericmdtActions: genericmdtActions,
      usSpinnerService: usSpinnerService
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'genericmdtLoad');

    ctrl.edit();
    ctrl.setCurrentPageData();
    ctrl.genericmdtLoad();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("edit was called", function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("cancermdtLoad was called", function() {
    expect(ctrl.genericmdtLoad).toHaveBeenCalled();
  });
});