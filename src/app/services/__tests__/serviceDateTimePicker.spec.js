'use strict';
import ServiceDateTimePicker from '../serviceDateTimePicker';

describe('ServiceDateTimePicker', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let ctrl, controller;

  beforeEach(inject(($injector, $controller) => {
    controller = $controller;
    ctrl = controller(ServiceDateTimePicker, {
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'startDateBeforeRender');
    ctrl.startDateBeforeRender();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('startDateBeforeRender was called', function() {
    expect(ctrl.startDateBeforeRender).toHaveBeenCalled();
  });
});