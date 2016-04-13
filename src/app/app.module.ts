import {MATERIAL_DESIGN} from "./theme/ThemeModule";
import {APP_COMPONENT} from "./app.component.ts";
import {AppComponent} from "./app.component.ts";
import {ORDINEO_CORE} from "./core/core.module.ts";
import {ORDINEO_PROFILE} from "./profile/ProfileModule.ts";
import {ORDINEO_LAYOUT} from "./layout/LayoutModule";
import {ORDINEO_GATEWAY} from "./gateway/GatewayModule";
import {TRAVERSON} from "./traverson/TraversonModule";
import {ORDINEO_SOCIAL} from "./social/SocialModule";
import IHttpProvider = angular.IHttpProvider;
export const APP_NAME = "ordineo";

require('angular-moment');
require('moment');

var deps:Array<string> = [
  ORDINEO_CORE,
  ORDINEO_PROFILE,
  ORDINEO_LAYOUT,
  ORDINEO_GATEWAY,
  MATERIAL_DESIGN,
  ORDINEO_SOCIAL,
  TRAVERSON,
  'angularMoment'
];

angular
  .module(APP_NAME, deps)
  .component(APP_COMPONENT, new AppComponent());