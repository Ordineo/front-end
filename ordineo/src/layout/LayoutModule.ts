import {HeaderComponent} from "./header/HeaderComponent";
import {ToolbarComponent} from "./toolbar/ToolbarComponent";
import {ORDINEO_CORE} from "../core/core.module";

export const ORDINEO_LAYOUT = "ordineo.layout";

var deps:Array<string> = [];

angular
  .module(ORDINEO_LAYOUT, deps)
  .component(HeaderComponent.NAME, new HeaderComponent())
  .component(ToolbarComponent.NAME, new ToolbarComponent());
