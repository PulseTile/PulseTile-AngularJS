'use strict';
import serviceTransferOfCare from '../serviceTransferOfCare.js';

describe('serviceTransferOfCare', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let ctrl, controller;

  beforeEach(inject(($injector, $controller) => {
    controller = $controller;
    ctrl = controller(serviceTransferOfCare, {
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'getConfig');
    spyOn(ctrl, 'isInCache');
    spyOn(ctrl, 'setInCache');
    spyOn(ctrl, 'getInCache');
    spyOn(ctrl, 'changeArraysForTable');
    spyOn(ctrl, 'setDiagnosisRecords');
    spyOn(ctrl, 'setMedicationRecords');
    spyOn(ctrl, 'setReferralsRecords');
    spyOn(ctrl, 'modificateEventsArr');
    spyOn(ctrl, 'setEventsRecords');
    spyOn(ctrl, 'setVitalsRecords');

    ctrl.getConfig();
    ctrl.isInCache();
    ctrl.setInCache();
    ctrl.getInCache();
    ctrl.changeArraysForTable();
    ctrl.setDiagnosisRecords();
    ctrl.setMedicationRecords();
    ctrl.setReferralsRecords();
    ctrl.modificateEventsArr();
    ctrl.setEventsRecords();
    ctrl.setVitalsRecords();
  });

  it('currentData exist', function() {
    expect(ctrl.currentData).toBeDefined();
  });
  it('config exist', function() {
    expect(ctrl.config).toBeDefined();
  });
  it('cache exist', function() {
    expect(ctrl.cache).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('getConfig was called', function() {
      expect(ctrl.getConfig).toHaveBeenCalled();
  });
  it('isInCache was called', function() {
      expect(ctrl.isInCache).toHaveBeenCalled();
  });
  it('setInCache was called', function() {
      expect(ctrl.setInCache).toHaveBeenCalled();
  });
  it('getInCache was called', function() {
      expect(ctrl.getInCache).toHaveBeenCalled();
  });
  it('changeArraysForTable was called', function() {
      expect(ctrl.changeArraysForTable).toHaveBeenCalled();
  });
  it('setDiagnosisRecords was called', function() {
      expect(ctrl.setDiagnosisRecords).toHaveBeenCalled();
  });
  it('setMedicationRecords was called', function() {
      expect(ctrl.setMedicationRecords).toHaveBeenCalled();
  });
  it('setReferralsRecords was called', function() {
      expect(ctrl.setReferralsRecords).toHaveBeenCalled();
  });
  it('modificateEventsArr was called', function() {
      expect(ctrl.modificateEventsArr).toHaveBeenCalled();
  });
  it('setEventsRecords was called', function() {
      expect(ctrl.setEventsRecords).toHaveBeenCalled();
  });
  it('setVitalsRecords was called', function() {
      expect(ctrl.setVitalsRecords).toHaveBeenCalled();
  });
});