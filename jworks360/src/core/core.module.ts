import 'angular';
import 'angular-ui-router';
import './route/core.route.ts';
import {configureStates} from "./route/core.route.ts";

export const JWORKS360_CORE = 'jworks360.core';

angular.module(JWORKS360_CORE, [
  'ui.router'
])

.config(configureStates);
