'use strict';
import '../../../../app/index';

describe('Eolcareplans Modal', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, 
      controller,
      uibModal, 
      eolcareplansActions,
      ngRedux, 
      stateParams, 
      EolcareplansModal;

    beforeEach(inject(($injector, $controller, _$uibModal_, _eolcareplansActions_, _$ngRedux_, _$stateParams_) => {
        controller = $controller;
        scope = $injector.get('EolcareplansModal');
        uibModal = _$uibModal_;
        ngRedux = _$ngRedux_;
        stateParams = _$stateParams_;
        eolcareplansActions = _eolcareplansActions_;
    }));

    beforeEach(function() {
        EolcareplansModal = scope;

        spyOn(EolcareplansModal, 'openModal');

        EolcareplansModal.openModal();
    });

    it('openModal was called', function() {
        expect(EolcareplansModal.openModal).toHaveBeenCalled();
    });

    it('Eolcareplans Modal component exist', function() {
        expect(EolcareplansModal).toBeDefined();
    });
});