'use strict';
import HeightAndWeightDetailComponent from '../../../../app/rippleui/pages/height-and-weight/heightAndWeight-detail.component.js';
import '../../../../app/index';

describe('HeightAndWeight Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, heightAndWeightActions, HeightAndWeightModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _heightAndWeightActions_, _HeightAndWeightModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    heightAndWeightActions = _heightAndWeightActions_;
    HeightAndWeightModal = _HeightAndWeightModal_;
    usSpinnerService = _usSpinnerService_;

    template = HeightAndWeightDetailComponent.template;
    ctrl = controller(HeightAndWeightDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      heightAndWeightActions: heightAndWeightActions,
      HeightAndWeightModal: HeightAndWeightModal,
      usSpinnerService: usSpinnerService
    });
  }));
  beforeEach(function() {
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'heightAndWeightLoad');
    spyOn(ctrl, 'edit');

    ctrl.heightAndWeightLoad();
    ctrl.setCurrentPageData();
    ctrl.edit();
  });

  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('UnlockedSources', function() {
    expect(scope.UnlockedSources[0]).toBe('handi.ehrscape.com');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("heightAndWeightLoad was called", function() {
    expect(ctrl.heightAndWeightLoad).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("edit was called", function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
});