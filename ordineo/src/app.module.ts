import {JWORKS360_AUTH} from "./auth/auth.module";
import {MATERIAL_DESIGN} from "./theme/ThemeModule";
import {APP_COMPONENT} from "./app.component";
import {AppComponent} from "./app.component";
import {JWORKS360_CORE} from "./core/core.module";
import {JWORKS360_PROFILE} from "./profile/profile.module";
import {JWORKS360_TIMELINE} from "./timeline/timeline.module";
import {JWORKS360_LAYOUT} from "./layout/LayoutModule";
import {JWORKS360_OBJECTIVES} from "./objectives/ObjectivesModule";
import {JWORKS360_GATEWAY} from "./gateway/GatewayModule";
import {JWORKS360_PERSONS} from "./persons/PersonsModule";
import {TRAVERSON} from "./traverson/TraversonModule";
export const APP_NAME = "ordineo";

require('angular-moment');
require('moment');

var deps:Array<string> = [
  JWORKS360_AUTH,
  JWORKS360_CORE,
  JWORKS360_PROFILE,
  JWORKS360_LAYOUT,
  JWORKS360_TIMELINE,
  JWORKS360_OBJECTIVES,
  JWORKS360_GATEWAY,
  JWORKS360_PERSONS,
  MATERIAL_DESIGN,
  TRAVERSON,
  'angularMoment'
];

angular
  .module(APP_NAME, deps)
  .component(APP_COMPONENT, new AppComponent());
