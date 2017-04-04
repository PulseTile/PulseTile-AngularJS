import EventsListComponent from '../../../../app/rippleui/pages/events/events-list.component';
import '../../../../app/index';
import '../../../../app/actions/index';

describe('Events List', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope,
        ctrl,
        controller,
        template;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _eventsActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_, _$timeout_, _serviceStateManager_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();

        template = EventsListComponent.template;

        ctrl = controller(EventsListComponent.controller, {
            $scope: scope,
            $state: _$state_,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            eventsActions: _eventsActions_,
            serviceRequests: _serviceRequests_,
            usSpinnerService: _usSpinnerService_,
            serviceFormatted: _serviceFormatted_,
            $timeout: _$timeout_,
            serviceStateManager: _serviceStateManager_
        });

    }));

    beforeEach(function() {
        spyOn(scope, 'toggleFilterTimeline');
        spyOn(scope, 'saveFilterTimelineParams');
        spyOn(scope, 'refreshSlider');
        spyOn(scope, 'formCollectionsEvents');
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(ctrl, 'go');

        scope.toggleFilterTimeline();
        scope.saveFilterTimelineParams();
        scope.refreshSlider();
        scope.formCollectionsEvents();
        ctrl.setCurrentPageData();
        ctrl.go();
    });

    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it('Controller exist', function() {
        expect(ctrl).toBeDefined();
    });
    it("toggleFilterTimeline was called", function() {
        expect(scope.toggleFilterTimeline).toHaveBeenCalled();
    });
    it("saveFilterTimelineParams was called", function() {
        expect(scope.saveFilterTimelineParams).toHaveBeenCalled();
    });
    it("refreshSlider was called", function() {
        expect(scope.refreshSlider).toHaveBeenCalled();
    });
    it("formCollectionsEvents was called", function() {
        expect(scope.formCollectionsEvents).toHaveBeenCalled();
    });
    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
    it("go was called", function() {
        expect(ctrl.go).toHaveBeenCalled();
    });
});