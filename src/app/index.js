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
import 'jquery';

import 'morrisjs';
import 'chart.js';

import 'angular-spinner';
import 'jquery-timepicker-jt';
import 'angular-jquery-timepicker';

//commons
import reducer from './redux/reducer';
import actions from './actions';
import httpMiddleware from './helpers/httpMiddleware';
import Patient from './helpers/patient';

//components 
import ProfileComponent from './rippleui/pages/profile/profile.component';
import HeaderComponent from './rippleui/header-bar/header.component.js';
import PatientsChartsComponent from './rippleui/pages/patients-charts/patients-charts.component';
import PatientsSummaryComponent from './rippleui/pages/patient-summary/patients-summary.component';
import PatientsListFullComponent from './rippleui/pages/patients-list-full/patients-list-full.component';
import PatientsSidebarComponent from './rippleui/pages/patients-detail/patients-sidebar.component';
import PatientsBannerComponent from './rippleui/pages/patients-detail/patients-banner.component';
import SearchComponent from './rippleui/search/search.component';
import ReportChartComponent from './rippleui/search/report-chart.component';
import MainComponent from './rippleui/main-component/main.component';
import HomeSidebarComponent from './rippleui/pages/patients-lookup/home-sidebar.component';
import ServiceRequests from './services/serviceRequests.js';
import ServiceStateMenager from './services/serviceStateMenager.js';

import routeConfig from 'app/index.route';
import 'app/scss/core.scss';

import 'app/directives/index.js';
import 'app/filters/index.js';
import 'app/rippleui/pages/personal-notes/index.js';
import 'app/rippleui/pages/allergies/index.js';
import 'app/rippleui/pages/appointments/index.js';
import 'app/rippleui/pages/care-plans/index.js';
import 'app/rippleui/pages/clinical-notes/index.js';
import 'app/rippleui/pages/contacts/index.js';
import 'app/rippleui/pages/diagnoses/index.js';
import 'app/rippleui/pages/dicom/index.js';
import 'app/rippleui/pages/documents/index.js';
import 'app/rippleui/pages/generic-mdt/index.js';
import 'app/rippleui/pages/height-and-weight/index.js';
import 'app/rippleui/pages/medications/index.js';
import 'app/rippleui/pages/orders/index.js';
import 'app/rippleui/pages/patients-list/index.js';
import 'app/rippleui/pages/procedures/index.js';
import 'app/rippleui/pages/referrals/index.js';
import 'app/rippleui/pages/results/index.js';
import 'app/rippleui/pages/transfer-of-care/index.js';
import 'app/rippleui/pages/vaccinations/index.js';
import 'app/rippleui/pages/vitals/index.js';

const app = angular
    .module('ripple-ui', [
        uiRouter,
        ngAnimate,
        uiBootstrap,
        ngRedux,
        actions,
        dirPagination,
        'ripple-ui.personal',
        'ripple-ui.allergies',
        'ripple-ui.appointments',
        'ripple-ui.care-plans',
        'ripple-ui.clinicalnotes',
        'ripple-ui.contacts',
        'ripple-ui.diagnoses',
        'ripple-ui.dicom',
        'ripple-ui.documents',
        'ripple-ui.generic-mdt',
        'ripple-ui.height-and-weight',
        'ripple-ui.medications',
        'ripple-ui.orders',
        'ripple-ui.patients',
        'ripple-ui.procedures',
        'ripple-ui.referrals',
        'ripple-ui.results',
        'ripple-ui.transfer-of-care',
        'ripple-ui.vaccinations',
        'ripple-ui.vitals',
        'ripple-ui.directives',
        'ripple-ui.filters',
        'angularSpinner',
        'ui.calendar',
        'ui.timepicker',
        'angular-loading-bar'
    ])
    .factory('httpMiddleware', httpMiddleware)
    .factory('Patient', Patient)

    .service('serviceRequests', ServiceRequests)
    .service('serviceStateMenager', ServiceStateMenager)

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
    }]);    
console.log('app start');
