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
        title: 'Referrals',
        state: 'referrals'
      }];

  $stateProvider
    .state('referrals', {
      url: '/patients/{patientId:int}/referrals?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<referrals-list-component></referrals-list-component>'}
      },
      breadcrumbs: breadcrumbs
    })
    .state('referrals-detail', {
      url: '/patients/{patientId:int}/referrals/{detailsIndex}?page&reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<referrals-list-component></referrals-list-component>'},
        detail: {template: '<referrals-detail-component></referrals-detail-component>'}
      },
      breadcrumbs: breadcrumbs
    })
    .state('referrals-create', {
      url: '/patients/{patientId:int}/referrals/create?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<referrals-list-component></referrals-list-component>'},
        detail: {template: '<referrals-create-component></referrals-create-component>'}
      },
      breadcrumbs: breadcrumbs
    })
}

export default routeConfig;