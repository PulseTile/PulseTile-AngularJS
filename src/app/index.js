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
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar'
import 'angular-spinner';
import 'jquery-timepicker-jt';
import 'angular-jquery-timepicker';
import 'angular-xeditable';
import 'ng-scrollbars';

//commons
import reducer from './redux/reducer';
import actions from './actions';
import httpMiddleware from './helpers/httpMiddleware';
import Patient from './helpers/patient';
import deviceDetector from './helpers/deviceDetector';
import './helpers/polyfills';

//components 
import ProfileComponent from './rippleui/pages/profile/profile.component';
import HeaderComponent from './rippleui/header-bar/header.component.js';
import PatientsChartsComponent from './rippleui/pages/patients-charts/patients-charts.component';
import PatientsSummaryComponent from './rippleui/pages/patient-summary/patients-summary.component';
import PatientsListFullComponent from './rippleui/pages/patients-list-full/patients-list-full.component';
import PatientsSidebarComponent from './rippleui/pages/patients-detail/patients-sidebar.component';
import PatientsBannerComponent from './rippleui/pages/patients-detail/patients-banner.component';
import SearchComponent from './rippleui/search/search.component';
import SearchAdvancedComponent from './rippleui/search/search-advanced.component';
import ReportChartComponent from './rippleui/search/report-chart.component';
import MainComponent from './rippleui/main-component/main.component';
import HomeSidebarComponent from './rippleui/pages/patients-lookup/home-sidebar.component';
import ServiceRequests from './services/serviceRequests.js';
import ServiceStateManager from './services/serviceStateManager.js';
import ServiceVitalsSigns from './rippleui/pages/vitals/serviceVitalsSigns.js';
import ServiceActions from './rippleui/pages/dicom/serviceActions.js';
import ServiceFormatted from './services/serviceFormatted.js';
import SocketService from './services/socketService.js';
import TemplateService from './services/templateService.js';

import ScheduleModal from './rippleui/pages/events/schedule-modal';
import ConfirmationModal from './rippleui/confirmation/confirmation';

import routeConfig from 'app/index.route';
import 'app/scss/core.scss';

import 'app/directives/index.js';
import 'app/filters/index.js';
import 'app/rippleui/pages/patients-list/index.js';

import plugins from './plugins';

let app = angular
    .module('ripple-ui', [
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
        'angular-loading-bar',
        'xeditable',
        'ngScrollbars',
        'rzModule',
        'ngSanitize'
    ])
    .factory('ScheduleModal', ScheduleModal)
    .factory('ConfirmationModal', ConfirmationModal)
    
    .factory('httpMiddleware', httpMiddleware)
    .factory('Patient', Patient)
    .factory('deviceDetector', deviceDetector)

    .service('templateService', TemplateService)
    .service('serviceFormatted', ServiceFormatted)
    .service('serviceRequests', ServiceRequests)
    .service('serviceStateManager', ServiceStateManager)
    .service('serviceVitalsSigns', ServiceVitalsSigns)
    .service('serviceActions', ServiceActions)
    .service('socketService', SocketService);

  plugins.forEach((plugin)=>{
    Object.keys(plugin.components).forEach((name)=>{
      app = app.component(name, plugin.components[name]);
    })
  });

  app  
    .component('profileComponent', ProfileComponent)
    .component('headerComponent', HeaderComponent)
    .component('patientsChartsComponent', PatientsChartsComponent)
    .component('patientsSummaryComponent', PatientsSummaryComponent)
    .component('patientsSidebarComponent', PatientsSidebarComponent)
    .component('patientsBannerComponent', PatientsBannerComponent)   
    .component('patientsListFullComponent', PatientsListFullComponent)    
    .component('mainComponent', MainComponent)
    .component('homeSidebarComponent', HomeSidebarComponent)
    .component('searchComponent', SearchComponent)
    .component('searchAdvancedComponent', SearchAdvancedComponent)
    .component('reportChartComponent', ReportChartComponent)
    
    .config(routeConfig)
    .config(function (paginationTemplateProvider) {
        paginationTemplateProvider.setString(require('./rippleui/pagination/dirPagination.tpl.html'));
    })
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
    .config(function (ScrollBarsProvider) {
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
    });
    app.run(function(editableOptions, editableThemes) {
      editableOptions.theme = 'bs3'; // bootstrap3 theme
      editableThemes.bs3.inputClass = 'input-sm';
      editableThemes.bs3.buttonsClass = 'btn-sm';
    });
    app.controller('mainCtrl', function ($scope, $timeout) {
        // $timeout(function() {
        //     $scope.updateScrollbar('scrollTo', 100, {
        //     scrollInertia: 0
        //   });
        // });
        // $scope.myScrollTo = function () {
        //   $scope.updateScrollbar('scrollTo', 1000, {
        //     scrollInertia: 0
        //   });
        // };
    });
console.log('app start');
