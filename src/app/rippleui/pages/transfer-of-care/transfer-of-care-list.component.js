let templateTransferOfCareList = require('./transfer-of-care-list.html');

class TransferOfCareListController {
  constructor($scope, $state, $stateParams, $ngRedux, transferOfCareActions, serviceRequests, TransferOfCareModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    this.query = '';

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    this.go = function (id, transferfCareSource) {
      $state.go('transferOfCare-detail', {
        patientId: $stateParams.patientId,
        transferOfCareIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: transferfCareSource
      });
    };

    this.create = function () {
      TransferOfCareModal.openModal(this.currentPatient, {title: ''}, {}, this.currentUser);
    };

    this.selected = function (transferOfCareIndex) {
      return transferOfCareIndex === $stateParams.transferOfCareIndex;
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.transferOfCare.data) {
        this.transferofCareComposition = data.transferOfCare.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.transferofCareLoad = transferOfCareActions.all;
    this.transferofCareLoad($stateParams.patientId);
  }
}

const TransferOfCareListComponent = {
  template: templateTransferOfCareList,
  controller: TransferOfCareListController
};

TransferOfCareListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions', 'serviceRequests', 'TransferOfCareModal', 'usSpinnerService'];
export default TransferOfCareListComponent;