import {ICredentials} from "../ICredentials";
import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import {SessionService, ISessionService} from "./SessionService";
import Router = angular.Router;
import {DashboardRoute, LoginRoute, MainRoute} from "../../app.routes";
export class AuthService implements IAuthService {
  static NAME:string = 'authService';

  static $inject = ['$rootRouter', '$http', '$q', SessionService.NAME];

  constructor(private $rootRouter:Router,
              private http:IHttpService,
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

  /*todo refactor code to make http authentication request*/
  logIn(credentials:ICredentials):IPromise<any> {
    var deferred:IDeferred<any> = this.$q.defer();
    deferred.resolve();
    return deferred.promise.then(()=> {
      this.sessionService.setAuthData("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJ5ZGcifQ.h04qk5YxTYGhse8rtvECrN0fabk83jWeI5aCGD-1Jxw");
    });
  }

  authenticate(routeNames:string[], callBack:Function):void {
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

  /*todo refactor code to validate token*/
  isAuthorized():boolean {
    return this.sessionService.getUsername() !== null;
  }
}
export interface IAuthService {
  authenticate(routeNames:string[], callBack:Function):void;
  logIn(credentials:ICredentials):IPromise<any>;
  logOut():IPromise<any>;
  isAuthorized():boolean;
}
