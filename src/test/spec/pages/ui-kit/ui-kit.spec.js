'use strict';
import UiKitComponent from '../../../../app/rippleui/pages/ui-kit/ui-kit.component';
import '../../../../app/index';

describe('Ui Kit Component', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state;

    beforeEach(inject(($injector, $controller, _$state_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;

        template = UiKitComponent.template;
        ctrl = controller(UiKitComponent.controller, {
            $scope: scope,
            $state: state,
            serviceRequests: _serviceRequests_
        });
    }));


    it("Controller exist", function() {
        expect(ctrl).toBeDefined();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });
});