'use strict';
import UiKitComponent from '../../../../app/pulsetileui/pages/ui-kit/ui-kit.component';
import '../../../../app/index';

describe('Ui Kit Component', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state, serviceRequests, deviceDetector, ConfirmationDocsModal, serviceVitalsSigns, $window, $timeout;

    beforeEach(inject(($injector, $controller, _$state_, _serviceRequests_, _deviceDetector_, _ConfirmationDocsModal_, _serviceVitalsSigns_, _$window_, _$timeout_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;
        serviceRequests = _serviceRequests_;
        deviceDetector = _deviceDetector_;
        ConfirmationDocsModal = _ConfirmationDocsModal_;
        serviceVitalsSigns = _serviceVitalsSigns_;
        $window = _$window_;
        $timeout = _$timeout_;

        template = UiKitComponent.template;

        ctrl = controller(UiKitComponent.controller, {
            $scope: scope,
            $state: state,
            serviceRequests: _serviceRequests_,
            deviceDetector: _deviceDetector_,
            ConfirmationDocsModal: _ConfirmationDocsModal_,
            serviceVitalsSigns: _serviceVitalsSigns_,
            $window: $window,
            $timeout: $timeout
        });
    }));

    beforeEach(function() {
      spyOn(scope, 'isMobileScreen');
      spyOn(scope, 'scrollTo');
      spyOn(scope, 'toggleSidebar');
      spyOn(scope, 'toggleFullPanelClass');
      spyOn(scope, 'getFullPanelClass');
      spyOn(scope, 'setSelectedLeft');
      spyOn(scope, 'setSelectedRight');
      spyOn(scope, 'toggleSelectedItem');
      spyOn(scope, 'isInSuggestionsList');
      spyOn(scope, 'chooseItem');
      spyOn(scope, 'chooseAll');
      spyOn(scope, 'cancelItem');
      spyOn(scope, 'cancelAll');
      spyOn(ctrl, 'openModal');
      spyOn(scope, 'getHighlighterClass');
      spyOn(ctrl, 'showInfo');
            
      scope.isMobileScreen();
      scope.scrollTo();
      scope.toggleSidebar();
      scope.toggleFullPanelClass();
      scope.getFullPanelClass();
      scope.setSelectedLeft();
      scope.setSelectedRight();
      scope.toggleSelectedItem();
      scope.isInSuggestionsList();
      scope.chooseItem();
      scope.chooseAll();
      scope.cancelItem();
      scope.cancelAll();
      ctrl.openModal();
      scope.getHighlighterClass();
      ctrl.showInfo();
    });


    it("Controller exist", function() {
        expect(ctrl).toBeDefined();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });

    it("isMobileScreen was called", function() {
      expect(scope.isMobileScreen).toHaveBeenCalled();
    });
    it("scrollTo was called", function() {
        expect(scope.scrollTo).toHaveBeenCalled();
    });
    it("toggleSidebar was called", function() {
        expect(scope.toggleSidebar).toHaveBeenCalled();
    });
    it("toggleFullPanelClass was called", function() {
        expect(scope.toggleFullPanelClass).toHaveBeenCalled();
    });
    it("getFullPanelClass was called", function() {
        expect(scope.getFullPanelClass).toHaveBeenCalled();
    });
    it("setSelectedLeft was called", function() {
        expect(scope.setSelectedLeft).toHaveBeenCalled();
    });
    it("setSelectedRight was called", function() {
        expect(scope.setSelectedRight).toHaveBeenCalled();
    });
    it("toggleSelectedItem was called", function() {
        expect(scope.toggleSelectedItem).toHaveBeenCalled();
    });
    it("isInSuggestionsList was called", function() {
        expect(scope.isInSuggestionsList).toHaveBeenCalled();
    });
    it("chooseItem was called", function() {
        expect(scope.chooseItem).toHaveBeenCalled();
    });
    it("chooseAll was called", function() {
        expect(scope.chooseAll).toHaveBeenCalled();
    });
    it("cancelItem was called", function() {
        expect(scope.cancelItem).toHaveBeenCalled();
    });
    it("cancelAll was called", function() {
        expect(scope.cancelAll).toHaveBeenCalled();
    });
    it("openModal was called", function() {
        expect(ctrl.openModal).toHaveBeenCalled();
    });
    it("getHighlighterClass was called", function() {
        expect(scope.getHighlighterClass).toHaveBeenCalled();
    });
    it("showInfo was called", function() {
        expect(ctrl.showInfo).toHaveBeenCalled();
    });
});