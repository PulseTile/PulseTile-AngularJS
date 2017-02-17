'use strict';
import ServiceStateMenager from '../../../../app/services/serviceStateMenager.js';
import '../../../../app/index';

describe('ServiceStateMenager', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope,
    ctrl,
    controller,
    template;

  beforeEach(inject(($injector, $controller) => {
    controller = $controller;
    ctrl = controller(ServiceStateMenager, {
    });
  }));

  it('tableSettings exist', function() {
    expect(ctrl.tableSettings).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});