
import {ToolbarComponent} from "./toolbar/ToolbarComponent";
import {LinkedInDirective} from "./linkedin/LinkedInDirective";
import {DashboardComponent} from "./DashboardComponent";

export const ORDINEO_LAYOUT = "ordineo.layout";

var deps:Array<string> = [];

angular
  .module(ORDINEO_LAYOUT, deps)
  .component(ToolbarComponent.NAME, new ToolbarComponent())
  .component(DashboardComponent.NAME, new DashboardComponent())
  .directive(LinkedInDirective.NAME, LinkedInDirective.instance);
