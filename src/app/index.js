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
//libs
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import uiBootstrap from 'angular-ui-bootstrap';
import ngRedux from 'ng-redux';
import dirPagination from 'angular-utils-pagination';
import createLogger from 'redux-logger';
import 'angular-loading-bar';
import 'fullcalendar';
import 'angular-ui-calendar';
import 'angularjs-slider';
import 'angular-sanitize';
import 'chart.js';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-editable';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar';
import 'angular-spinner';
import 'jquery-timepicker-jt';
import 'angular-jquery-timepicker';
import 'angular-xeditable';
import 'ng-scrollbars';
import 'angular-ui-select';
import 'angular-swiper';
import 'swiper';
import 'angular-drag-and-drop-lists';
import 'fabric.js';
import 'angular-bootstrap-datetimepicker';

//commons
import reducer from './redux/reducer';
import actions from './actions';
import httpMiddleware from './helpers/httpMiddleware';
import Patient from './helpers/patient';
import deviceDetector from './helpers/deviceDetector';
import './helpers/polyfills';

//components
import InitialiseComponent from './pulsetileui/initialise/initialise.component';
import MainComponent from './pulsetileui/main-component/main.component';
import HomeSidebarComponent from './pulsetileui/pages/patients-lookup/home-sidebar.component';
import UiKitComponent from './pulsetileui/pages/ui-kit/ui-kit.component';
import ProfileComponent from './pulsetileui/pages/profile/profile.component';
import HeaderComponent from './pulsetileui/header-bar/header.component';
import HandleErrorsComponent from './pulsetileui/handle-errors/handle-errors.component';
import PatientsChartsComponent from './pulsetileui/pages/patients-charts/patients-charts.component';
import PatientsSummaryComponent from './pulsetileui/pages/patient-summary/patients-summary.component';
import PatientsListFullComponent from './pulsetileui/pages/patients-list-full/patients-list-full.component';
import PatientsSidebarComponent from './pulsetileui/pages/patients-detail/patients-sidebar.component';
import PatientsBannerComponent from './pulsetileui/pages/patients-detail/patients-banner.component';
import SearchComponent from './pulsetileui/search/search.component';
import SearchAdvancedComponent from './pulsetileui/search/search-advanced.component';
import ReportChartComponent from './pulsetileui/search/report-chart.component';

import ServiceRequests from './services/serviceRequests.js';
import ServiceStateManager from './services/serviceStateManager.js';
import ServiceFormatted from './services/serviceFormatted.js';
import ServiceDateTimePicker from './services/serviceDateTimePicker.js';
import ServiceThemes from './services/serviceThemes.js';
import ServicePatients from './pulsetileui/pages/patients-list/servicePatients.js';

import ConfirmationModal from './pulsetileui/confirmation/confirmation';
import ConfirmationRedirectModal from './pulsetileui/confirmation/confirmation-redirect';
import ConfirmationDocsModal from './pulsetileui/confirmation/confirmation-documents';
import ConfirmationHandleErrors from './pulsetileui/handle-errors/handle-errors-confirmation';

import routeConfig from 'app/index.route';
import 'app/scss/core.scss';

import 'app/directives/index.js';
import 'app/filters/index.js';
import 'app/pulsetileui/pages/patients-list/index.js';

import plugins from './plugins';

const appModules = [
  uiRouter,
  ngAnimate,
  uiBootstrap,
  ngRedux,
  actions,
  dirPagination,
  'ripple-ui.patients',
  'ripple-ui.directives',
  'ripple-ui.filters',
  'angularSpinner',
  'ui.calendar',
  'ui.timepicker',
  'ui.bootstrap.datetimepicker',
  'angular-loading-bar',
  'xeditable',
  'ngScrollbars',
  'rzModule',
  'ui.select',
  'ksSwiper',
  'ngSanitize',
  'dndLists'
];

  // Add Modules to App from Plugins
  plugins.forEach(plugin => {
    if (plugin.modules) {
      plugin.modules.forEach(item => {
        appModules.push(item);
      })
    }
  });

let app = angular
  .module('ripple-ui', appModules)
  .factory('ConfirmationModal', ConfirmationModal)
  .factory('ConfirmationRedirectModal', ConfirmationRedirectModal)
  .factory('ConfirmationDocsModal', ConfirmationDocsModal)
  .factory('ConfirmationHandleErrors', ConfirmationHandleErrors)

  .factory('httpMiddleware', httpMiddleware)
  .factory('Patient', Patient)
  .factory('deviceDetector', deviceDetector)

  .service('serviceThemes', ServiceThemes)
  .service('servicePatients', ServicePatients)
  .service('serviceFormatted', ServiceFormatted)
  .service('serviceRequests', ServiceRequests)
  .service('serviceStateManager', ServiceStateManager)
  .service('serviceDateTimePicker', ServiceDateTimePicker);


  plugins.forEach(plugin => {
    // Add Factories to App from Plugins
    if (plugin.factories) {
      Object.keys(plugin.factories).forEach(name => {
        app = app.factory(name, plugin.factories[name]);
      })
    }

    // Add Services to App from Plugins
    if (plugin.services) {
      Object.keys(plugin.services).forEach(name => {
        app = app.service(name, plugin.services[name]);
      })
    }

    // Add Components to App from Plugins
    Object.keys(plugin.components).forEach(name => {
      app = app.component(name, plugin.components[name]);
    })
  });

  app
    .component('initialiseComponent', InitialiseComponent)
    .component('mainComponent', MainComponent)
    .component('homeSidebarComponent', HomeSidebarComponent)
    .component('uiKitComponent', UiKitComponent)
    .component('profileComponent', ProfileComponent)
		.component('headerComponent', HeaderComponent)
		.component('handleErrorsComponent', HandleErrorsComponent)
    .component('patientsChartsComponent', PatientsChartsComponent)
    .component('patientsSummaryComponent', PatientsSummaryComponent)
    .component('patientsSidebarComponent', PatientsSidebarComponent)
    .component('patientsBannerComponent', PatientsBannerComponent)   
    .component('patientsListFullComponent', PatientsListFullComponent)
    .component('searchComponent', SearchComponent)
    .component('searchAdvancedComponent', SearchAdvancedComponent)
    .component('reportChartComponent', ReportChartComponent)
    
    .config(routeConfig)
    .config(['paginationTemplateProvider',
      function (paginationTemplateProvider) {
        paginationTemplateProvider.setString(require('./pulsetileui/pagination/dirPagination.tpl.html'));
      }
    ])
    .config(['$ngReduxProvider', $ngReduxProvider => {
      const middleware = ['httpMiddleware'];

      if (process.env.NODE_ENV === 'development') {
        middleware.push(createLogger({
          level: 'info',
          collapsed: true
        }));
      }

      $ngReduxProvider.createStoreWith(reducer, middleware);
    }])
    .config(['cfpLoadingBarProvider', cfpLoadingBarProvider => {
      cfpLoadingBarProvider.includeSpinner = false;
    }])
    .config(['ScrollBarsProvider',
      function (ScrollBarsProvider) {
        // the following settings are defined for all scrollbars unless the
        // scrollbar has local scope configuration
        ScrollBarsProvider.defaults = {
          scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed
            enable: false // enable scrolling buttons by default
          },
          scrollInertia: 0, // adjust however you want
          axis: 'y',
          theme: 'dark-custom',
          autoHideScrollbar: false,
          mouseWheel:{ preventDefault: false }
        };
      }
    ])
    .config(['uiSelectConfig',
      function(uiSelectConfig) {
        uiSelectConfig.theme = 'bootstrap';
        uiSelectConfig.resetSearchInput = false;
        uiSelectConfig.appendToBody = true;
        uiSelectConfig.searchEnabled = false;
      }
    ]);
    app.run(['editableOptions', 'editableThemes',
      function(editableOptions, editableThemes) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
      }
    ]);

// console.log('app start');
