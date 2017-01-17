let templateGenericMdtDetail= require('./generic-mdt-detail.html');

class GenericMdtDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, genericmdtActions, serviceRequests, usSpinnerService) {
    $scope.isEdit = false;
    
    this.edit = function () {
      $scope.isEdit = true;

      $scope.mdtEdit = Object.assign({}, this.genericMdt);
      $scope.mdtEdit.dateSubmitted = new Date();
    };
    
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    
    $scope.confirmEdit = function (mdtForm, genericMdt) {
      $scope.formSubmitted = true;
      if (mdtForm.$valid) {
        $scope.isEdit = false;
        this.genericMdt = Object.assign(this.genericMdt, $scope.mdtEdit);
        $scope.genericmdtUpdate(this.currentPatient.id, this.genericMdt);
      }
    }.bind(this);

    $scope.openDatepicker = function ($event, name) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[name] = true;
    };
    
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.genericmdt.dataGet) {
        this.genericMdt = data.genericmdt.dataGet;
        usSpinnerService.stop('mdtDetail-spinner');
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.genericmdtLoad = genericmdtActions.get;
    this.genericmdtLoad($stateParams.patientId, $stateParams.genericMdtIndex);
    $scope.genericmdtUpdate = genericmdtActions.update;
  }
}

const GenericMdtDetailComponent = {
  template: templateGenericMdtDetail,
  controller: GenericMdtDetailController
};

GenericMdtDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'genericmdtActions', 'serviceRequests', 'usSpinnerService'];
export default GenericMdtDetailComponent;