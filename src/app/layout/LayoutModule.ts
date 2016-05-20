import {ToolbarComponent} from "./toolbar/ToolbarComponent";
import {LinkedInDirective} from "./linkedin/LinkedInDirective";
import {DashboardComponent} from "./DashboardComponent";
import {HeaderComponent} from "./header/HeaderComponent";

export const ORDINEO_LAYOUT = "ordineo.layout";

var deps: Array<string> = [];

angular
  .module(ORDINEO_LAYOUT, deps)
  .component(HeaderComponent.NAME, new HeaderComponent())
  .component(ToolbarComponent.NAME, new ToolbarComponent())
  .component(DashboardComponent.NAME, new DashboardComponent())
  .directive(LinkedInDirective.NAME, LinkedInDirective.instance);
