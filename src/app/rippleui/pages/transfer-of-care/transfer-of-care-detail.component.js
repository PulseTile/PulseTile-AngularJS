let templateTransferOfCareDetail= require('./transfer-of-care-detail.html');

class TransferOfCareDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, transferOfCareActions, usSpinnerService) {

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.transferOfCare.dataGet) {
        this.transferOfCare = data.transferOfCare.dataGet;
        this.allergies = data.transferOfCare.dataGet.allergies;
        this.contacts = data.transferOfCare.dataGet.contacts;
        this.problems = data.transferOfCare.dataGet.problems;
        this.medications = data.transferOfCare.dataGet.medications;
        this.dateOfTransfer = data.transferOfCare.dataGet.dateOfTransfer;
        usSpinnerService.stop('transferDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.transferOfCareLoad = transferOfCareActions.get;
    this.transferOfCareLoad($stateParams.patientId, $stateParams.transferOfCareIndex);
  }
}

const TransferOfCareDetailComponent = {
  template: templateTransferOfCareDetail,
  controller: TransferOfCareDetailController
};

TransferOfCareDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions', 'usSpinnerService'];
export default TransferOfCareDetailComponent;