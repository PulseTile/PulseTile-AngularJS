import AllergiesCreateComponent from '../../../../app/rippleui/pages/allergies/allergies-create.component';
import '../../../../app/index';

describe('Allergies Create', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state, tempObj, ngRedux, allergiesActions, serviceRequests;
    
    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _allergiesActions_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;
        ngRedux = _$ngRedux_;
        allergiesActions = _allergiesActions_;
        serviceRequests = _serviceRequests_;

        template = AllergiesCreateComponent.template;
        ctrl = controller(AllergiesCreateComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: _$stateParams_,
            $ngRedux: ngRedux,
            allergiesActions: allergiesActions,
            serviceRequests: serviceRequests
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(ctrl, 'goList');
        spyOn(ctrl, 'cancel');
        spyOn(ctrl, 'backToDocs');
        spyOn(scope, 'allergiesCreate');
        spyOn(scope, 'allergiesLoad');
        spyOn(scope, 'create');

        ctrl.setCurrentPageData();
        ctrl.goList();
        ctrl.cancel();
        ctrl.backToDocs();
        scope.allergiesCreate();
        scope.allergiesLoad();
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
    it("backToDocs was called", function() {
        expect(ctrl.backToDocs).toHaveBeenCalled();
    });
    it("allergiesCreate was called", function() {
        expect(scope.allergiesCreate).toHaveBeenCalled();
    });
    it("allergiesLoad was called", function() {
        expect(scope.allergiesLoad).toHaveBeenCalled();
    });
    it("create was called", function() {
        expect(scope.create).toHaveBeenCalled();
    });
});