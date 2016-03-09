import {MainToolbarComponent} from "./main-toolbar/MainToolbarComponent";
import {HeaderComponent} from "./header/HeaderComponent";
import {TabMenuComponent} from "./tab-menu/TabMenuComponent";
import {MainToolbarV2Component} from "./main-toolbarv2/MainToolbarV2Component";
import {HeaderV2Component} from "./header-v2/HeaderV2Component";
import {HeaderMenuComponent} from "./header-menu/HeaderMenuComponent";

export const JWORKS360_LAYOUT = "jworks360.layout";

var deps:Array<string> = [];

angular
  .module(JWORKS360_LAYOUT, deps)
  .component(HeaderComponent.NAME, new HeaderComponent())
  .component(MainToolbarComponent.NAME, new MainToolbarComponent())
  .component(TabMenuComponent.NAME, new TabMenuComponent())
  .component(MainToolbarV2Component.NAME, new MainToolbarV2Component())
  .component(HeaderV2Component.NAME, new HeaderV2Component())
  .component(HeaderMenuComponent.NAME, new HeaderMenuComponent());

