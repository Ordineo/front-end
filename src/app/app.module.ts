import {THEME_MODULE} from "./theme/ThemeModule";
import {AppComponent} from "./app.component.ts";
import {ORDINEO_CORE} from "./core/core.module.ts";
import {ORDINEO_PROFILE} from "./profile/ProfileModule.ts";
import {ORDINEO_LAYOUT} from "./layout/LayoutModule";
import {ORDINEO_GATEWAY} from "./gateway/GatewayModule";
import {ORDINEO_SOCIAL} from "./social/SocialModule";
import IHttpProvider = angular.IHttpProvider;
import {JWORKS_AUTH} from "./auth/AuthModule";

export const APP_NAME = "ordineo";

angular
  .module(APP_NAME, [
    ORDINEO_CORE,
    ORDINEO_PROFILE,
    ORDINEO_LAYOUT,
    ORDINEO_GATEWAY,
    ORDINEO_SOCIAL,
    JWORKS_AUTH,
    THEME_MODULE,
  ])
  .component(AppComponent.NAME, new AppComponent());
