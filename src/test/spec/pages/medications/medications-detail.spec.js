'use strict';
import MedicationsDetailComponent from '../../../../app/rippleui/pages/medications/medications-detail.component.js';
import '../../../../app/index';

describe('Medications Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, medicationsActions, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _medicationsActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    medicationsActions = _medicationsActions_;
    usSpinnerService = _usSpinnerService_;

    template = MedicationsDetailComponent.template;
    ctrl = controller(MedicationsDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      medicationsActions: medicationsActions,
      usSpinnerService: usSpinnerService
    });
  }));
  beforeEach(function() {
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'editMedication');
    spyOn(ctrl, 'medicationsLoad');

    ctrl.medicationsLoad();
    ctrl.editMedication();
    ctrl.setCurrentPageData();
  });

  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("edit was called", function() {
    expect(ctrl.editMedication).toHaveBeenCalled();
  });
  it("medicationsLoad was called", function() {
    expect(ctrl.medicationsLoad).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});