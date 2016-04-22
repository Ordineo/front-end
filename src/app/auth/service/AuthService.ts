import {ICredentials} from "../ICredentials";
import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import {SessionService, ISessionService} from "./SessionService";
export class AuthService implements IAuthService {
  static NAME:string = 'authService';

  static $inject = ['$http','$q',SessionService.NAME];

  constructor(private http:IHttpService,private $q:IQService, private sessionService:ISessionService) {
  }

  logOut():IPromise<any>{
    var deferred:IDeferred<any> = this.$q.defer();

    deferred.resolve();

    return deferred.promise.then(()=>{
      this.sessionService.destroySession();
    });
  }

  logIn(credentials:ICredentials):IPromise<any> {
    var deferred:IDeferred<any> = this.$q.defer();
    deferred.resolve();
    return deferred.promise.then(()=>{
      this.sessionService.setAuthData({token: '12345', username: credentials.username});
    });
  }

  isAuthorized():boolean {
    if(this.sessionService.getAuthData() === null){
      return false;
    }else{
      console.log(this.sessionService.getAuthData());
      return this.sessionService.getAuthData().token !== null;
    }
  }
}
export interface IAuthService {
  logIn(credentials:ICredentials):IPromise<any>;
  logOut():IPromise<any>;
  isAuthorized():boolean;
}
