import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import IHttpService = angular.IHttpService;
import IRequestConfig = angular.IRequestConfig;
export class LinkedInService {
  static SERVICE_NAME:string = 'ordineo.social.linkedin';

  static $inject:Array<string> = [GatewayApiService.SERVICE_NAME, '$http'];

  private httpConfig:IRequestConfig;

  constructor(private gateway:GatewayApiService, private $http:IHttpService) {
    this.httpConfig = {
      method: 'GET',
      url: gateway.getLinkedInApi()
    };
  }

  public authorize(username:string):void {
    this.httpConfig.params = {
      username: username
    };

    this.$http(this.httpConfig).then((response)=> {
      if(response.status === 202) {
        this.handle202();
      }
    }, (error)=> {
      if(error.status === 401) {
        this.handle401();
      }
    });
  }

  private handle202():void{
    console.log('202');
  }

  private handle401():void{
    console.log('401');
  }
}
