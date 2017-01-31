'use strict';
import PatientsComponent from '../../../../app/rippleui/pages/patients-list-full/patients-list-full.component';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import patients from '../../../../app/rippleui/pages/patients-list/patients-reducer-all';

describe('Patients List', function() {

    beforeEach(angular.mock.module('ripple-ui'));
    beforeEach(angular.mock.module('app.actions'));

    let scope,
        ctrl,
        controller,
        template,
        state,
        stateParams,
        location,
        ngRedux,
        patientsActions,
        serviceRequests,
        Patient,
        actions,
        fakeCall,
        searchReport,
        $window,
        $rootScope;
    // $scope, $window, $rootScope, $state, $stateParams, $ngRedux, searchReport, Patient, serviceRequests, patientsActions
    beforeEach(inject(($injector, $controller, _$window_, _$rootScope_, _$state_, _$stateParams_, _$ngRedux_, _searchReport_, _Patient_, _serviceRequests_, _patientsActions_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        $window = _$window_;
        $rootScope = _$rootScope_;
        state = _$state_;
        stateParams = _$stateParams_;
        ngRedux = _$ngRedux_;
        searchReport = _searchReport_;
        Patient = _Patient_;
        serviceRequests = _serviceRequests_;
        patientsActions = _patientsActions_;

        stateParams.patientsList = [];

        template = PatientsComponent.template;
        ctrl = controller(PatientsComponent.controller, {
            $scope: scope,
            $window: $window,
            $rootScope: $rootScope,
            $state: state,
            $stateParams: stateParams,
            $ngRedux: ngRedux,
            searchReport: searchReport,
            Patient: Patient,
            serviceRequests: serviceRequests,
            patientsActions: patientsActions
        });

        actions = $injector.get('patientsActions');
    }));

    beforeEach(function() {
        fakeCall = {
            callPatients: patients
        };

        spyOn(fakeCall, 'callPatients');
        fakeCall.callPatients({}, types.PATIENTS);

        spyOn(ctrl, 'sort');
        spyOn(ctrl, 'sortClass');
        spyOn(ctrl, 'go');
        spyOn(ctrl, 'setPatients');
        spyOn(ctrl, 'toggleFilter');
        spyOn(ctrl, 'processCounts');
        spyOn(ctrl, 'processDateFormat');
        spyOn(ctrl, 'processData');
        spyOn(ctrl, 'setDataRequest');
        spyOn(ctrl, 'viewPatients');
        spyOn(ctrl, 'viewDateTime');
        spyOn(ctrl, 'viewCounts');
        spyOn(ctrl, 'goToSection');
        spyOn(ctrl, 'getItem');

        ctrl.sort();
        ctrl.sortClass();
        ctrl.go();
        ctrl.setPatients();
        ctrl.toggleFilter();
        ctrl.processCounts();
        ctrl.processDateFormat();
        ctrl.processData();
        ctrl.setDataRequest();
        ctrl.viewPatients();
        ctrl.viewDateTime();
        ctrl.viewCounts();
        ctrl.goToSection();
        ctrl.getItem();
    });

    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it('Controller exist', function() {
        expect(ctrl).toBeDefined();
    });
    it('Include patientsActions in index actions file', function() {
        expect(actions).toBeDefined();
    });
    it("Patients reducer was called", function() {
        expect(fakeCall.callPatients).toHaveBeenCalled();
    });
    it("sort was called", function() {
        expect(ctrl.sort).toHaveBeenCalled();
    });
    it("sortClass was called", function() {
        expect(ctrl.sortClass).toHaveBeenCalled();
    });
    it("route go was called", function() {
        expect(ctrl.go).toHaveBeenCalled();
    });
    it("setPatients was called", function() {
        expect(ctrl.setPatients).toHaveBeenCalled();
    });
    it("toggleFilter was called", function() {
        expect(ctrl.toggleFilter).toHaveBeenCalled();
    });
    it("processCounts was called", function() {
        expect(ctrl.processCounts).toHaveBeenCalled();
    });
    it("processDateFormat was called", function() {
        expect(ctrl.processDateFormat).toHaveBeenCalled();
    });
    it("processData was called", function() {
        expect(ctrl.processData).toHaveBeenCalled();
    });
    it("setDataRequest was called", function() {
        expect(ctrl.setDataRequest).toHaveBeenCalled();
    });
    it("viewPatients was called", function() {
        expect(ctrl.viewPatients).toHaveBeenCalled();
    });
    it("viewDateTime was called", function() {
        expect(ctrl.viewDateTime).toHaveBeenCalled();
    });
    it("viewCounts was called", function() {
        expect(ctrl.viewCounts).toHaveBeenCalled();
    });
    it("goToSection was called", function() {
        expect(ctrl.goToSection).toHaveBeenCalled();
    });
    it("getItem was called", function() {
        expect(ctrl.getItem).toHaveBeenCalled();
    });
});