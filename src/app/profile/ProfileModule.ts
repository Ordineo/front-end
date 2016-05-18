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
import {SummaryPageComponent} from "./summary-page/SummaryPageComponent";
import {MilestoneDetailsPageComponent} from "./milestones-details-page/MilestoneDetailsPageComponent";
import {MilestoneCommentsComponent} from "./milestones/milestone-comments/MilestoneCommentsComponent";
import {MilestoneItemComponent} from "./milestones/milestone-list/MilestoneItemComponent";
import {MilestoneCommentsComponent} from "./milestones/milestone-comments/MilestoneCommentsComponent";
import {ProfileMenuState} from "./profile-menu/ProfileMenuState";

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

  /*Tab pages*/
  .component(SummaryPageComponent.NAME, new SummaryPageComponent())
  .component(MilestoneDetailsPageComponent.NAME, new MilestoneDetailsPageComponent())

  /* services */
  .service(ProfileService.NAME, ProfileService)
  .service(MilestoneService.NAME, MilestoneService)
  .service(ProfileMenuState.NAME, ProfileMenuState)

  /* components and directives*/
  .component(MilestoneContainerComponent.NAME, new MilestoneContainerComponent())
  .component(TimelineComponent.NAME, new TimelineComponent())
  .component(MilestoneComponent.NAME, new MilestoneComponent())
  .component(MilestoneCreateComponent.NAME, new MilestoneCreateComponent())
  .component(ObjectivesSearch.NAME, new ObjectivesSearch())
  .component(ProfileMenuComponent.NAME, new ProfileMenuComponent())
  .component(ProfileComponent.NAME, new ProfileComponent())
  .component(MilestoneDetailsComponent.NAME, new MilestoneDetailsComponent())
  .component(MilestoneCommentsComponent.NAME, new MilestoneCommentsComponent())
  .component(MilestoneItemComponent.NAME, new MilestoneItemComponent())
  .component(MilestoneCommentsComponent.NAME, new MilestoneCommentsComponent())
  .directive(AboutDirective.NAME, AboutDirective.instance())
  .directive('onEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.onEnter);
          });
          event.preventDefault();
        }
      });
    }
  });
