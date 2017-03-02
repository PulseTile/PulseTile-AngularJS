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
  $stateProvider

    .state('appointments', {
      url: '/patients/{patientId:int}/appointments?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<appointments-list-component></appointments-list-component>'}
      }
    })
    .state('appointments-detail', {
      url: '/patients/{patientId:int}/appointments/{appointmentIndex}?filter&page&reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<appointments-list-component></appointments-list-component>'},
        detail: {template: '<appointments-detail-component></appointments-detail-component>'}
      }
    })
    .state('appointments-create', {
      url: '/patients/{patientId:int}/appointments/create?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<appointments-list-component></appointments-list-component>'},
        detail: {template: '<appointments-create-component></appointments-create-component>'}
      },
      params: {patientId: null, reportType: null}
    })
}

export default routeConfig;