//todo refactor to service??
export class GatewayApi{
  static BASE_URL = "http://gateway-oraj360.cfapps.io";

  static buildTimeLineUriByName(name:string):string{
    return GatewayApi.BASE_URL + '/timeline-oraj360/api/timelines/person/' + name;
  }
}
