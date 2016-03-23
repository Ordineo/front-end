import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import IRequestConfig = angular.IRequestConfig;
import IHttpService = angular.IHttpService;
import IRequestShortcutConfig = angular.IRequestShortcutConfig;
import IWindowService = angular.IWindowService;
import IPromise = angular.IPromise;
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

  public authorize(username:string):IPromise<any> {
    this.httpConfig.params = {
      username: username
    };

    return this.$http(this.httpConfig);
  }

  private handle202():void{
  }

  private handle401():void{
  //  make post to https://gateway-ordineo.cfapps.io/social-ordineo/connect/linkedin
  //   var cf:IRequestShortcutConfig = {
  //     headers:{
  //       'Content-type':'application/x-www-form-urlencoded'
  //     }
  //   };
  //   this.$http.post(
  //     'https://gateway-ordineo.cfapps.io/social-ordineo/connect/linkedin',
  //     'scope=r_basicprofile',
  //     cf
  //   ).then((success)=>{
  //     var any = success.data.toString().replace('action="/uas/oauth2/authorizedialog/submit', 'action="https://www.linkedin.com/uas/oauth2/authorizedialog/submit');
  //     var win = window.open();
  //     console.log(any);
  //     win.document.write(any);
  //   },(error)=>{
  //     console.log(error);
  //   });
  }
}
