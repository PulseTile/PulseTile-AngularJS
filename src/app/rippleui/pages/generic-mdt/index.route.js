/*
 ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
 ~  
 ~  Licensed under the Apache License, Version 2.0 (the "License");
 ~  you may not use this file except in compliance with the License.
 ~  You may obtain a copy of the License at
 ~  
 ~    http://www.apache.org/licenses/LICENSE-2.0

 ~  Unless required by applicable law or agreed to in writing, software
 ~  distributed under the License is distributed on an "AS IS" BASIS,
 ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~  See the License for the specific language governing permissions and
 ~  limitations under the License.
 */
routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  var breadcrumbs = [{
        title: 'Patient Listings',
        state: 'patients-list'
      }, {
        title: 'Patient Summary',
        state: 'patients-summary'
      }, {
        title: 'MDT',
        state: 'genericMdt'
      }];

  $stateProvider
    .state('genericMdt', {
      url: '/patients/{patientId:int}/generic-mdt-list?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<generic-mdt-list-component></generic-mdt-list-component>'}
      },
      breadcrumbs: breadcrumbs
    })
    .state('genericMdt-detail', {
      url: '/patients/{patientId:int}/generic-mdt-detail/{detailsIndex}?page&reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<generic-mdt-list-component></generic-mdt-list-component>'},
        detail: {template: '<generic-mdt-detail-component></generic-mdt-detail-component>'}
      },
      params: { source: '{}' },
      breadcrumbs: breadcrumbs
    })
    .state('genericMdt-create', {
      url: '/patients/{patientId:int}/generic-mdt/create?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<generic-mdt-list-component></generic-mdt-list-component>'},
        detail: {template: '<generic-mdt-create-component></generic-mdt-create-component>'}
      },
      breadcrumbs: breadcrumbs
    })
}

export default routeConfig;