import AllergiesCreateComponent from '../allergies-create.component';

describe('Allergies Create', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _allergiesActions_, _serviceRequests_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = AllergiesCreateComponent.template;
    ctrl = controller(AllergiesCreateComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      allergiesActions: _allergiesActions_,
      serviceRequests: _serviceRequests_,
      serviceFormatted: _serviceFormatted_,
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'goList');
    spyOn(ctrl, 'cancel');
    spyOn(ctrl, 'backToDocs');
    spyOn(scope, 'actionLoadList');
    spyOn(scope, 'actionCreateDetail');
    spyOn(scope, 'create');

    ctrl.setCurrentPageData();
    ctrl.goList();
    ctrl.cancel();
    ctrl.backToDocs();
    scope.actionLoadList();
    scope.actionCreateDetail();
    scope.create();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it('goList was called', function() {
    expect(ctrl.goList).toHaveBeenCalled();
  });
  it('cancel was called', function() {
    expect(ctrl.cancel).toHaveBeenCalled();
  });
  it('backToDocs was called', function() {
    expect(ctrl.backToDocs).toHaveBeenCalled();
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