import {ICredentials} from "../ICredentials";
import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import {SessionService, ISessionService} from "./SessionService";
import Router = angular.Router;
import {DashboardRoute, LoginRoute, MainRoute} from "../../app.routes";
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
export class AuthService implements IAuthService {
  static NAME:string = 'authService';

  static $inject = ['$rootRouter', '$http', '$q', SessionService.NAME];

  constructor(private $rootRouter:Router,
              private $http:IHttpService,
              private $q:IQService,
              private sessionService:ISessionService) {
  }

  /*todo refactor code to make http authentication request*/
  logOut():IPromise<any> {
    var deferred:IDeferred<any> = this.$q.defer();

    deferred.resolve();

    return deferred.promise.then(()=> {
      this.sessionService.destroySession();
      this.authenticate([MainRoute.NAME], null);
    });
  }

  logIn(credentials:ICredentials):IPromise<any> {
    return this.$http.post(GatewayApiService.getAuthApi(), credentials);
  }

  authenticate(routeNames:any[], callBack:Function):void {
    if (this.isAuthorized()) {
      if (routeNames !== null) {
        this.$rootRouter.navigate(routeNames);
      }
      if (callBack) {
        callBack();
      }
    } else {
      this.$rootRouter.navigate([LoginRoute.NAME]);
    }
  }

  isAuthorized():boolean {
    return this.sessionService.getUsername() !== null;
  }
}
export interface IAuthService {
  authenticate(routeNames:any[], callBack:Function):void;
  logIn(credentials:ICredentials):IPromise<any>;
  logOut():IPromise<any>;
  isAuthorized():boolean;
}
