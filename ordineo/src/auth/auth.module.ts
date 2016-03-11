import 'angular';
import 'angular-messages';
import {MATERIAL_DESIGN} from "../theme/ThemeModule";
import IModule = angular.IModule;
import {AUTH_SERVICE} from "./service/auth.service";
import {AuthService} from "./service/auth.service";
import {LoginComponent} from "./component/login.component";
import {LOGIN} from "./component/login.component";

export const ORDINEO_AUTH = 'ordineo.auth';

var deps:Array<string> = [
  MATERIAL_DESIGN,
  'ngMessages'
];

var authModule:IModule = angular.module(ORDINEO_AUTH, deps);

authModule
  .service(AUTH_SERVICE, AuthService)
  .component(LOGIN, new LoginComponent());