'use strict';
import {documentsDetailReferralComponent, documentsDetailDischargeComponent} from '../documents-detail-type.component.js';

describe('Documents Details Type', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, templateReferral, ctrlReferral, templateDischarge, ctrlDischarge;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _serviceRequests_, _ConfirmationDocsModal_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    templateReferral = documentsDetailReferralComponent.template;
    ctrlReferral = controller(documentsDetailReferralComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      serviceRequests: _serviceRequests_,
      ConfirmationDocsModal: _ConfirmationDocsModal_,
    });

    templateDischarge = documentsDetailDischargeComponent.template;
    ctrlDischarge = controller(documentsDetailDischargeComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      serviceRequests: _serviceRequests_,
      ConfirmationDocsModal: _ConfirmationDocsModal_,
    });
  }));

  beforeEach(function() {
    spyOn(scope, 'setDocument');
    spyOn(scope, 'importToCreate');

    scope.setDocument();
    scope.importToCreate();
  });

  it('Template of documentsDetailReferralComponent exist', function() {
    expect(templateReferral).toBeDefined();
  });
  it('Controller of documentsDetailReferralComponent exist', function() {
    expect(ctrlReferral).toBeDefined();
  });
  it('Template of documentsDetailDischargeComponent exist', function() {
    expect(templateDischarge).toBeDefined();
  });
  it('Controller of documentsDetailDischargeComponent exist', function() {
    expect(ctrlDischarge).toBeDefined();
  });

  it('setDocument was called', function() {
    expect(scope.setDocument).toHaveBeenCalled();
  });
  it('importToCreate was called', function() {
    expect(scope.importToCreate).toHaveBeenCalled();
  });
});