'use strict';
import EolcareplansDetailComponent from '../../../../app/pulsetileui/pages/care-plans/eolcareplans-detail.component';
import '../../../../app/index';

describe('Care Plans Detail', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope,
    ctrl,
    controller,
    template,
    stateParams,
    state,
    ngRedux,
    eolcareplansActions, serviceRequests, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _eolcareplansActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    eolcareplansActions = _eolcareplansActions_;
    usSpinnerService = _usSpinnerService_;

    template = EolcareplansDetailComponent.template;

    ctrl = controller(EolcareplansDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      eolcareplansActions: eolcareplansActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  beforeEach(function() {
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'eolcareplansLoad');

    ctrl.setCurrentPageData();
    ctrl.eolcareplansLoad();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("eolcareplansLoad was called", function() {
    expect(ctrl.eolcareplansLoad).toHaveBeenCalled();
  });
});