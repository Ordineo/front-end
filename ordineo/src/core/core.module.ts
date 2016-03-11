import 'angular';
import 'angular-ui-router';
import './route/core.route.ts';
import {configureStates} from "./route/core.route.ts";
import {CardHeaderComponent} from "./components/card-header/CardHeaderComponent";

export const JWORKS360_CORE = 'ordineo.core';

var deps:Array<string> = ['ui.router'];

angular.module(JWORKS360_CORE, deps)
  .config(configureStates)
  .component(CardHeaderComponent.NAME, new CardHeaderComponent());
