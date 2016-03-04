import {TimeLineService} from "./service/timeline.service";
import {MATERIAL_DESIGN} from "../material-design/material-design";
import {TimeLineDirective} from "./directive/timeline.directive";
export const JWORKS_TIMELINE = "TimeLine";

var deps:Array<string> = [
  MATERIAL_DESIGN
];

angular
  .module(JWORKS_TIMELINE, deps)
  .service(TimeLineService.NAME, TimeLineService)
  .directive(TimeLineDirective.NAME, TimeLineDirective.instance);

