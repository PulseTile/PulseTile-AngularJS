'use strict';
import DocumentsDetailComponent from '../documents-detail.component.js';

describe('Documents Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _documentsActions_, _usSpinnerService_, _serviceRequests_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = DocumentsDetailComponent.template;
    ctrl = controller(DocumentsDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      documentsActions: _documentsActions_,
      usSpinnerService: _usSpinnerService_,
      serviceRequests: _serviceRequests_,
    });
  }));

  beforeEach(function() {
    spyOn(scope, 'sendDocument');
    spyOn(scope, 'getTypeOfDocument');
    spyOn(ctrl, 'actionLoaddetail');
    spyOn(ctrl, 'setCurrentPageData');

    scope.sendDocument();
    scope.getTypeOfDocument();
    ctrl.actionLoaddetail();
    ctrl.setCurrentPageData();

  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('sendDocument was called', function() {
    expect(scope.sendDocument).toHaveBeenCalled();
  });
  it('getTypeOfDocument was called', function() {
    expect(scope.getTypeOfDocument).toHaveBeenCalled();
  });

  it('actionLoaddetail was called', function() {
    expect(ctrl.actionLoaddetail).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});