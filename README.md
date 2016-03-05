[![Build Status](https://travis-ci.org/oraj-360/front-end.svg?branch=new-build-webpack)](https://travis-ci.org/oraj-360/front-end)

# Front-end
Front end project for the 360 Tool.
[The app is located at http://oraj360.cfapps.io/](http://oraj360.cfapps.io/).

## Webpack migration

This branch will be used for migrating from grunt to webpack. 
Code will be refactored towards a Web components / Angular 2 paradigm.

Refactored code can be found inside of jworks360 folder.

### Install

Install cli tools
```
npm i -g webpack typings http-server
```
  
Install dependencies
```
npm i
```
  
Launch dev server
```
npm run dev
```

### Build

```
npm run build
```

Run deployed app
```
npm run open
```

### Tests

```
npm test
```
- Filenames are required to end with .spec.ts
- Tests should be located inside of jworks360/src or subfolders

#### Code coverage

Run tests to generate reports
reports are located in: reports/


## Notes

<p>When solving the issues, try making front-end templates to increase the functionality. </p>
<p>Be sure to checkout the <a href="https://angularjs.org/">AngularJS website</a> for api and tuts. </p>
<p>Good resource aswell: <a href="https://github.com/johnpapa/angular-styleguide"> AngularJS styleguide</a></p>
<p>Technologies used: Typescript 1.8, Angular 1.5, Angular Material, Webpack, Karma, Jasmine, HTML5, CSS/Sass, </p>
