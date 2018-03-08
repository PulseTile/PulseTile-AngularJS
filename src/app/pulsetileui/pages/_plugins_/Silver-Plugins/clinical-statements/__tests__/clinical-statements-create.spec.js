'use strict';
import ClinicalstatementsCreateComponent from '../clinicalstatements-create.component';

describe('Clinical statements Create', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _clinicalstatementsActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = ClinicalstatementsCreateComponent.template;

    ctrl = controller(ClinicalstatementsCreateComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      clinicalstatementsActions: _clinicalstatementsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'clinicalstatementsTags');
    spyOn(ctrl, 'clinicalstatementsQuery');
    spyOn(ctrl, 'getTag');
    spyOn(ctrl, 'removeTag');
    spyOn(ctrl, 'goList');
    spyOn(ctrl, 'cancelEdit');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(scope, 'actionLoadList');
    spyOn(scope, 'actionCreateDetail');
    spyOn(scope, 'confirmEdit');
    spyOn(scope, 'queryFiltering');
    spyOn(scope, 'changeSelect');

    ctrl.clinicalstatementsTags();
    ctrl.clinicalstatementsQuery();
    ctrl.getTag();
    ctrl.removeTag();
    ctrl.goList();
    ctrl.cancelEdit();
    ctrl.setCurrentPageData();
    scope.actionLoadList();
    scope.actionCreateDetail();
    scope.confirmEdit();
    scope.queryFiltering();
    scope.changeSelect();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('clinicalstatementsTags was called', function() {
    expect(ctrl.clinicalstatementsTags).toHaveBeenCalled();
  });
  it('clinicalstatementsQuery was called', function() {
    expect(ctrl.clinicalstatementsQuery).toHaveBeenCalled();
  });
  it('getTag was called', function() {
    expect(ctrl.getTag).toHaveBeenCalled();
  });
  it('removeTag was called', function() {
    expect(ctrl.removeTag).toHaveBeenCalled();
  });
  it('goList was called', function() {
    expect(ctrl.goList).toHaveBeenCalled();
  });
  it('cancelEdit was called', function() {
    expect(ctrl.cancelEdit).toHaveBeenCalled();
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
  it('confirmEdit was called', function() {
    expect(scope.confirmEdit).toHaveBeenCalled();
  });
  it('queryFiltering was called', function() {
    expect(scope.queryFiltering).toHaveBeenCalled();
  });
  it('changeSelect was called', function() {
    expect(scope.changeSelect).toHaveBeenCalled();
  });
});