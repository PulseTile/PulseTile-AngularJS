'use strict';
import MedicationsDetailComponent from '../medications-detail.component.js';

describe('Medications Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _medicationsActions_, _usSpinnerService_, _serviceRequests_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = MedicationsDetailComponent.template;
    ctrl = controller(MedicationsDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      medicationsActions: _medicationsActions_,
      usSpinnerService: _usSpinnerService_,
      serviceRequests: _serviceRequests_,
      serviceFormatted: _serviceFormatted_,
    });
  }));
  beforeEach(function() {
    spyOn(scope, 'actionUpdateDetail');
    spyOn(scope, 'confirmEditMedication');
    spyOn(scope, 'confirmEditPrescription');
    spyOn(scope, 'toggleShowSchedule');
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'actionLoadDetail');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'editMedication');
    spyOn(ctrl, 'editPrescription');
    spyOn(ctrl, 'cancelEditMedication');
    spyOn(ctrl, 'cancelEditPrescription');

    scope.actionUpdateDetail();
    scope.confirmEditMedication();
    scope.confirmEditPrescription();
    scope.toggleShowSchedule();
    ctrl.actionLoadList();
    ctrl.actionLoadDetail();
    ctrl.setCurrentPageData();
    ctrl.editMedication();
    ctrl.editPrescription();
    ctrl.cancelEditMedication();
    ctrl.cancelEditPrescription();
  });

  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('actionUpdateDetail was called', function() {
    expect(scope.actionUpdateDetail).toHaveBeenCalled();
  });
  it('confirmEditMedication was called', function() {
    expect(scope.confirmEditMedication).toHaveBeenCalled();
  });
  it('confirmEditPrescription was called', function() {
    expect(scope.confirmEditPrescription).toHaveBeenCalled();
  });
  it('toggleShowSchedule was called', function() {
    expect(scope.toggleShowSchedule).toHaveBeenCalled();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('actionLoadDetail was called', function() {
    expect(ctrl.actionLoadDetail).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it('editMedication was called', function() {
    expect(ctrl.editMedication).toHaveBeenCalled();
  });
  it('editPrescription was called', function() {
    expect(ctrl.editPrescription).toHaveBeenCalled();
  });
  it('cancelEditMedication was called', function() {
    expect(ctrl.cancelEditMedication).toHaveBeenCalled();
  });
  it('cancelEditPrescription was called', function() {
    expect(ctrl.cancelEditPrescription).toHaveBeenCalled();
  });
});