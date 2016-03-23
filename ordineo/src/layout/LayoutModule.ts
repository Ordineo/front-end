import {HeaderComponent} from "./header/HeaderComponent";
import {ToolbarComponent} from "./toolbar/ToolbarComponent";
import {LinkedInComponent} from "./linkedin/LinkedInComponent";

export const ORDINEO_LAYOUT = "ordineo.layout";

var deps:Array<string> = [];

angular
  .module(ORDINEO_LAYOUT, deps)
  .component(HeaderComponent.NAME, new HeaderComponent())
  .component(ToolbarComponent.NAME, new ToolbarComponent())
  .component(LinkedInComponent.NAME, new LinkedInComponent());
