'use strict';
import DocumentsDetailComponent from '../../../../app/pulsetileui/pages/documents/documents-detail.component.js';
import '../../../../app/index';

describe('Documents Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, documentsActions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _documentsActions_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    documentsActions = _documentsActions_;

    template = DocumentsDetailComponent.template;
    ctrl = controller(DocumentsDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      documentsActions: documentsActions
    });
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});