import {ObjectivesService} from "./service/ObjectivesService";
export const ORDINEO_OBJECTIVES = "ordineo.objectives";

var deps:Array<string> = [];

angular
  .module(ORDINEO_OBJECTIVES, deps)
  .service(ObjectivesService.NAME, ObjectivesService);

