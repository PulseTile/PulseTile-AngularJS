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
        title: 'Problems / Diagnoses',
        state: 'diagnoses'
      }];

  $stateProvider
    .state('diagnoses', {
      url: '/patients/{patientId:int}/diagnoses?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<diagnoses-list-component></diagnoses-list-component>'}
      },
      params: {patientId: null, reportType: null},
      breadcrumbs: breadcrumbs
    })
    .state('diagnoses-create', {
      url: '/patients/{patientId:int}/diagnoses/create?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<diagnoses-list-component></diagnoses-list-component>'},
        detail: {template: '<diagnoses-create-component></diagnoses-create-component>'}
      },
      params: {patientId: null, reportType: null, importData: null},
      breadcrumbs: breadcrumbs
    })
    .state('diagnoses-detail', {
      url: '/patients/{patientId:int}/diagnoses/{detailsIndex}?page&reportType&searchString&queryType&source',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<diagnoses-list-component></diagnoses-list-component>'},
        detail: {template: '<diagnoses-detail-component></diagnoses-detail-component>'}
      },
      params: {patientId: null, reportType: null, detailsIndex: null},
      breadcrumbs: breadcrumbs
    })
}

export default routeConfig;