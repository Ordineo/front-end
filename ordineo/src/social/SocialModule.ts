import {LinkedInService} from "./linkedin/LinkedInService";
import {ORDINEO_GATEWAY} from "../gateway/GatewayModule";
export const ORDINEO_SOCIAL = "ordineo.social";

var deps:Array<string> = [
  ORDINEO_GATEWAY
];

angular
  .module(ORDINEO_SOCIAL, deps)
  .service(LinkedInService.SERVICE_NAME, LinkedInService);
