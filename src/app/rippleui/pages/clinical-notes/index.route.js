routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('clinicalNotes', {
      url: '/patients/{patientId:int}/clinicalNotes?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<clinicalnotes-list-component></clinicalnotes-list-component>'}
      },
      breadcrumbs: [{
        title: 'Patient Listings',
        state: 'patients-list'
      }, {
        title: 'Patient Summary',
        state: 'patients-summary'
      }, {
        title: 'Clinical Notes',
        state: 'clinicalNotes'
      }]
    })
    .state('clinicalNotes-create', {
      url: '/patients/{patientId:int}/clinicalNotes/create?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<clinicalnotes-list-component></clinicalnotes-list-component>'},
        detail: {template: '<clinicalnotes-create-component></clinicalnotes-create-component>'}
      },
      breadcrumbs: [{
        title: 'Patient Listings',
        state: 'patients-list'
      }, {
        title: 'Patient Summary',
        state: 'patients-summary'
      }, {
        title: 'Clinical Notes',
        state: 'clinicalNotes'
      }]
    })
    .state('clinicalNotes-detail', {
      url: '/patients/{patientId:int}/clinicalNotes/{personalNoteIndex}?filter&page&reportType&searchString&queryType&source',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<clinicalnotes-list-component></clinicalnotes-list-component>'},
        detail: {template: '<clinicalnotes-detail-component></clinicalnotes-detail-component>'}
      },
      params: { source: '{}' },
      breadcrumbs: [{
        title: 'Patient Listings',
        state: 'patients-list'
      }, {
        title: 'Patient Summary',
        state: 'patients-summary'
      }, {
        title: 'Clinical Notes',
        state: 'clinicalNotes'
      }]
    })

}

export default routeConfig;