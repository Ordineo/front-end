import {ProfileMenuComponent} from "./header/menu/profile.menu.component";
import {ProfileSummaryComponent} from "./header/summary/profile.summary.compoment";
export const JWORKS360_PROFILE = "jworks360.profile";

angular
  .module(JWORKS360_PROFILE, [])
  .component(ProfileMenuComponent.NAME, new ProfileMenuComponent())
  .component(ProfileSummaryComponent.NAME, new ProfileSummaryComponent());

