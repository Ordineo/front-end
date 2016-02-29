import {JWORKS360_AUTH} from "./auth/auth.module";
import {MATERIAL_DESIGN} from "./material-design/material-design";
import 'angular-ui-router';

export const APP_NAME = "jworks360";

var deps:Array<string> = [
  JWORKS360_AUTH,
  MATERIAL_DESIGN,
  'ui.router'
];

angular
  .module(APP_NAME, deps);
