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
import plugins from './plugins';
routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  /* istanbul ignore next  */
  $urlRouterProvider.rule(function($injector, $location) {
    var path = $location.path();
    var hasTrailingSlash = path[path.length-1] === '/';

    if (hasTrailingSlash) {
      //if last charcter is a slash, return the same url without the slash  
      var newPath = path.substr(0, path.length - 1); 
      return newPath; 
    } 
  });
  
  $urlRouterProvider.otherwise('/charts');
  
  $stateProvider
      .state('ui-kit', {
        url: '/ui-kit',
        views: {
          main: {template: '<ui-kit-component></ui-kit-component>'}
        },
        breadcrumbs: [
          {
            title: 'UI Kit',
            state: 'ui-kit'
          }]
      })
      .state('profile', {
        url: '/profile',
        views: {
          main: {template: '<profile-component></profile-component>'}
        },
        breadcrumbs: [
        // {
        //   title: 'Patient Listings',
        //   state: 'patients-list'
        // }, 
        {
          title: 'Patient Information',
          state: 'profile'
        }]
      })
      .state('main-search', {
        url: '/search',
        views: {
          main: {template: '<search-component><search-component>'}
        }

      })
      .state('patients-lookup', {
        url: '/lookup',
        views: {
          actions: { template: '<home-sidebar-component><home-sidebar-component>'}
        }
      })
      .state('patients-charts', {
        url: '/charts',
        views: {
          main: {template: '<patients-charts-component><patients-charts-component>'},
        },
        breadcrumbs: [{
          title: 'System Dashboard',
          state: 'patients-charts'
        }]
      })
      .state('patients-list', {
        url: '/patients?ageRange&department&order&reverse',
        views: {
          main: {template: '<patients-component><patients-component>'}
        },
        params: { patientsList: [], advancedSearchParams: [], displayEmptyTable: false, searchString: null, searchDescription: null },
				breadcrumbs: [{
          title: 'Home',
          state: 'patients-charts'
        }, {
					title: 'Patient Listings',
					state: 'patients-list'
				}]
      })
      .state('patients-summary', {
        url: '/patients/{patientId:int}/patients-summary?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<patients-summary-component><patients-summary-component>'}
        },
        params: {patientId: null, patientsList: null },
        breadcrumbs: [{
          title: 'Patient Listings',
          state: 'patients-list'
        }, {
          title: 'Patient Summary',
          state: 'patients-summary'
        }]
      })
      .state('search-report', {
        url: '/search-report?searchString',
        views: {
          main: {template: '<report-chart-component><report-chart-component>'}
        },
        breadcrumbs: [{
          title: 'Home',
          state: 'patients-charts'
        }, {
          title: 'Search Report',
          state: 'search-report'
        }]
      })
      .state('patients-list-full', {
        url: '/patients-full-details?ageFrom&ageTo&orderType&pageNumber&reportType&searchString&queryType',
        views: {
          main: {template: '<patients-list-full-component><patients-list-full-component>'}
        },
        params: {searchParams: null},
      });          
      
  plugins.forEach((plugin)=>{
    plugin.routes($stateProvider);
  })
}

export default routeConfig;