import DiagnosesCreateComponent from '../../../../app/rippleui/pages/diagnoses/diagnoses-create.component';
import '../../../../app/index';

describe('Diagnoses Create', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _patientsActions_, _diagnosesActions_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;

        template = DiagnosesCreateComponent.template;
        ctrl = controller(DiagnosesCreateComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            patientsActions: _patientsActions_,
            diagnosesActions: _diagnosesActions_,
            serviceRequests: _serviceRequests_
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(ctrl, 'goList');
        spyOn(ctrl, 'cancel');
        spyOn(scope, 'diagnosesCreate');
        spyOn(scope, 'create');

        ctrl.setCurrentPageData();
        ctrl.goList();
        ctrl.cancel();
        scope.diagnosesCreate();
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
    it("diagnosesCreate was called", function() {
        expect(scope.diagnosesCreate).toHaveBeenCalled();
    });
    it("create was called", function() {
        expect(scope.create).toHaveBeenCalled();
    });
});