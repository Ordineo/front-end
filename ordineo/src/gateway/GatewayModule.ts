import {GatewayApiService} from "./service/GatewayApiService";
export const ORDINEO_GATEWAY = "ordineo.gateway";

var deps:Array<string> = [];

angular
  .module(ORDINEO_GATEWAY, deps)
  .service(GatewayApiService.SERVICE_NAME, GatewayApiService);
