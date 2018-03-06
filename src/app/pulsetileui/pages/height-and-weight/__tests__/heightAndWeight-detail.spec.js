'use strict';
import HeightAndWeightDetailComponent from '../heightAndWeight-detail.component.js';

describe('HeightAndWeight Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _heightAndWeightActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = HeightAndWeightDetailComponent.template;
    ctrl = controller(HeightAndWeightDetailComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      heightAndWeightActions: _heightAndWeightActions_,
      usSpinnerService: _usSpinnerService_
    });
  }));
  beforeEach(function() {
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'heightAndWeightLoad');

    ctrl.heightAndWeightLoad();
    ctrl.setCurrentPageData();
  });

  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('heightAndWeightLoad was called', function() {
    expect(ctrl.heightAndWeightLoad).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});