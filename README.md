# PulseTile

[![travis build](https://img.shields.io/travis/PulseTile/PulseTile.svg?style=flat-square)](https://travis-ci.org/PulseTile/PulseTile)
[![Codecov](https://img.shields.io/codecov/c/github/PulseTile/PulseTile/develop.svg?style=flat-square)](https://codecov.io/gh/PulseTile/PulseTile)
[![GitHub release](https://img.shields.io/github/release/PulseTile/PulseTile.svg?style=flat-square)](https://github.com/PulseTile/PulseTile/releases)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

PulseTile is a clinically led UX UI framework for healthcare.

See [PulseTile Documentation here](http://docs.pulsetile.com/)

This repo includes the Core UI Framework and "Core Tiles"

See this repo for other [PulseTile "Plugin Tiles"](https://github.com/PulseTile-Plugins)

---

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
`bower i https://github.com/PulseTile-Plugins/Silver-Plugins.git`
*We are downloading the module from external repository to root application directory*

2. To copy files from node_modules/bower_components use: webpack.config.js --> CopyWebpackPlugin, change path in it's options { from: '', to: '' }
*Here we are copying module files from source folder to destination folder*

3. `npm run copy`
*Running the copy command itself*

##### Now we should edit the source files:
* In the src/app/plugins.js we include all modules
```
import clinicalnotes from './rippleui/pages/clinical-notes/index';
export default [
  clinicalnotes
  ]
```

* Add actions types from module/ActionTypes.js to src/app/constants/ActionTypes.js
*The constants file contains global constants to use within an application, in general the addition to already existing 'core' constant file looks like this:*
```
export const CLINICALNOTES = 'CLINICALNOTES';
export const CLINICALNOTES_SUCCESS = 'CLINICALNOTES_SUCCESS';
export const CLINICALNOTES_ERROR = 'CLINICALNOTES_ERROR';

export const CLINICALNOTES_GET = 'CLINICALNOTES_GET';
export const CLINICALNOTES_GET_SUCCESS = 'CLINICALNOTES_GET_SUCCESS';
export const CLINICALNOTES_GET_ERROR = 'CLINICALNOTES_GET_ERROR';

export const CLINICALNOTES_CREATE = 'CLINICALNOTES_CREATE';
export const CLINICALNOTES_CREATE_SUCCESS = 'CLINICALNOTES_CREATE_SUCCESS';
export const CLINICALNOTES_CREATE_ERROR = 'CLINICALNOTES_CREATE_ERROR';

export const CLINICALNOTES_UPDATE = 'CLINICALNOTES_UPDATE';
export const CLINICALNOTES_UPDATE_SUCCESS = 'CLINICALNOTES_UPDATE_SUCCESS';
export const CLINICALNOTES_UPDATE_ERROR = 'CLINICALNOTES_UPDATE_ERROR';
```

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

7. ActionTypes.js
*This file contains actions constants for redux architecture*

8. index.route.js
*File with routes for core application*

9. index.js
*This file contains inclusion for all module files*
