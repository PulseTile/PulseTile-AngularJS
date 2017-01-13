# Ripple OSI
Ripple is a clinically led team working with you to build an integrated digital care record platform for today and the future. Open source, open standards and underpinned by an open architecture that can be used worldwide.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To develop and run the application locally you must have the following installed:

```
 - NodeJS
 - A running version of The Ripple Middleware listening on port 19191
```
### Installing

The first step to setup the application locally should be the following: 
```
npm install
bower install
```


## Building & Deployment

Org-Ripple-UI uses Webpack to build and launch the development environment. After you have installed all dependencies, you may run the app. Running `npm start` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.

Just simply run `npm start` - this will also watch changes.

#### NPM Scripts
Here's a list of available scripts:
* `npm run build`
  * runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/bundle.js`. It also prepares `index.html` to be used as application entry point, links assets and created dist version of our application.
* `npm start`
  * starts a dev server via `webpack-dev-server`, serving the client folder with watching source file change.
* `npm run lint`
  * lint codebase using [Eslint](http://eslint.org/)
* `npm run copy`
  * ignore this in case you don't need the additional plugins installation (see below for further instructions) 

## Built With

Org-Ripple-UI uses Webpack together for its build system.

`Webpack` handles all file-related concerns:
* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* Doing all of the above for `*.spec.js` files as well

`Angular 1.5` use for modular structure.
#### General Plugin overview
Plugins are extentions to currenly built 'core' (with general modules, that can not be removed) application. They expand the functionality of the application, add necessary features and are used to expand the application for users to fit their needs.   


#### Installation of the new Plugins to the application:  
1. Run the following command within your command line: npm/bower install moduleName (Module name here stands for github url for external plugin)
`bower i https://github.com/RippleOSI/Org-Ripple-UI-Plugins.git`
*We are downloading the module from external repository to root application directory*

2. To copy files from node_modules/bower_components use: webpack.config.js --> CopyWebpackPlugin, change path in it's options { from: '', to: '' }
*Here we are copying module files from source folder to destination folder*

3. `npm run copy`
*Running the copy command itself*

##### Now we should edit the source files:
* Add module-actions.js to src/app/actions/index.js
*here we are adding the module's actions, which are added to use them within redux architecture. The action import should look like this:*
```
import clinicalnotesActions from '../rippleui/pages/clinical-notes/clinicalnotes-actions';
```

* Add module-reducer-name.js to src/app/redux/reducer.js
*reducer.js is redux-related file, where we add the module to redux architecture. In general, the module addition within the named file looks like this:*
```
import clinicalnotes from '../rippleui/pages/clinical-notes/clinicalnotes-reducer-all';
```

* Add actions types from module/ActionTypes.js to src/app/constants/ActionTypes.js
*The constants file contains global constants to use within an application, in general the addition to already existing 'core' constant file looks like this:*
```
export const ALLERGIES = 'ALLERGIES';
export const ALLERGIES_SUCCESS = 'ALLERGIES_SUCCESS';
export const ALLERGIES_ERROR = 'ALLERGIES_ERROR';

export const ALLERGIES_GET = 'ALLERGIES_GET';
export const ALLERGIES_GET_SUCCESS = 'ALLERGIES_GET_SUCCESS';
export const ALLERGIES_GET_ERROR = 'ALLERGIES_GET_ERROR';

export const ALLERGIES_CREATE = 'ALLERGIES_CREATE';
export const ALLERGIES_CREATE_SUCCESS = 'ALLERGIES_CREATE_SUCCESS';
export const ALLERGIES_CREATE_ERROR = 'ALLERGIES_CREATE_ERROR';

export const ALLERGIES_UPDATE = 'ALLERGIES_UPDATE';
export const ALLERGIES_UPDATE_SUCCESS = 'ALLERGIES_UPDATE_SUCCESS';
export const ALLERGIES_UPDATE_ERROR = 'ALLERGIES_UPDATE_ERROR';
```

* Add components to src/app/index.js and src/app/index.route.js
   * You should register the component with Angular. To add functionality also the index.js and index.route.js files should be updated also. Within the index.js the component addition in general looks like this:
   ```
  import ClinicalnotesListComponent from './rippleui/pages/clinical-notes/clinicalnotes-list.component';

  const app = angular.module('app', []).component('clinicalnotesListComponent', ClinicalnotesListComponent)
   ```
     where ClinicalnotesListComponent is basically the AngularJS view name, and /rippleosi/pages/clinical-notes/ is the path to necessary for plugin files (listing and functionality of files for an example module are listed below);
   * index.route.js is used for routing, so the application will know where to look for plugin's pages. For example, this is general view of a single plugin's code for route file:
   ```
    .state('clinicalNotes', {
        url: '/patients/{patientId:int}/clinicalNotes?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<clinicalnotes-list-component></clinicalnotes-list-component>'}
        }
    })
   ```
   where:
     * url: basically what user sees in his URL bar when he clicks on related module;
     * views: list of components that will be displayed on the page after clicking on the module itself;*

#### Explanations about module functionality files, that should be developed:
1. example-actions.js
*This file contains actions functions for redux architecture*

2. example-reducer-name.js
*It contains reducer functions for redux architecture*

3. example-list.component.js
*It's list.component functionality file (angular 1.5 component)*

4. example-list.html
*HTML template file for list.component*

5. example-detail.component.js
*It's detail.component functionality file (angular 1.5 component)*

6. example-detail.html
*HTML Template file for detail.component*

7. example-modal.js
*It's modal functionality file (should be added to plugin if the modal window is necessary)*

8. example-modal.html
*HTML Template file for modal window (should be added to plugin if the modal window is necessary)*

9. ActionTypes.js
*This file contains actions constants for redux architecture*

10. index.route.js
*File with routes for core application*
