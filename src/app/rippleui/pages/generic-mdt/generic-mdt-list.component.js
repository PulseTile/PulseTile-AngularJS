let templateGenericMdtList = require('./generic-mdt-list.html');

class GenericMdtListController {
  constructor($scope, $state, $stateParams, $ngRedux, genericmdtActions, serviceRequests, GenericMdtModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    var vm = this;

    this.currentPage = 1;

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    $scope.search = function (row) {
      return (
        angular.lowercase(row.dateOfRequest).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.serviceTeam).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.dateOfMeeting).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.source).indexOf(angular.lowercase(vm.query) || '') !== -1
      );
    };

    if ($stateParams.filter) {
      vm.query = $stateParams.filter;
    }

    this.go = function (id) {
      $state.go('genericMdt-detail', {
        patientId: $stateParams.patientId,
        genericMdtIndex: id,
        filter: vm.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.selected = function (genericMdtIndex) {
      return genericMdtIndex === $stateParams.genericMdtIndex;
    };

    this.create = function () {
      GenericMdtModal.openModal(this.currentPatient, {title: 'Create MDT'}, {}, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.genericmdt.data) {
        this.genericMdtComposition = data.genericmdt.data;

        for (var i = 0; i < this.genericMdtComposition.length; i++) {
          this.genericMdtComposition[i].dateOfRequest = moment(this.genericMdtComposition[i].dateOfRequest).format('DD-MMM-YYYY');
          this.genericMdtComposition[i].dateOfMeeting = moment(this.genericMdtComposition[i].dateOfMeeting).format('DD-MMM-YYYY');
        }
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.genericmdtLoad = genericmdtActions.all;
    this.genericmdtLoad($stateParams.patientId);
  }
}

const GenericMdtListComponent = {
  template: templateGenericMdtList,
  controller: GenericMdtListController
};

GenericMdtListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'genericmdtActions', 'serviceRequests', 'GenericMdtModal', 'usSpinnerService'];
export default GenericMdtListComponent;