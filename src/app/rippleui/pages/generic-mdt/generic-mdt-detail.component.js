let templateGenericMdtDetail= require('./generic-mdt-detail.html');

class GenericMdtDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, genericmdtActions, GenericMdtModal, usSpinnerService) {
    this.edit = function () {
      this.genericMdt.timeOfMeeting = new Date(this.genericMdt.timeOfMeeting);
      GenericMdtModal.openModal(this.currentPatient, {title: 'Edit MDT'}, this.genericMdt, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.genericmdt.dataGet) {
        this.genericMdt = data.genericmdt.dataGet;
        usSpinnerService.stop('mdtDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.genericmdtLoad = genericmdtActions.get;
    this.genericmdtLoad($stateParams.patientId, $stateParams.genericMdtIndex);
  }
}

const GenericMdtDetailComponent = {
  template: templateGenericMdtDetail,
  controller: GenericMdtDetailController
};

GenericMdtDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'genericmdtActions', 'GenericMdtModal', 'usSpinnerService'];
export default GenericMdtDetailComponent;