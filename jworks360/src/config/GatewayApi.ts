//todo refactor to service??
export class GatewayApi{
  static BASE_URL = "http://gateway-oraj360.cfapps.io/api/";

  static buildTimeLineUriByName(name:string):string{
    return GatewayApi.BASE_URL + 'timelines/person/' + name;
  }
}
