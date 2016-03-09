//todo refactor to service??
export class GatewayApi{
  static BASE_URL = "http://gateway-oraj360.cfapps.io";
  static BAD_URL = "http://gateway-oraj360.cfappsf.io";

  static OBJECTIVES_API = "https://gateway-oraj360.cfapps.io/objectives-oraj360/api/";

  static buildTimeLineUriByName(name:string):string{
    return GatewayApi.BAD_URL + '/timeline-oraj360/api/timelines/person/' + name;
  }
}
