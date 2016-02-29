import {JWORKS360_AUTH} from "./auth/auth.module";
import {MATERIAL_DESIGN} from "./material-design/material-design";
export const APP_NAME = "jworks360";

angular
  .module(APP_NAME, [
    JWORKS360_AUTH,
    MATERIAL_DESIGN
  ]);
