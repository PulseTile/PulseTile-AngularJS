'use strict';
import DocumentsListComponent from '../../../../app/rippleui/pages/documents/documents-list.component.js';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import documents from '../../../../app/rippleui/pages/documents/documents-reducer-all.js';

describe('Documents List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, 
    ctrl, 
    controller, 
    template, 
    stateParams, 
    state, 
    ngRedux, 
    documentsActions, 
    serviceRequests, 
    usSpinnerService,
    actions,
    fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _documentsActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    documentsActions = _documentsActions_;
    usSpinnerService = _usSpinnerService_;

    template = DocumentsListComponent.template;

    ctrl = controller(DocumentsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      documentsActions: documentsActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('documentsActions');
    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callDocuments: documents
    };

    spyOn(fakeCall, 'callDocuments');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'documentsLoad');

    fakeCall.callDocuments({}, types.DOCUMENTS);

    ctrl.go();
    ctrl.setCurrentPageData();
    ctrl.documentsLoad();
  });

  it('Query is empty', function() {
    expect(ctrl.query).toBe('');
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
  it("Documents reducer was called", function() {
    expect(fakeCall.callDocuments).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("documentsLoad was called", function() {
    expect(ctrl.documentsLoad).toHaveBeenCalled();
  });
});