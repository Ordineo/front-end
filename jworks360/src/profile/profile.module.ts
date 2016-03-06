import {TabMenuComponent} from "../layout/tab-menu/TabMenuComponent.ts";
import {ProfileSummaryComponent} from "./header/summary/profile.summary.compoment";
import {MATERIAL_DESIGN} from "../material-design/material-design";

export const JWORKS360_PROFILE = "jworks360.profile";

var deps:Array<string> = [
  MATERIAL_DESIGN
];

angular
  .module(JWORKS360_PROFILE, deps)
  .component(ProfileSummaryComponent.NAME, new ProfileSummaryComponent());

