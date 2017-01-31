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
// import 'bootstrap';
import ngRedux from 'ng-redux';
import dirPagination from 'angular-utils-pagination';
import createLogger from 'redux-logger';
import 'angular-loading-bar';
import 'fullcalendar';
import 'angular-ui-calendar';
import 'jquery';

import 'morrisjs';
// import * as cornerstone from './cornerstone/cornerstone';
// let cornerstone = require('./cornerstone/cornerstone.js');
import cornerstoneJS from './cornerstone/cornerstone';
import cornerstoneMathJS from './cornerstone/cornerstoneMath';
import cornerstoneToolsJS from './cornerstone/cornerstoneTools';
// import imageLoaderJs from './cornerstone/exampleImageIdLoader';

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
import PatientsComponent from './rippleui/pages/patients-list/patients.component';
import PatientsSummaryComponent from './rippleui/pages/patient-summary/patients-summary.component';
import PatientsListFullComponent from './rippleui/pages/patients-list-full/patients-list-full.component';
import PatientsSidebarComponent from './rippleui/pages/patients-detail/patients-sidebar.component';
import PatientsBannerComponent from './rippleui/pages/patients-detail/patients-banner.component';
import SearchComponent from './rippleui/search/search.component';
import ReportChartComponent from './rippleui/search/report-chart.component';

import DiagnosesListComponent from './rippleui/pages/diagnoses/diagnoses-list.component';
import DiagnosesCreateComponent from './rippleui/pages/diagnoses/diagnoses-create.component';
import DiagnosesDetailComponent from './rippleui/pages/diagnoses/diagnoses-detail.component';

import AllergiesListComponent from './rippleui/pages/allergies/allergies-list.component';
import AllergiesCreateComponent from './rippleui/pages/allergies/allergies-create.component';
import AllergiesDetailComponent from './rippleui/pages/allergies/allergies-detail.component';

import MedicationsListComponent from './rippleui/pages/medications/medications-list.component';
import MedicationsCreateComponent from './rippleui/pages/medications/medications-create.component';
import MedicationsDetailComponent from './rippleui/pages/medications/medications-detail.component';

import ContactsListComponent from './rippleui/pages/contacts/contacts-list.component';
import ContactsCreateComponent from './rippleui/pages/contacts/contacts-create.component';
import ContactsDetailComponent from './rippleui/pages/contacts/contacts-detail.component';

import VaccinationsListComponent from './rippleui/pages/vaccinations/vaccinations-list.component';
import VaccinationsCreateComponent from './rippleui/pages/vaccinations/vaccinations-create.component';
import VaccinationsDetailComponent from './rippleui/pages/vaccinations/vaccinations-detail.component';

import OrdersListComponent from './rippleui/pages/orders/orders-list.component';
import OrdersDetailComponent from './rippleui/pages/orders/orders-detail.component';

import ReferralsListComponent from './rippleui/pages/referrals/referrals-list.component';
import ReferralsDetailComponent from './rippleui/pages/referrals/referrals-detail.component';
import ReferralsCreateComponent from './rippleui/pages/referrals/referrals-create.component';

import ProceduresListComponent from './rippleui/pages/procedures/procedures-list.component';
import ProceduresDetailComponent from './rippleui/pages/procedures/procedures-detail.component';
import ProceduresCreateComponent from './rippleui/pages/procedures/procedures-create.component';

import ResultsListComponent from './rippleui/pages/results/results-list.component';
import ResultsDetailComponent from './rippleui/pages/results/results-detail.component';
import DocumentsListComponent from './rippleui/pages/documents/documents-list.component';
import DocumentsDetailComponent from './rippleui/pages/documents/documents-detail.component';
import AppointmentsListComponent from './rippleui/pages/appointments/appointments-list.component';
import AppointmentsDetailComponent from './rippleui/pages/appointments/appointments-detail.component';
import ImageListComponent from './rippleui/pages/dicom/image-list.component';
import ImageDetailComponent from './rippleui/pages/dicom/image-detail.component';
import EolcareplansListComponent from './rippleui/pages/care-plans/eolcareplans-list.component';
import EolcareplansDetailComponent from './rippleui/pages/care-plans/eolcareplans-detail.component';
import MainComponent from './helpers/main.component';
import HomeSidebarComponent from './rippleui/pages/patients-lookup/home-sidebar.component';

import ClinicalnotesListComponent from './rippleui/pages/clinical-notes/clinicalnotes-list.component';
import ClinicalnotesCreateComponent from './rippleui/pages/clinical-notes/clinicalnotes-create.component';
import ClinicalnotesDetailComponent from './rippleui/pages/clinical-notes/clinicalnotes-detail.component';

import HeightAndWeightListComponent from './rippleui/pages/height-and-weight/heightAndWeight-list.component';
import HeightAndWeightDetailComponent from './rippleui/pages/height-and-weight/heightAndWeight-detail.component';

import GenericMdtListComponent from './rippleui/pages/generic-mdt/generic-mdt-list.component';
import GenericMdtDetailComponent from './rippleui/pages/generic-mdt/generic-mdt-detail.component';
import GenericMdtCreateComponent from './rippleui/pages/generic-mdt/generic-mdt-create.component';

import TransferOfCareListComponent from './rippleui/pages/transfer-of-care/transfer-of-care-list.component';
import TransferOfCareDetailComponent from './rippleui/pages/transfer-of-care/transfer-of-care-detail.component';

import ServiceRequests from './services/serviceRequests.js';

import routeConfig from 'app/index.route';
import 'app/scss/core.scss';

const app = angular
    .module('ripple-ui', [
        uiRouter,
        ngAnimate,
        uiBootstrap,
        ngRedux,
        actions,
        dirPagination,
        'angularSpinner',
        'ui.calendar',
        'ui.timepicker',
        'angular-loading-bar'
    ])
    .factory('cornerstoneJS', cornerstoneJS)
    .factory('cornerstoneMathJS', cornerstoneMathJS)
    .factory('cornerstoneToolsJS', cornerstoneToolsJS)
    .factory('httpMiddleware', httpMiddleware)
    .factory('Patient', Patient)
    .service('serviceRequests', ServiceRequests)
    .component('profileComponent', ProfileComponent)
    .component('patientsComponent', PatientsComponent)
    .component('headerComponent', HeaderComponent)
    .component('patientsChartsComponent', PatientsChartsComponent)
    .component('patientsSummaryComponent', PatientsSummaryComponent)
    .component('patientsSidebarComponent', PatientsSidebarComponent)
    .component('patientsBannerComponent', PatientsBannerComponent)

    .component('diagnosesListComponent', DiagnosesListComponent)
    .component('diagnosesCreateComponent', DiagnosesCreateComponent)
    .component('diagnosesDetailComponent', DiagnosesDetailComponent)

    .component('allergiesListComponent', AllergiesListComponent)
    .component('allergiesCreateComponent', AllergiesCreateComponent)
    .component('allergiesDetailComponent', AllergiesDetailComponent)

    .component('medicationsListComponent', MedicationsListComponent)
    .component('medicationsCreateComponent', MedicationsCreateComponent)
    .component('medicationsDetailComponent', MedicationsDetailComponent)

    .component('contactsListComponent', ContactsListComponent)
    .component('contactsCreateComponent', ContactsCreateComponent)
    .component('contactsDetailComponent', ContactsDetailComponent)
    
    .component('vaccinationsListComponent', VaccinationsListComponent)
    .component('vaccinationsCreateComponent', VaccinationsCreateComponent)
    .component('vaccinationsDetailComponent', VaccinationsDetailComponent)

    .component('ordersListComponent', OrdersListComponent)
    .component('ordersDetailComponent', OrdersDetailComponent)

    .component('referralsListComponent', ReferralsListComponent)
    .component('referralsDetailComponent', ReferralsDetailComponent)
    .component('referralsCreateComponent', ReferralsCreateComponent)


    .component('proceduresListComponent', ProceduresListComponent)
    .component('proceduresDetailComponent', ProceduresDetailComponent)
    .component('proceduresCreateComponent', ProceduresCreateComponent)

    .component('patientsListFullComponent', PatientsListFullComponent)
    .component('resultsListComponent', ResultsListComponent)
    .component('resultsDetailComponent', ResultsDetailComponent)
    .component('documentsListComponent', DocumentsListComponent)
    .component('documentsDetailComponent', DocumentsDetailComponent)
    .component('appointmentsListComponent', AppointmentsListComponent)
    .component('appointmentsDetailComponent', AppointmentsDetailComponent)
    .component('imageListComponent', ImageListComponent)
    .component('imageDetailComponent', ImageDetailComponent)
    .component('eolcareplansListComponent', EolcareplansListComponent)
    .component('eolcareplansDetailComponent', EolcareplansDetailComponent)
    .component('mainComponent', MainComponent)
    .component('homeSidebarComponent', HomeSidebarComponent)
    .component('searchComponent', SearchComponent)
    .component('reportChartComponent', ReportChartComponent)

    .component('clinicalnotesListComponent', ClinicalnotesListComponent)
    .component('clinicalnotesCreateComponent', ClinicalnotesCreateComponent)
    .component('clinicalnotesDetailComponent', ClinicalnotesDetailComponent)

    .component('heightAndWeightListComponent', HeightAndWeightListComponent)
    .component('heightAndWeightDetailComponent', HeightAndWeightDetailComponent)
    
    .component('genericMdtListComponent', GenericMdtListComponent)
    .component('genericMdtDetailComponent', GenericMdtDetailComponent)
    .component('genericMdtCreateComponent', GenericMdtCreateComponent)
    
    .component('transferOfCareListComponent', TransferOfCareListComponent)
    .component('transferOfCareDetailComponent', TransferOfCareDetailComponent)
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
    .directive('focusElement', function($timeout) {
      return {
        link: function(scope, element, attrs) {
          scope.$watch(attrs.focusElement, function(value) {
            $timeout(function() {
              if(value === true) {
                jQuery(element).focus();
              }
            });
          });
        }
      }
    })
    .directive('mcAccordion', function() {
      return {
        link: function(scope, element, attrs) {
            scope.panelOpen = '';

            scope.openPanel = function (namePanel) {
                if (scope.panelOpen === namePanel) {
                    scope.panelOpen = '';
                } else {
                    scope.panelOpen = namePanel;
                }
            };
            scope.getOpenPanelClass = function (namePanel, openClass) {
                openClass = openClass ? openClass : 'open';
                return scope.panelOpen === namePanel ? openClass : '';
            };
            scope.$watch(attrs.mcOpenPanel, function() {
                scope.panelOpen = attrs.mcOpenPanel;
            });
        }
      }
    })
    .directive('mcFullPanel', function() {
        return {
            controller: ['$scope', 'serviceRequests', function($scope, serviceRequests) {
                $scope.showPanel = '';
                $scope.panelOpen = '';
                $scope.getShowPanel = function (panelName) {
                    if ($scope.showPanel === '') return true;

                    return $scope.showPanel === panelName ? true : false;
                }
                $scope.changeFullPanel = function (fullPanelName, panelName) {
                    if (panelName) {
                        $scope.showPanel = $scope.showPanel === panelName ? '' : panelName;
                        $scope.panelOpen = panelName;
                    }
                    serviceRequests.publisher('changeFullPanel', {panelName: fullPanelName});
                };
            }]
        };
    })
    .directive('mcDropwrap', function() {
        return {
            link: function(scope, element, attrs) {
                scope.closeDropdown = function (ev) {
                    var currentDropdown = angular.element(ev.target.closest('.dropdown'));
                    var isOpenDropdown = currentDropdown.hasClass('open');
                    
                    angular.element('.dropdown').removeClass('open');

                    if (isOpenDropdown) {
                        currentDropdown.addClass('open');
                    }
                };
            }
        }
    })
    .directive('mcDropdown', function() {
        return {
            link: function(scope, element, attrs) {
                scope.toggleDropdown = function (ev) {
                    ev.currentTarget.parentElement.classList.toggle('open');
                };
            }
        }
    })
    .directive('diCom', function () {
        return {
            // restrict: 'E',
            template: require('./rippleui/pages/dicom/image-modal.html'),
            controller: ['$scope', '$ngRedux', 'serviceRequests', function($scope, $ngRedux, serviceRequests) {
               
                var cornerstone = cornerstoneJS();
                var element = $('#dicomImage').get(0);

                $scope.modal = {title: 'View Image'};

                $scope.zoomIn = function (ev) {
                    var viewport = cornerstone.getViewport(element);
                    viewport.scale += 0.25;
                    cornerstone.setViewport(element, viewport);
                };
                $scope.zoomOut = function (ev) {
                    var viewport = cornerstone.getViewport(element);
                    viewport.scale -= 0.25;
                    cornerstone.setViewport(element, viewport);
                };
                $scope.reset = function (ev) {
                    cornerstone.reset(element);
                };
                $scope.close = function (ev) {
                    serviceRequests.publisher('closeModal', {className: 'closeModal'});
                };

                this.setCurrentPageData = function (data) {
                    if (data.patientsGet.data) {
                        $scope.patient = data.patientsGet.data;
                    }
                };
                
                let unsubscribe = $ngRedux.connect(state => ({
                    getStoreData: this.setCurrentPageData(state)
                }))(this);

                $scope.$on('$destroy', unsubscribe);
            }]
        }
    })
    .directive('cornerstoneImage', function () {

        return{
            restrict: 'E',
            template: '<div id="dicomImage" oncontextmenu="return false" unselectable="on" onselectstart="return false;" onmousedown="return false;" style="width: 512px; height: 512px;"></div>',
            scope: {
                imageId: '@imageid'
            },
            link: function(scope, element, attributes) {
                var cornerstone = cornerstoneJS();
                var cornerstoneTools = cornerstoneToolsJS();
                var cornerstoneMath = cornerstoneMathJS();
                var imgLoader = require('./cornerstone/exampleImageIdLoader.js');
                
                console.log('cornerstoneJS', imgLoader);
                
                var imageId = scope.imageId;
                var cornerstoneContainer = element[0];
                var cornerstoneElement = cornerstoneContainer.querySelector("#dicomImage");
                cornerstone.enable(cornerstoneElement);
                cornerstone.loadImage(imageId).then(function (image) {
                    cornerstone.displayImage(cornerstoneElement, image);
                    cornerstoneTools.mouseInput.enable(cornerstoneElement);
                    cornerstoneTools.mouseWheelInput.enable(cornerstoneElement);

                    // Enable all tools we want to use with this element
                    cornerstoneTools.wwwc.activate(cornerstoneElement, 1); // ww/wc is the default tool for left mouse button
                    cornerstoneTools.pan.activate(cornerstoneElement, 2); // pan is the default tool for middle mouse button
                    cornerstoneTools.zoom.activate(cornerstoneElement, 4); // zoom is the default tool for right mouse button
                    cornerstoneTools.zoomWheel.activate(cornerstoneElement); // zoom is the default tool for middle mouse wheel
                });
            }
        };

    })
    .filter('formatNHSNumber', function() {
        return function(number) {
            if (number === undefined) {
                return;
            }

            return number.slice(0,3) + " " + number.slice(3,6) + " " + number.slice(6);
        };
    })
    .filter('formatMoment', function() {
        return function(date) {
            var m = moment(date);
            return m.format('h:mma');
        };
    });
console.log('app start');