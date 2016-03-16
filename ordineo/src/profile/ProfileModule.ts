import {MATERIAL_DESIGN} from "../theme/ThemeModule";
import {AboutDirective} from "./components/about/AboutDirective";
import {ORDINEO_CORE} from "../core/core.module";
import {ProfileService} from "./services/ProfileService";
import {MoodComponent} from "./components/mood/MoodComponent";
import {TRAVERSON} from "../traverson/TraversonModule";
import {ORDINEO_GATEWAY} from "../gateway/GatewayModule";

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
  ORDINEO_CORE,
  TRAVERSON,
  ORDINEO_GATEWAY
];

angular
  .module(ORDINEO_PROFILE, deps)
  .component(MoodComponent.NAME, new MoodComponent())
  .service(ProfileService.NAME, ProfileService)
  .directive(AboutDirective.NAME, AboutDirective.instance());
