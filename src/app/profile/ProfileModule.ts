import {MATERIAL_DESIGN} from "../theme/ThemeModule";
import {AboutDirective} from "./components/about/AboutDirective";
import {ORDINEO_CORE} from "../core/core.module.ts";
import {ProfileService} from "./services/ProfileService";
import {TRAVERSON} from "../traverson/TraversonModule";
import {ORDINEO_GATEWAY} from "../gateway/GatewayModule";
import {TimelineComponent} from "./components/timeline/TimelineComponent";
import {MilestoneComponent} from "./components/timeline/MilestoneComponent";
import {MilestoneService} from "./services/MilestoneService";
import {MilestoneContainerComponent} from "./components/timeline/MilestoneContainerComponent";
import {MilestoneCreateComponent} from "./components/timeline/MilestoneCreateComponent";
import {ObjectivesSearch} from "./components/objectives-search/ObjectivesSearch";

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
  .service(MilestoneService.NAME, MilestoneService)
  .component(MilestoneContainerComponent.NAME, new MilestoneContainerComponent())
  .component(TimelineComponent.NAME, new TimelineComponent())
  .component(MilestoneComponent.NAME, new MilestoneComponent())
  .component(MilestoneCreateComponent.NAME, new MilestoneCreateComponent())
  .component(ObjectivesSearch.NAME, new ObjectivesSearch())
  .directive(AboutDirective.NAME, AboutDirective.instance());
