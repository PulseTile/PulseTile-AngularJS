'use strict';
import '../../../../app/index';

describe('HeightAndWeight Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, heightAndWeightActions, ngRedux, stateParams, HeightAndWeightModal;

  beforeEach(inject(($injector, $controller, _$uibModal_, _heightAndWeightActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('HeightAndWeightModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    heightAndWeightActions = _heightAndWeightActions_;
  }));
  beforeEach(function() {
    HeightAndWeightModal = scope;
    
    spyOn(HeightAndWeightModal, 'openModal');

    HeightAndWeightModal.openModal();
  });

  it('HeightAndWeight Modal component exist', function() {
    expect(scope).toBeDefined();
  });
  it('openModal was called', function() {
    expect(HeightAndWeightModal.openModal).toHaveBeenCalled();
  });
});