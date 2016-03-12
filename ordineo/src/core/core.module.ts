import 'angular';
import 'angular-ui-router';
import './route/core.route.ts';
import {configureStates} from "./route/core.route.ts";
import {CardHeaderComponent} from "./components/card-header/CardHeaderComponent";

require('angular-chartist.js');
require('chartist/dist/chartist.css');
require('chartist');

export const ORDINEO_CORE = 'ordineo.core';

var deps:Array<string> = [
  'ui.router',
  'angular-chartist'
];

angular.module(ORDINEO_CORE, deps)
  .config(configureStates)
  .component(CardHeaderComponent.NAME, new CardHeaderComponent());
