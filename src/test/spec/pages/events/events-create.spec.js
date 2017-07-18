import EventsCreateComponent from '../../../../app/pulsetileui/pages/events/events-create.component';
import '../../../../app/index';
import '../../../../app/actions/index';

describe('Events Create', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope,
        ctrl,
        controller,
        template;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _eventsActions_, _serviceRequests_, _ScheduleModal_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();

        template = EventsCreateComponent.template;

        ctrl = controller(EventsCreateComponent.controller, {
            $scope: scope,
            $state: _$state_,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            eventsActions: _eventsActions_,
            serviceRequests: _serviceRequests_,
            ScheduleModal: _ScheduleModal_
        });

    }));
    
    beforeEach(function() {
        spyOn(scope, 'create');
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(ctrl, 'goList');
        spyOn(ctrl, 'cancel');

        scope.create()
        ctrl.setCurrentPageData();
        ctrl.goList();
        ctrl.cancel();
    });

    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it('Controller exist', function() {
        expect(ctrl).toBeDefined();
    });
    it("create was called", function() {
        expect(scope.create).toHaveBeenCalled();
    });
    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
    it("goList was called", function() {
        expect(ctrl.goList).toHaveBeenCalled();
    });
    it("cancel was called", function() {
        expect(ctrl.cancel).toHaveBeenCalled();
    });
});