import ProceduresCreateComponent from '../../../../app/rippleui/pages/procedures/procedures-create.component';
import '../../../../app/index';

describe('Procedures Create', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _proceduresActions_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;

        template = ProceduresCreateComponent.template;
        ctrl = controller(ProceduresCreateComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            patientsActions: _patientsActions_,
            proceduresActions: _proceduresActions_,
            serviceRequests: _serviceRequests_
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(ctrl, 'goList');
        spyOn(ctrl, 'cancel');
        spyOn(scope, 'proceduresCreate');
        spyOn(scope, 'create');

        ctrl.setCurrentPageData();
        ctrl.goList();
        ctrl.cancel();
        scope.proceduresCreate();
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
    it("proceduresCreate was called", function() {
        expect(scope.proceduresCreate).toHaveBeenCalled();
    });
    it("create was called", function() {
        expect(scope.create).toHaveBeenCalled();
    });
});