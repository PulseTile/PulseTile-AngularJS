import GenericMdtCreateComponent from '../../../../app/rippleui/pages/generic-mdt/generic-mdt-create.component';
import '../../../../app/index';

describe('GenericMdt Create', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _genericmdtActions_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;

        template = GenericMdtCreateComponent.template;
        ctrl = controller(GenericMdtCreateComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            patientsActions: _patientsActions_,
            genericmdtActions: _genericmdtActions_,
            serviceRequests: _serviceRequests_
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(ctrl, 'goList');
        spyOn(ctrl, 'cancel');
        spyOn(scope, 'genericmdtCreate');
        spyOn(scope, 'create');

        ctrl.setCurrentPageData();
        ctrl.goList();
        ctrl.cancel();
        scope.genericmdtCreate();
        scope.create();

    });

    it('Template exist', function() {
        expect(template).toBeDefined();
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
    it("genericmdtCreate was called", function() {
        expect(scope.genericmdtCreate).toHaveBeenCalled();
    });
    it("create was called", function() {
        expect(scope.create).toHaveBeenCalled();
    });
});