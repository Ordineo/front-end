import {THEME_MODULE} from "../theme/ThemeModule";
import {AboutDirective} from "./about/AboutDirective";
import {ORDINEO_CORE} from "../core/core.module.ts";
import {ProfileService} from "./services/ProfileService";
import {TRAVERSON} from "../traverson/TraversonModule";
import {ORDINEO_GATEWAY} from "../gateway/GatewayModule";
import {TimelineComponent} from "./milestones/timeline/TimelineComponent";
import {MilestoneComponent} from "./milestones/timeline/MilestoneComponent";
import {MilestoneService} from "./services/MilestoneService";
import {MilestoneContainerComponent} from "./milestones/timeline/MilestoneContainerComponent";
import {MilestoneCreateComponent} from "./milestones/timeline/MilestoneCreateComponent";
import {ObjectivesSearch} from "./milestones/objectives-search/ObjectivesSearch";
import {ProfileComponent} from "./ProfileComponent";
import {MilestoneDetailsComponent} from "./milestones/milestone-details/MilestoneDetailsComponent";
import {ProfileMenuComponent} from "./profile-menu/ProfileMenuComponent";

/**
 * @ngdoc module
 * @name ordineo.profile
 * @description
 *
 * Module with components and services related to the profile page
 */
export const ORDINEO_PROFILE = "ordineo.profile";

var deps:Array<string> = [
  THEME_MODULE,
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
  .component(ProfileMenuComponent.NAME, new ProfileMenuComponent())
  .component(ProfileComponent.NAME, new ProfileComponent())
  .directive(AboutDirective.NAME, AboutDirective.instance())
  .component(MilestoneDetailsComponent.NAME, new MilestoneDetailsComponent());
