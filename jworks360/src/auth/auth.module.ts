import 'angular';
import {LOGIN} from "./component/login.directive";
import {LoginDirective} from "./component/login.directive";
import {MATERIAL_DESIGN} from "../material-design/material-design";
import IModule = angular.IModule;
import {AUTH_SERVICE} from "./service/auth.service";
import {AuthService} from "./service/auth.service";

export const JWORKS360_AUTH = 'jworks360.auth';

var deps:Array<string> = [
  MATERIAL_DESIGN
];

var authModule:IModule = angular.module(JWORKS360_AUTH, deps);

authModule
  .service(AUTH_SERVICE, AuthService)
  .directive(LOGIN, LoginDirective.instance);
