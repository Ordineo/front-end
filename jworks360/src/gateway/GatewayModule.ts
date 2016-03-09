import {GatewayApiService} from "./service/GatewayApiService";
export const JWORKS360_GATEWAY = "jworks360.gateway";

var deps:Array<string> = [];

angular
  .module(JWORKS360_GATEWAY, deps)
  .service(JWORKS360_GATEWAY, GatewayApiService);
