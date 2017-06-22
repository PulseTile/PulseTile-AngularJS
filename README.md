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

PulseTile uses Webpack to build and launch the development environment. After you have installed all dependencies, you may run the app. Running `npm start` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.

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

PulseTile uses Webpack together for its build system.

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

Additional information on such topics as data structure we're using is available on (Documentation portal)[http://docs.pulsetile.com/]
