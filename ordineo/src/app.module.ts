import {ORDINEO_AUTH} from "./auth/auth.module";
import {MATERIAL_DESIGN} from "./theme/ThemeModule";
import {APP_COMPONENT} from "./app.component";
import {AppComponent} from "./app.component";
import {ORDINEO_CORE} from "./core/core.module";
import {ORDINEO_PROFILE} from "./profile/ProfileModule.ts";
import {ORDINEO_TIMELINE} from "./timeline/timeline.module";
import {ORDINEO_LAYOUT} from "./layout/LayoutModule";
import {ORDINEO_OBJECTIVES} from "./objectives/ObjectivesModule";
import {ORDINEO_GATEWAY} from "./gateway/GatewayModule";
import {ORDINEO_PERSONS} from "./persons/PersonsModule";
import {TRAVERSON} from "./traverson/TraversonModule";
export const APP_NAME = "ordineo";

require('angular-moment');
require('moment');

var deps:Array<string> = [
  ORDINEO_AUTH,
  ORDINEO_CORE,
  ORDINEO_PROFILE,
  ORDINEO_LAYOUT,
  ORDINEO_TIMELINE,
  ORDINEO_OBJECTIVES,
  ORDINEO_GATEWAY,
  ORDINEO_PERSONS,
  MATERIAL_DESIGN,
  TRAVERSON,
  'angularMoment'
];

angular
  .module(APP_NAME, deps)
  .component(APP_COMPONENT, new AppComponent());
