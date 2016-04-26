import {ICredentials} from "../ICredentials";
import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import {SessionService, ISessionService} from "./SessionService";
import Router = angular.Router;
import {DashboardRoute, LoginRoute} from "../../app.routes";
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
      this.authenticate();
    });
  }

  /*todo refactor code to make http authentication request*/
  logIn(credentials:ICredentials):IPromise<any> {
    var deferred:IDeferred<any> = this.$q.defer();
    deferred.resolve();
    return deferred.promise.then(()=> {
      this.sessionService.setAuthData("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJ5ZGUifQ.S8xMgpsiJccXvUNRqSjzU914heUUHadRH9lY00PhxVI");
    });
  }

  authenticate():void {
    if(this.isAuthorized()){
      this.$rootRouter.navigate([DashboardRoute.NAME]);
    }else{
      this.$rootRouter.navigate([LoginRoute.NAME]);
    }
  }

  /*todo refactor code to validate token*/
  isAuthorized():boolean {
    return this.sessionService.getUsername() !== null;
  }
}
export interface IAuthService {
  authenticate():void;
  logIn(credentials:ICredentials):IPromise<any>;
  logOut():IPromise<any>;
  isAuthorized():boolean;
}
