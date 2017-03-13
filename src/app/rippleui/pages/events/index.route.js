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
        title: 'Events',
        state: 'events'
      }];
  var eventsCreateParams = {
        url: '/patients/{patientId:int}/events/create?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<events-list-component></events-list-component>'},
          detail: {template: '<events-create-component></events-create-component>'}
        },
        breadcrumbs: breadcrumbs
      };

  $stateProvider
    .state('events', {
      url: '/patients/{patientId:int}/events?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<events-list-component></events-list-component>'}
      },
      breadcrumbs: breadcrumbs
    })
    .state('events-create-appointment', eventsCreateParams)
    .state('events-create-admission', eventsCreateParams)
    .state('events-create-transfer', eventsCreateParams)
    .state('events-create-discharge', eventsCreateParams)
    .state('events-detail', {
      url: '/patients/{patientId:int}/events/{detailsIndex}?page&reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<events-list-component></events-list-component>'},
        detail: {template: '<events-detail-component></events-detail-component>'}
      },
      params: { source: '{}' },
      breadcrumbs: breadcrumbs
    })
}

export default routeConfig;