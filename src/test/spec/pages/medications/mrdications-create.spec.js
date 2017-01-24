import MedicationsCreateComponent from '../../../../app/rippleui/pages/medications/medications-create.component';
import '../../../../app/index';

describe('Medications Create', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _medicationsActions_, _serviceRequests_, _usSpinnerService_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;

        template = MedicationsCreateComponent.template;
        ctrl = controller(MedicationsCreateComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            medicationsActions: _medicationsActions_,
            serviceRequests: _serviceRequests_,
            usSpinnerService: _usSpinnerService_
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(ctrl, 'goList');
        spyOn(ctrl, 'cancel');
        spyOn(scope, 'medicationsCreate');
        spyOn(scope, 'medicationsLoad');
        spyOn(scope, 'create');

        ctrl.setCurrentPageData();
        ctrl.goList();
        ctrl.cancel();
        scope.medicationsCreate();
        scope.medicationsLoad();
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
    it("medicationsCreate was called", function() {
        expect(scope.medicationsCreate).toHaveBeenCalled();
    });
    it("medicationsLoad was called", function() {
        expect(scope.medicationsLoad).toHaveBeenCalled();
    });
    it("create was called", function() {
        expect(scope.create).toHaveBeenCalled();
    });
});