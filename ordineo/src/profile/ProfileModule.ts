import {TabMenuComponent} from "../layout/tab-menu/TabMenuComponent.ts";
import {MATERIAL_DESIGN} from "../theme/ThemeModule";
import {AboutDirective} from "./components/about/AboutDirective";
import {ORDINEO_CORE} from "../core/core.module";
import {ProfileService} from "./services/ProfileService";


/**
 * @ngdoc module
 * @name ordineo.profile
 * @description
 *
 * Module with components and services related to the profile page
 */
export const ORDINEO_PROFILE = "ordineo.profile";

var deps:Array<string> = [
  MATERIAL_DESIGN,
  ORDINEO_CORE
];

angular
  .module(ORDINEO_PROFILE, deps)
  .service(ProfileService.NAME, ProfileService)
  .directive(AboutDirective.NAME, AboutDirective.instance);
