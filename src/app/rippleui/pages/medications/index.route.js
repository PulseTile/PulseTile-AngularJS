/*
 ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
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
        title: 'Medications',
        state: 'medications'
      }];

  $stateProvider
    .state('medications', {
      url: '/patients/{patientId:int}/medications?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<medications-list-component></medications-list-component>'}
      },
      params: {patientId: null, reportType: null},
      breadcrumbs: breadcrumbs
    })
    .state('medications-create', {
      url: '/patients/{patientId:int}/medications/create?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<medications-list-component></medications-list-component>'},
        detail: {template: '<medications-create-component></medications-create-component>'}
      },
      params: {patientId: null, reportType: null, importData: null},
      breadcrumbs: breadcrumbs
    })
    .state('medications-detail', {
      url: '/patients/{patientId:int}/medications/{detailsIndex}?page&reportType&searchString&queryType&source',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<medications-list-component></medications-list-component>'},
        detail: {template: '<medications-detail-component></medications-detail-component>'}
      },
      params: {patientId: null, reportType: null, detailsIndex: null, source: null},
      breadcrumbs: breadcrumbs
    })
}

export default routeConfig;