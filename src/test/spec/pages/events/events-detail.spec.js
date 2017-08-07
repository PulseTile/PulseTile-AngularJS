import EventsDetailComponent from '../../../../app/pulsetileui/pages/events/events-detail.component';
import '../../../../app/index';
import '../../../../app/actions/index';

describe('Events Detail', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope,
        ctrl,
        controller,
        template;

    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _eventsActions_, _serviceRequests_, _usSpinnerService_, _serviceDateTimePicker_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();

        template = EventsDetailComponent.template;

        ctrl = controller(EventsDetailComponent.controller, {
            $scope: scope,
            $state: _$state_,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            eventsActions: _eventsActions_,
            serviceRequests: _serviceRequests_,
            usSpinnerService: _usSpinnerService_,
            serviceDateTimePicker: _serviceDateTimePicker_
        });
        window.onbeforeunload = null;
    }));

    beforeEach(function() {
        spyOn(scope, 'confirmEdit');
        spyOn(scope, 'canStartAppointment');
        spyOn(scope, 'isDoctor');
        spyOn(scope, 'canJoinAppointment');
        spyOn(scope, 'isPatient');
        spyOn(scope, 'startAppointment');
        spyOn(scope, 'joinAppointment');
        spyOn(ctrl, 'edit');
        spyOn(ctrl, 'cancelEdit');
        spyOn(ctrl, 'setCurrentPageData');

        ctrl.edit();
        ctrl.cancelEdit();
        ctrl.setCurrentPageData();
        scope.confirmEdit();
        scope.canStartAppointment();
        scope.isDoctor();
        scope.canJoinAppointment();
        scope.isPatient();
        scope.startAppointment();
        scope.joinAppointment();
    });


    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it('Controller exist', function() {
        expect(ctrl).toBeDefined();
    });

    it("confirmEdit was called", function() {
        expect(scope.confirmEdit).toHaveBeenCalled();
    });
    it("canStartAppointment was called", function() {
        expect(scope.canStartAppointment).toHaveBeenCalled();
    });
    it("isDoctor was called", function() {
        expect(scope.isDoctor).toHaveBeenCalled();
    });
    it("canJoinAppointment was called", function() {
        expect(scope.canJoinAppointment).toHaveBeenCalled();
    });
    it("isPatient was called", function() {
        expect(scope.isPatient).toHaveBeenCalled();
    });
    it("startAppointment was called", function() {
        expect(scope.startAppointment).toHaveBeenCalled();
    });
    it("joinAppointment was called", function() {
        expect(scope.joinAppointment).toHaveBeenCalled();
    });

    it("edit was called", function() {
        expect(ctrl.edit).toHaveBeenCalled();
    });
    it("cancelEdit was called", function() {
        expect(ctrl.cancelEdit).toHaveBeenCalled();
    });
    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
});