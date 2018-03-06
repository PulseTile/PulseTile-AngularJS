import EventsListComponent from '../events-list.component';
import * as types from '../action-types';
import events from '../events-reducer-all.js';

describe('Events List', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, fakeCall, serviceStateManager;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _eventsActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_, _$timeout_, _serviceStateManager_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    serviceStateManager = _serviceStateManager_;
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
    fakeCall = {
        callEvents: events
    };

    spyOn(fakeCall, 'callEvents');
    fakeCall.callEvents({}, types.EVENTS);

    spyOn(scope, 'toggleFilterTimeline');
    spyOn(scope, 'saveFilterTimelineParams');
    spyOn(scope, 'refreshSlider');
    spyOn(scope, 'configScrollbar');
    spyOn(scope, 'formCollectionsEvents');
    spyOn(scope, 'filterEvents');
    spyOn(scope, 'filterEventsRange');
    spyOn(scope, 'getFilterArray');
    spyOn(scope, 'modificateEventsArr');
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'isActiveCreate');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'go');

    scope.toggleFilterTimeline();
    scope.saveFilterTimelineParams();
    scope.refreshSlider();
    scope.configScrollbar();
    scope.formCollectionsEvents();
    scope.filterEvents();
    scope.filterEventsRange();
    scope.getFilterArray();
    scope.modificateEventsArr();
    ctrl.actionLoadList();
    ctrl.isActiveCreate();
    ctrl.create();
    ctrl.go();
    ctrl.setCurrentPageData();
  });

  beforeEach(function() {
    spyOn(serviceStateManager, 'getFilter');
    spyOn(serviceStateManager, 'setFilter');

    serviceStateManager.getFilter();
    serviceStateManager.setFilter();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('toggleFilterTimeline was called', function() {
    expect(scope.toggleFilterTimeline).toHaveBeenCalled();
  });
  it('saveFilterTimelineParams was called', function() {
    expect(scope.saveFilterTimelineParams).toHaveBeenCalled();
  });
  it('refreshSlider was called', function() {
    expect(scope.refreshSlider).toHaveBeenCalled();
  });
  it('configScrollbar was called', function() {
    expect(scope.configScrollbar).toHaveBeenCalled();
  });
  it('formCollectionsEvents was called', function() {
    expect(scope.formCollectionsEvents).toHaveBeenCalled();
  });
  it('filterEvents was called', function() {
    expect(scope.filterEvents).toHaveBeenCalled();
  });
  it('filterEventsRange was called', function() {
    expect(scope.filterEventsRange).toHaveBeenCalled();
  });
  it('getFilterArray was called', function() {
    expect(scope.getFilterArray).toHaveBeenCalled();
  });
  it('modificateEventsArr was called', function() {
    expect(scope.modificateEventsArr).toHaveBeenCalled();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('isActiveCreate was called', function() {
    expect(ctrl.isActiveCreate).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it('go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it('Events reducer was called', function() {
    expect(fakeCall.callEvents).toHaveBeenCalled();
  });
  it('getFilter was called', function() {
    expect(serviceStateManager.getFilter).toHaveBeenCalled();
  });
  it('setFilter was called', function() {
    expect(serviceStateManager.setFilter).toHaveBeenCalled();
  });
});