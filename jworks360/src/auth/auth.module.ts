import 'angular';
import {LOGIN} from "./component/login.directive";
import {LoginDirective} from "./component/login.directive";
import {MATERIAL_DESIGN} from "../material-design/material-design";


export const JWORKS360_AUTH = 'jworks360.auth';

angular
    .module(JWORKS360_AUTH, [
      MATERIAL_DESIGN
    ])
    .directive(LOGIN, LoginDirective.instance);
