import {ObjectivesService} from "./service/ObjectivesService";
export const JWORKS360_OBJECTIVES = "ordineo.objectives";

var deps:Array<string> = [];

angular
  .module(JWORKS360_OBJECTIVES, deps)
  .service(ObjectivesService.NAME, ObjectivesService);

