import {TimeLineService} from "./service/timeline.service";
import {MATERIAL_DESIGN} from "../material-design/material-design";
import {TimeLineDirective} from "./directive/timeline.vis.directive.ts";
import {TimeLineJSONParser} from "./service/timeline.service.jsonparser";

export const JWORKS360_TIMELINE = "jworks360.timeline";

var deps:Array<string> = [
  MATERIAL_DESIGN
];

angular
  .module(JWORKS360_TIMELINE, deps)
  .service(TimeLineService.NAME, TimeLineService)
  .service(TimeLineJSONParser.NAME, TimeLineJSONParser)
  .directive(TimeLineDirective.NAME, TimeLineDirective.instance);

