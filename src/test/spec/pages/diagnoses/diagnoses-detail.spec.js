'use strict';
import DiagnosesDetailComponent from '../../../../app/rippleui/pages/diagnoses/diagnoses-detail.component.js';
import '../../../../app/index';

describe('Diagnoses Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, diagnosesActions, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _diagnosesActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    diagnosesActions = _diagnosesActions_;
    usSpinnerService = _usSpinnerService_;

    template = DiagnosesDetailComponent.template;
    ctrl = controller(DiagnosesDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      diagnosesActions: diagnosesActions,
      usSpinnerService: usSpinnerService
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'diagnosesLoad');

    ctrl.edit();
    ctrl.setCurrentPageData();
    ctrl.diagnosesLoad();
  });

  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('UnlockedSources', function() {
    expect(scope.UnlockedSources[0]).toBe('handi.ehrscape.com');
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
  it("diagnosesLoad was called", function() {
    expect(ctrl.diagnosesLoad).toHaveBeenCalled();
  });
});