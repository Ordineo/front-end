import {MainToolbarComponent} from "./main-toolbar/MainToolbarComponent";
import {HeaderComponent} from "./header/HeaderComponent";
import {TabMenuComponent} from "./tab-menu/TabMenuComponent";

export const JWORKS360_LAYOUT = "jworks360.layout";

var deps:Array<string> = [];

angular
  .module(JWORKS360_LAYOUT, deps)
  .component(HeaderComponent.NAME, new HeaderComponent())
  .component(MainToolbarComponent.NAME, new MainToolbarComponent())
  .component(TabMenuComponent.NAME, new TabMenuComponent());
