import EventsDetailComponent from '../../../../app/pulsetileui/pages/events/events-detail.component';
import '../../../../app/index';
import '../../../../app/actions/index';

describe('Events Detail', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope,
        ctrl,
        controller,
        template;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _eventsActions_, _serviceRequests_, _usSpinnerService_) => {
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
            usSpinnerService: _usSpinnerService_
        });
        window.onbeforeunload = null;
    }));

    beforeEach(function() {
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(scope, 'canStartAppointment');
        spyOn(scope, 'canJoinAppointment');
        spyOn(scope, 'startAppointment');
        spyOn(scope, 'joinAppointment');

        ctrl.setCurrentPageData();
        scope.canStartAppointment();
        scope.canJoinAppointment();
        scope.startAppointment();
        scope.joinAppointment();
    });


    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it('Controller exist', function() {
        expect(ctrl).toBeDefined();
    });
    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
    it("canStartAppointment was called", function() {
        expect(scope.canStartAppointment).toHaveBeenCalled();
    });
    it("canJoinAppointment was called", function() {
        expect(scope.canJoinAppointment).toHaveBeenCalled();
    });
    it("startAppointment was called", function() {
        expect(scope.startAppointment).toHaveBeenCalled();
    });
    it("joinAppointment was called", function() {
        expect(scope.joinAppointment).toHaveBeenCalled();
    });
});