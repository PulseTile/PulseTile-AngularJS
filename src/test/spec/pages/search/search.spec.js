'use strict';
import SearchComponent from '../../../../app/rippleui/search/search.component.js';
import '../../../../app/index';

describe('SearchComponent', function() {

    beforeEach(angular.mock.module('ripple-ui'));
    
    let scope, ctrl, controller, state, template, serviceRequests, AdvancedSearch, isClickToAdvancedSearch;

    beforeEach(inject(($injector, $controller, _serviceRequests_, _AdvancedSearch_, _$state_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;
        serviceRequests = _serviceRequests_;
        AdvancedSearch = _AdvancedSearch_;

        template = SearchComponent.template;
        ctrl = controller(SearchComponent.controller, {
            $scope: scope,
            serviceRequests: serviceRequests,
            AdvancedSearch: AdvancedSearch,
            $state: state
        });
        isClickToAdvancedSearch = ctrl.isClickToAdvancedSearch;
    }));

    beforeEach(function() {
        spyOn(ctrl, 'hideSearch');
        spyOn(ctrl, 'searchFunction');

        ctrl.hideSearch();
        ctrl.searchFunction();
    });

    it('isClickToAdvancedSearch is true', function() {
        expect(isClickToAdvancedSearch).toBe(true);
    });
    it('mainSearchEnabled is true', function() {
        expect(ctrl.mainSearchEnabled).toBe(true);
    });
    it('Controller exist', function() {
        expect(ctrl).toBeDefined();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it("serviceRequests exist", function() {
        expect(serviceRequests).toBeDefined();
    });
    it("hideSearch was called", function() {
        expect(ctrl.hideSearch).toHaveBeenCalled();
    });
    it("searchFunction was called", function() {
        expect(ctrl.searchFunction).toHaveBeenCalled();
    });
});