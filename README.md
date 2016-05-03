[![Build Status](https://travis-ci.org/Ordineo/front-end.svg?branch=master)](https://travis-ci.org/Ordineo/front-end)

# Front-end
Front end project for Ordineo.
[The app is located at http://ordineo.cfapps.io/](http://frontend-ordineo.cfapps.io/).

### Install

Install cli tools
```
npm i -g webpack typings protractor codeceptjs
```
  
Install dependencies
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

- Filenames are required to end with .spec.ts
- Tests should be located inside of ordineo/src or subfolders

#### Code coverage

Run tests to generate reports

Reports are located inside reports/ folder


## Notes

<p>When solving the issues, try making front-end templates to increase the functionality. </p>
<p>Be sure to checkout the <a href="https://angularjs.org/">AngularJS website</a> for api and tuts. </p>
<p>Good resource aswell: <a href="https://github.com/johnpapa/angular-styleguide"> AngularJS styleguide</a></p>
<p>Technologies used: Typescript 1.8, Angular 1.5, Angular Material, Webpack, Karma, Jasmine, HTML5, CSS/Sass, </p>
