'use strict';
import TransferOfCareDetailComponent from '../transfer-of-care-detail.component';

describe('Transfer Of Care Details', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _transferOfCareActions_, _usSpinnerService_, _serviceRequests_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = TransferOfCareDetailComponent.template;
    ctrl = controller(TransferOfCareDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      transferOfCareActions: _transferOfCareActions_,
      usSpinnerService: _usSpinnerService_,
      serviceRequests: _serviceRequests_
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'actionLoadDetail');
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'cancelEdit');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(scope, 'actionUpdateDetail');
    spyOn(scope, 'confirmEdit');
    spyOn(scope, 'selectTypeRecords');
    spyOn(scope, 'isShowTypeRecord');
    spyOn(scope, 'addToRecords');
    spyOn(scope, 'removeRecord');
    spyOn(scope, 'togglePopover');
    spyOn(scope, 'closePopovers');

    ctrl.actionLoadList();
    ctrl.actionLoadDetail();
    ctrl.edit();
    ctrl.cancelEdit();
    ctrl.setCurrentPageData();
    scope.actionUpdateDetail();
    scope.confirmEdit();
    scope.selectTypeRecords();
    scope.isShowTypeRecord();
    scope.addToRecords();
    scope.removeRecord();
    scope.togglePopover();
    scope.closePopovers();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('actionLoadDetail was called', function() {
    expect(ctrl.actionLoadDetail).toHaveBeenCalled();
  });
  it('edit was called', function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it('cancelEdit was called', function() {
    expect(ctrl.cancelEdit).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });

  it('actionUpdateDetail was called', function() {
    expect(scope.actionUpdateDetail).toHaveBeenCalled();
  });
  it('confirmEdit was called', function() {
    expect(scope.confirmEdit).toHaveBeenCalled();
  });
  it('selectTypeRecords was called', function() {
    expect(scope.selectTypeRecords).toHaveBeenCalled();
  });
  it('isShowTypeRecord was called', function() {
    expect(scope.isShowTypeRecord).toHaveBeenCalled();
  });
  it('addToRecords was called', function() {
    expect(scope.addToRecords).toHaveBeenCalled();
  });
  it('removeRecord was called', function() {
    expect(scope.removeRecord).toHaveBeenCalled();
  });
  it('togglePopover was called', function() {
    expect(scope.togglePopover).toHaveBeenCalled();
  });
  it('closePopovers was called', function() {
    expect(scope.closePopovers).toHaveBeenCalled();
  });
});