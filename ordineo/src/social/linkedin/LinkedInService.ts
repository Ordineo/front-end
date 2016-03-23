import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import IRequestConfig = angular.IRequestConfig;
import IHttpService = angular.IHttpService;
import IRequestShortcutConfig = angular.IRequestShortcutConfig;
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
  //  make post to https://gateway-ordineo.cfapps.io/social-ordineo/connect/linkedin
    var cf:IRequestShortcutConfig = {
      headers:{
        'Content-type':'application/x-www-form-urlencoded'
      }
    };
    this.$http.post(
      'https://gateway-ordineo.cfapps.io/social-ordineo/connect/linkedin',
      'scope=r_basicprofile',
      cf
    ).then((success)=>{
      console.log("ok");
      console.log(success);
    },(error)=>{
      console.log(error);
    });
  }
}
