import {MATERIAL_DESIGN} from "../theme/ThemeModule";
import {AboutDirective} from "./components/about/AboutDirective";
import {ORDINEO_CORE} from "../core/core.module.ts";
import {ProfileService} from "./services/ProfileService";
import {TRAVERSON} from "../traverson/TraversonModule";
import {ORDINEO_GATEWAY} from "../gateway/GatewayModule";
import {TimelineComponent} from "./components/timeline/TimelineComponent";
import {MilestoneComponent} from "./components/timeline/MilestoneComponent";
import {TimelineService} from "./services/TimelineService";

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
  .service(ProfileService.NAME, ProfileService)
  .service(TimelineService.NAME, TimelineService)
  .component(TimelineComponent.NAME, new TimelineComponent())
  .component(MilestoneComponent.NAME, new MilestoneComponent())
  .directive(AboutDirective.NAME, AboutDirective.instance());
