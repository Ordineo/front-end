import {JWORKS360_AUTH} from "./auth/auth.module";
import {MATERIAL_DESIGN} from "./material-design/material-design";
import {APP_COMPONENT} from "./app.component";
import {AppComponent} from "./app.component";
import {JWORKS360_CORE} from "./core/core.module";
import {JWORKS360_PROFILE} from "./profile/profile.module";

export const APP_NAME = "jworks360";

var deps:Array<string> = [
  JWORKS360_AUTH,
  JWORKS360_CORE,
  JWORKS360_PROFILE,
  MATERIAL_DESIGN
];

angular
  .module(APP_NAME, deps)
  .component(APP_COMPONENT, new AppComponent());
