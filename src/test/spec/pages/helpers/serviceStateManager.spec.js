'use strict';
import ServiceStateManager from '../../../../app/services/serviceStateManager.js';
import '../../../../app/index';

describe('ServiceStateManager', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope,
    ctrl,
    controller,
    template;

  beforeEach(inject(($injector, $controller) => {
    controller = $controller;
    ctrl = controller(ServiceStateManager, {
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'getFilter');
    spyOn(ctrl, 'setFilter');

    ctrl.getFilter();
    ctrl.setFilter();
  });

  it('tableSettings exist', function() {
    expect(ctrl.tableSettings).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("getFilter was called", function() {
    expect(ctrl.getFilter).toHaveBeenCalled();
  });
  it("setFilter was called", function() {
    expect(ctrl.setFilter).toHaveBeenCalled();
  });
});