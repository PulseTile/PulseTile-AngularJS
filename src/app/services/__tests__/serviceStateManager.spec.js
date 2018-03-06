'use strict';
import ServiceStateManager from '../serviceStateManager';

describe('ServiceStateManager', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let ctrl, controller;

  beforeEach(inject(($injector, $controller) => {
    controller = $controller;
    ctrl = controller(ServiceStateManager, {
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'getFilter');
    spyOn(ctrl, 'setFilter');
    spyOn(ctrl, 'getFilterTimeline');
    spyOn(ctrl, 'setFilterTimeline');
    spyOn(ctrl, 'getTableSettings');
    spyOn(ctrl, 'setTableSettings');
    spyOn(ctrl, 'clearData');
    spyOn(ctrl, 'getViewsSettings');
    spyOn(ctrl, 'setViewsSettings');
    spyOn(ctrl, 'checkChangeState');

    ctrl.getFilter();
    ctrl.setFilter();
    ctrl.getFilterTimeline();
    ctrl.setFilterTimeline();
    ctrl.getTableSettings();
    ctrl.setTableSettings();
    ctrl.clearData();
    ctrl.getViewsSettings();
    ctrl.setViewsSettings();
    ctrl.checkChangeState();
  });

  it('tableSettings exist', function() {
    expect(ctrl.tableSettings).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('getFilter was called', function() {
    expect(ctrl.getFilter).toHaveBeenCalled();
  });
  it('setFilter was called', function() {
    expect(ctrl.setFilter).toHaveBeenCalled();
  });
  it('getFilterTimeline was called', function() {
      expect(ctrl.getFilterTimeline).toHaveBeenCalled();
  });
  it('setFilterTimeline was called', function() {
      expect(ctrl.setFilterTimeline).toHaveBeenCalled();
  });
  it('getTableSettings was called', function() {
      expect(ctrl.getTableSettings).toHaveBeenCalled();
  });
  it('setTableSettings was called', function() {
      expect(ctrl.setTableSettings).toHaveBeenCalled();
  });
  it('clearData was called', function() {
      expect(ctrl.clearData).toHaveBeenCalled();
  });
  it('getViewsSettings was called', function() {
      expect(ctrl.getViewsSettings).toHaveBeenCalled();
  });
  it('setViewsSettings was called', function() {
      expect(ctrl.setViewsSettings).toHaveBeenCalled();
  });
  it('checkChangeState was called', function() {
      expect(ctrl.checkChangeState).toHaveBeenCalled();
  });
});