import {JWORKS360_AUTH} from "./auth/auth.module";
import {MATERIAL_DESIGN} from "./material-design/material-design";
import {APP_COMPONENT} from "./app.component";
import {AppComponent} from "./app.component";
import {JWORKS360_CORE} from "./core/core.module";
import {JWORKS360_PROFILE} from "./profile/profile.module";
import {JWORKS360_TIMELINE} from "./timeline/timeline.module";
import {JWORKS360_LAYOUT} from "./layout/LayoutModule";
export const APP_NAME = "jworks360";

require('angular-moment');
require('moment');

var deps:Array<string> = [
  JWORKS360_AUTH,
  JWORKS360_CORE,
  JWORKS360_PROFILE,
  JWORKS360_LAYOUT,
  JWORKS360_TIMELINE,
  MATERIAL_DESIGN,
  'angularMoment'
];

angular
  .module(APP_NAME, deps)
  .component(APP_COMPONENT, new AppComponent());
