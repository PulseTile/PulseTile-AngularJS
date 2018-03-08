'use strict';
import DocumentsListComponent from '../documents-list.component.js';
import * as types from '../action-types';
import documents from '../documents-reducer-all.js';

describe('Documents List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _documentsActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = DocumentsListComponent.template;

    ctrl = controller(DocumentsListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      documentsActions: _documentsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_,
    });
    actions = $injector.get('documentsActions');
  }));

  beforeEach(function() {
    fakeCall = {
      callDocuments: documents
    };

    spyOn(fakeCall, 'callDocuments');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'actionLoadList');

    fakeCall.callDocuments({}, types.DOCUMENTS);

    ctrl.go();
    ctrl.setCurrentPageData();
    ctrl.actionLoadList();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include contactsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it('Documents reducer was called', function() {
    expect(fakeCall.callDocuments).toHaveBeenCalled();
  });
  it('route go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
});