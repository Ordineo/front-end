import {TabMenuComponent} from "../layout/tab-menu/TabMenuComponent.ts";
import {MATERIAL_DESIGN} from "../material-design/material-design";
import {AboutDirective} from "./components/about/AboutDirective";

export const JWORKS360_PROFILE = "jworks360.profile";

var deps:Array<string> = [
  MATERIAL_DESIGN
];

angular
  .module(JWORKS360_PROFILE, deps)
  .directive(AboutDirective.NAME, AboutDirective.instance);
