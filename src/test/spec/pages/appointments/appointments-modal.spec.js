'use strict';
import '../../../../app/index';

describe('Appointments Modal', function() {

    beforeEach(angular.mock.module('ripple-ui'));
    
    let scope, 
        controller, 
        uibModal, 
        appointmentsActions, 
        ngRedux, 
        stateParams, 
        AppointmentsModal;
    
    beforeEach(inject(($injector, $controller, _$uibModal_, _appointmentsActions_, _$ngRedux_, _$stateParams_) => {
        controller = $controller;
        scope = $injector.get('AppointmentsModal');
        uibModal = _$uibModal_;
        ngRedux = _$ngRedux_;
        stateParams = _$stateParams_;
        appointmentsActions = _appointmentsActions_;
    }));
    
    beforeEach(function() {
        AppointmentsModal = scope;
        
        spyOn(AppointmentsModal, 'openModal');
        
        AppointmentsModal.openModal();
    });
    
    it('Appointments Modal component exist', function() {
        expect(AppointmentsModal).toBeDefined();
    });
    it('openModal was called', function() {
        expect(AppointmentsModal.openModal).toHaveBeenCalled();
    });
});