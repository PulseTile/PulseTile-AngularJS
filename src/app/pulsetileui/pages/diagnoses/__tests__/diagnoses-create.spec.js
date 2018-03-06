import DiagnosesCreateComponent from '../diagnoses-create.component';

describe('Diagnoses Create', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _diagnosesActions_, _serviceRequests_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = DiagnosesCreateComponent.template;
    ctrl = controller(DiagnosesCreateComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      patientsActions: _patientsActions_,
      diagnosesActions: _diagnosesActions_,
      serviceRequests: _serviceRequests_,
      serviceFormatted: _serviceFormatted_
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'backToDocs');
    spyOn(ctrl, 'goList');
    spyOn(ctrl, 'cancel');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(scope, 'actionLoadList');
    spyOn(scope, 'actionCreateDetail');
    spyOn(scope, 'create');

    ctrl.backToDocs();
    ctrl.goList();
    ctrl.cancel();
    ctrl.setCurrentPageData();
    scope.actionLoadList();
    scope.actionCreateDetail();
    scope.create();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('backToDocs was called', function() {
    expect(ctrl.backToDocs).toHaveBeenCalled();
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

  it('actionLoadList was called', function() {
    expect(scope.actionLoadList).toHaveBeenCalled();
  });
  it('actionCreateDetail was called', function() {
    expect(scope.actionCreateDetail).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(scope.create).toHaveBeenCalled();
  });
});