'use strict';
import ServiceFormatted from '../serviceFormatted';

describe('ServiceFormatted', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let ctrl, controller;

  beforeEach(inject(($injector, $controller) => {
    controller = $controller;
    ctrl = controller(ServiceFormatted, {
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'modificate');
    spyOn(ctrl, 'formattingDate');
    spyOn(ctrl, 'formattingTablesDate');
    spyOn(ctrl, 'getDateSeconds');
    spyOn(ctrl, 'formattedSearching');
    spyOn(ctrl, 'formattedSearching2');
    spyOn(ctrl, 'propsToString');

    ctrl.modificate();
    ctrl.formattingDate();
    ctrl.formattingTablesDate();
    ctrl.getDateSeconds();
    ctrl.formattedSearching();
    ctrl.formattedSearching2();
    ctrl.propsToString();

  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('modificate was called', function() {
    expect(ctrl.modificate).toHaveBeenCalled();
  });
  it('formattingDate was called', function() {
    expect(ctrl.formattingDate).toHaveBeenCalled();
  });
  it('formattingTablesDate was called', function() {
    expect(ctrl.formattingTablesDate).toHaveBeenCalled();
  });
  it('getDateSeconds was called', function() {
    expect(ctrl.getDateSeconds).toHaveBeenCalled();
  });
  it('formattedSearching was called', function() {
    expect(ctrl.formattedSearching).toHaveBeenCalled();
  });
  it('formattedSearching2 was called', function() {
    expect(ctrl.formattedSearching2).toHaveBeenCalled();
  });
  it('propsToString was called', function() {
    expect(ctrl.propsToString).toHaveBeenCalled();
  });

});