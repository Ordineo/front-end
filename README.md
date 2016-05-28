[![Build Status](https://travis-ci.org/Ordineo/front-end.svg?branch=master)](https://travis-ci.org/Ordineo/front-end)

# Front-end
Front end project for the Jworks 360 tool.

The application is hosted at [https://frontend-ordineo.cfapps.io](http://frontend-ordineo.cfapps.io/).

## Table of contents
* [Getting Started](#getting-started)
    * [Install](#install)
    * [Build](#build)
    * [Tests](#tests)
* [File Structure](#file-structure)
* [Notes](#notes)

## Getting started
### Install

Install global cli tools
```
npm i -g webpack typings protractor codeceptjs
```
  
Install npm modules
```
npm i
```

Launch webpack-dev-server. 
Dev app is served at http://localhost:8080
```
npm start
```

Start coding

### Build

```
npm run build
```

### Tests

First update and start webdriver
```
npm run webdriver:update
npm run webdriver:start
```

Run all tests
```
npm test
```

Run unit tests
```
npm run test:karma
```

Run end-to-end tests
```
npm run test:e2e
```

Autowatch tests
```
npm run watch:test
```

- Test filenames are required to end with .spec.ts
- tests should be located inside src/ or subfolders

#### Code coverage

Run tests to generate reports

Reports are located inside reports/ folder


### Structure
```
/
 ├──src/                       * app source files
 |   ├──bootstrap.ts           * we use instatiate AngularJS manually.
 |   ├──index.html             * webpack is configured to use this file as a template, here we declare our root component <app>
 │   │
 │   ├──app/                   * main app source folder
 │   │    ├──app.module.ts     * main module, this will get bootstrapped on start-up
 │   │    │
 │   │    ├──auth/             * Contains everything related to authorization
 │   │    │                      Here you will also find the login page (LoginComponent.ts)  
 │   │    │
 │   │    ├──core/             * Core module, contains reusable components and core services
 │   │    │                      such as Navigator.ts wich is responsible for app routing.
 │   │    │
 │   │    ├──gateway/             * Core module, contains reusable components and core services
 │   │
 |   ├──polyfills.ts           * our polyfills file
 │   │
 |   ├──vendor.ts              * our vendor file
 │   │
 │   ├──app/                   * WebApp: folder
 │   │   ├──app.spec.ts        * a simple test of components in app.ts
 │   │   ├──app.e2e.ts         * a simple end-to-end test for /
 │   │   └──app.ts             * App.ts: a simple version of our App component components
 │   │
 │   └──assets/                * static assets are served here
 │       ├──icon/              * our list of icons from www.favicon-generator.org
 │       ├──service-worker.js  * ignore this. Web App service worker that's not complete yet
 │       ├──robots.txt         * for search engines to crawl your website
 │       └──human.txt          * for humans to know who the developers are
 │
 │
 ├──tslint.json                * typescript lint config
 ├──typedoc.json               * typescript documentation generator
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──typings.json               * our typings manager
 └──package.json               * what npm uses to manage it's dependencies
```

### Notes

<p>When solving the issues, try making front-end templates to increase the functionality. </p>
<p>Be sure to checkout the <a href="https://angularjs.org/">AngularJS website</a> for api and tuts. </p>
<p>Good resource aswell: <a href="https://github.com/johnpapa/angular-styleguide"> AngularJS styleguide</a></p>
<p>Technologies used: Typescript 1.8, Angular 1.5, Angular Material, Webpack, Karma, Jasmine, HTML5, CSS/Sass, </p>
