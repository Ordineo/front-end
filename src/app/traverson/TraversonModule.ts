
import {TraversonHalService} from "./service/TraversonHalService";
var traverson = require("traverson-angular");

export const TRAVERSON = "traversonModule";

angular
  .module(TRAVERSON, [traverson.name])
  .service(TraversonHalService.SERVICE_NAME, TraversonHalService);
