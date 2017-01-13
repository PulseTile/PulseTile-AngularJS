let templateHeightAndWeightList = require('./heightAndWeight-list.html');

class HeightAndWeightListController {
  constructor($scope, $state, $stateParams, $ngRedux, heightAndWeightActions, serviceRequests, HeightAndWeightModal, usSpinnerService) {
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

    if ($stateParams.filter) {
      vm.query = $stateParams.filter;
    }

    this.search = function (row) {
      return (
        angular.lowercase(row.weight).toString().indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.height).toString().indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.weightRecorded).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.heightRecorded).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.source).indexOf(angular.lowercase(vm.query) || '') !== -1
      );
    };

    this.go = function (id) {
      $state.go('heightAndWeights-detail', {
        patientId: $stateParams.patientId,
        heightAndWeightIndex: id,
        filter: this.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.selected = function (heightAndWeightIndex) {
      return heightAndWeightIndex === $stateParams.heightAndWeightIndex;
    };

    this.create = function () {
      HeightAndWeightModal.openModal(this.currentPatient, {title: 'Create Height And Weight'}, {}, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.heightAndWeight.data) {
        this.heightAndWeights = data.heightAndWeight.data;

        for (var i = 0; i < this.heightAndWeights.length; i++) {
          this.heightAndWeights[i].weightRecorded = moment(this.heightAndWeights[i].weightRecorded).format('DD-MMM-YYYY');
          this.heightAndWeights[i].heightRecorded = moment(this.heightAndWeights[i].heightRecorded).format('DD-MMM-YYYY');
        }
        usSpinnerService.stop("patientSummary-spinner");
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.heightAndWeightLoad = heightAndWeightActions.all;
    this.heightAndWeightLoad($stateParams.patientId);
  }
}

const HeightAndWeightListComponent = {
  template: templateHeightAndWeightList,
  controller: HeightAndWeightListController
};

HeightAndWeightListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'heightAndWeightActions', 'serviceRequests', 'HeightAndWeightModal', 'usSpinnerService'];
export default HeightAndWeightListComponent;