import ClinicalstatementsDetailComponent from '../clinicalstatements-detail.component';

describe('Clinical statements Detail', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _clinicalstatementsActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = ClinicalstatementsDetailComponent.template;

    ctrl = controller(ClinicalstatementsDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      clinicalstatementsActions: _clinicalstatementsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'actionLoadDetail');
    spyOn(ctrl, 'setCurrentPageData');

    ctrl.actionLoadDetail();
    ctrl.setCurrentPageData();
  });


  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('actionLoadDetail was called', function() {
    expect(ctrl.actionLoadDetail).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});