//todo refactor to service??
export class GatewayApi{
  static BASE_URL = "http://gateway-oraj360.cfapps.io";
  static BAD_URL = "http://gateway-oraj360.cfappsf.io";

  static buildTimeLineUriByName(name:string):string{
    return GatewayApi.BAD_URL + '/timeline-oraj360/api/timelines/person/' + name;
  }
}
