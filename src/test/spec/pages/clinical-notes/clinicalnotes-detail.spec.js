'use strict';
import ClinicalnotesDetailComponent from '../../../../app/rippleui/pages/clinical-notes/clinicalnotes-detail.component.js';
import '../../../../app/index';

describe('Clinicalnotes Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, personalnotesActions, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _personalnotesActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    personalnotesActions = _personalnotesActions_;
    usSpinnerService = _usSpinnerService_;

    template = ClinicalnotesDetailComponent.template;
    ctrl = controller(ClinicalnotesDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      personalnotesActions: personalnotesActions,
      usSpinnerService: usSpinnerService
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'clinicalnotesLoad');

    ctrl.edit();
    ctrl.setCurrentPageData();
    ctrl.clinicalnotesLoad();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("edit was called", function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("clinicalnotesLoad was called", function() {
    expect(ctrl.clinicalnotesLoad).toHaveBeenCalled();
  });
});