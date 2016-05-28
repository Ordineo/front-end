[![Build Status](https://travis-ci.org/Ordineo/front-end.svg?branch=master)](https://travis-ci.org/Ordineo/front-end)

# Jworks 360 tool front-end
View the deployed app at: [https://frontend-ordineo.cfapps.io](http://frontend-ordineo.cfapps.io/)

To future proof our application we took a lot design decisions to make migration towards Angular 2 easier.
We use AngularJS 1.5, the official angular component router and TypeScript. 
With AngularJS 1.5 we can structure our application primarily with components and services.

[Read our more in depth article on component based application architecture in AngularJS](https://ordina-jworks.github.io/angularjs-typescript/2016/04/25/component-based-application-architecture-with-angularjs-and-typescript.html)

Build your UI elements with [components](https://docs.angularjs.org/guide/component). Try to make your component controllers as lean as possible. 
This will make unit testing easier(less mocking). 
The primary responsibility of a component controller is defining the view model.
 
So where do I define business logic?

Use [services](https://docs.angularjs.org/guide/services).

We use services primarily to manage application state and supplying data to controllers or other services.


## Table of contents
* [Getting Started](#getting-started)
    * [Install](#install)
    * [Build](#build)
    * [Tests](#tests)
* [Folder Structure](#Folder-structure)
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
 |   ├──bootstrap.ts           * we instantiate AngularJS manually.
 |   ├──index.html             * webpack is configured to use this file as a template, here we declare our root component <app>
 │   │
 │   ├──app/                   * main app source folder
 │   │    ├──app.module.ts     * main module, this will get bootstrapped on start-up
 │   │    │
 │   │    ├──auth/             * Contains everything related to authorization
 │   │    │                      Here you will also find the login page (LoginComponent.ts)  
 │   │    ├──core/             * Core module, contains reusable components and core services
 │   │    │                      such as Navigator.ts wich is responsible for app routing.
 │   │    ├──gateway/          * Rest Api endpoints
 │   │    ├──layout/           * Layout components to compose our dashboard page
 │   │    ├──profile/          * Everything related to the profile page
 │   │    ├──social/           * Everything related to social rest apis
 │   │    ├──theme/            * Material design module and custom shared styles
 │   │    ├──traverson/        * http library for traverson a HATEOS REST Api
 │   │    └──util/             * Helper classes/methods
 │   │
 │   └──assets/                * static assets are served here
 └──test/                      * Contains our mocks/stubs/doubles/etc ...
```

### Notes

<p>When solving the issues, try making front-end templates to increase the functionality. </p>
<p>Be sure to checkout the <a href="https://angularjs.org/">AngularJS website</a> for api and tuts. </p>
<p>Good resource aswell: <a href="https://github.com/johnpapa/angular-styleguide"> AngularJS styleguide</a></p>
<p>Technologies used: Typescript 1.8, Angular 1.5, Angular Material, Webpack, Karma, Jasmine, HTML5, CSS/Sass, </p>
