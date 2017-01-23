'use strict';
import EolcareplansDetailComponent from '../../../../app/rippleui/pages/care-plans/eolcareplans-detail.component';
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
    eolcareplansActions, serviceRequests, EolcareplansModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _eolcareplansActions_, _serviceRequests_, _EolcareplansModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    eolcareplansActions = _eolcareplansActions_;
    EolcareplansModal = _EolcareplansModal_;
    usSpinnerService = _usSpinnerService_;

    template = EolcareplansDetailComponent.template;

    ctrl = controller(EolcareplansDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      eolcareplansActions: eolcareplansActions,
      serviceRequests: serviceRequests,
      EolcareplansModal: EolcareplansModal,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  beforeEach(function() {
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'eolcareplansLoad');

    ctrl.edit();
    ctrl.setCurrentPageData();
    ctrl.eolcareplansLoad();
  });

  it('Modal exist', function() {
    expect(EolcareplansModal).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("edit was called", function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("eolcareplansLoad was called", function() {
    expect(ctrl.eolcareplansLoad).toHaveBeenCalled();
  });
});