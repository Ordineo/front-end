import {TimeLineService} from "./service/timeline.service";
import {MATERIAL_DESIGN} from "../theme/ThemeModule";
import {TimeLineDirective} from "./directive/timeline.vis.directive.ts";
import {TimeLineJSONParser} from "./service/timeline.service.jsonparser";
import {ORDINEO_GATEWAY} from "../gateway/GatewayModule";

export const ORDINEO_TIMELINE = "ordineo.timeline";

var deps:Array<string> = [
  MATERIAL_DESIGN,
  ORDINEO_GATEWAY
];

angular
  .module(ORDINEO_TIMELINE, deps)
  .service(TimeLineService.NAME, TimeLineService)
  .service(TimeLineJSONParser.NAME, TimeLineJSONParser)
  .directive(TimeLineDirective.NAME, TimeLineDirective.instance);