'use strict';
import ProfileComponent from '../../../../app/rippleui/pages/profile/profile.component.js'
import '../../../../app/index';

describe('Profile', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, serviceRequests;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _allergiesActions_, _serviceRequests_, _usSpinnerService_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();

        template = ProfileComponent.template;
        ctrl = controller(ProfileComponent.controller, {
            $scope: scope,
            $state: _$state_,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            allergiesActions: _allergiesActions_,
            serviceRequests: _serviceRequests_,
            usSpinnerService: _usSpinnerService_
        });
    }));
    beforeEach(function() {

        spyOn(ctrl, 'personalEdit');
        spyOn(ctrl, 'contactEdit');
        spyOn(ctrl, 'cancelPersonalEdit');
        spyOn(ctrl, 'cancelContactEdit');
        spyOn(scope, 'confirmPersonalEdit');

        ctrl.personalEdit();
        ctrl.contactEdit();
        ctrl.cancelPersonalEdit();
        ctrl.cancelContactEdit();
        scope.confirmPersonalEdit();
    });

    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it('Controller exist', function() {
        expect(ctrl).toBeDefined();
    });
    it("personalEdit was called", function() {
        expect(ctrl.personalEdit).toHaveBeenCalled();
    });
    it("contactEdit was called", function() {
        expect(ctrl.contactEdit).toHaveBeenCalled();
    });
    it("cancelPersonalEdit was called", function() {
        expect(ctrl.cancelPersonalEdit).toHaveBeenCalled();
    });
    it("cancelContactEdit was called", function() {
        expect(ctrl.cancelContactEdit).toHaveBeenCalled();
    });
    it("confirmPersonalEdit was called", function() {
        expect(scope.confirmPersonalEdit).toHaveBeenCalled();
    });
});