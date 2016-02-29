import 'angular';
import 'angular-ui-router';
import './core.route.ts';
import {configureStates} from "./core.route";

export const JWORKS360_CORE = 'jworks360.core';

angular.module(JWORKS360_CORE, [
  'ui.router'
])

.config(configureStates);
