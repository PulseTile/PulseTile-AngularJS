'use strict';
import PersonalnotesDetailComponent from '../../../../app/pulsetileui/pages/personal-notes/personalnotes-detail.component.js';
import '../../../../app/index';

describe('Personalnotes Details', function() {

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

    template = PersonalnotesDetailComponent.template;
    ctrl = controller(PersonalnotesDetailComponent.controller, {
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
    spyOn(ctrl, 'personalnotesLoad');

    ctrl.edit();
    ctrl.setCurrentPageData();
    ctrl.personalnotesLoad();
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
  it("PersonalnotesLoad was called", function() {
    expect(ctrl.personalnotesLoad).toHaveBeenCalled();
  });
});