'use strict';
import TransferOfCareCreateComponent from '../transfer-of-care-create.component';

describe('Transfer Of Care Create', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _transferOfCareActions_, _serviceRequests_, _serviceTransferOfCare_, _serviceFormatted_, _usSpinnerService_, _$window_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = TransferOfCareCreateComponent.template;
    ctrl = controller(TransferOfCareCreateComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      transferOfCareActions: _transferOfCareActions_,
      serviceRequests: _serviceRequests_,
      serviceTransferOfCare: _serviceTransferOfCare_,
      serviceFormatted: _serviceFormatted_,
      usSpinnerService: _usSpinnerService_,
      $window: _$window_
    });
  }));

  beforeEach(function() {
    spyOn(scope, 'actionLoadList');
    spyOn(scope, 'actionCreateDetail');
    spyOn(scope, 'selectTypeRecords');
    spyOn(scope, 'isShowTypeRecord');
    spyOn(scope, 'addToRecords');
    spyOn(scope, 'removeRecord');
    spyOn(scope, 'togglePopover');
    spyOn(scope, 'closePopovers');
    spyOn(ctrl, 'goList');
    spyOn(ctrl, 'cancel');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    scope.actionLoadList();
    scope.actionCreateDetail();
    scope.selectTypeRecords();
    scope.isShowTypeRecord();
    scope.addToRecords();
    scope.removeRecord();
    scope.togglePopover();
    scope.closePopovers();
    ctrl.goList();
    ctrl.cancel();
    ctrl.create();
    ctrl.setCurrentPageData();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('actionLoadList was called', function() {
    expect(scope.actionLoadList).toHaveBeenCalled();
  });
  it('actionCreateDetail was called', function() {
    expect(scope.actionCreateDetail).toHaveBeenCalled();
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
  it('goList was called', function() {
    expect(ctrl.goList).toHaveBeenCalled();
  });
  it('cancel was called', function() {
    expect(ctrl.cancel).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});