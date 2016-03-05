import IWindowService = angular.IWindowService;
export const AUTH_SERVICE = "jworks360AuthService";

export interface ICredentials {
  email:string;
  pw: string;
}

export interface IAuthService {
  validateCredentials(user:ICredentials):boolean;
  createSession(user:string):void;
  isAuthorized():boolean;
}

export class AuthService implements IAuthService{
  static $inject:Array<string> = ['$window'];
  static SESSION_KEY = 'user';

  constructor(private $window:IWindowService){

  }

  createSession(user:string):void {
    this.$window.sessionStorage.setItem(AuthService.SESSION_KEY, user);
  }

  isAuthorized():boolean {
    return this.$window.sessionStorage.getItem(AuthService.SESSION_KEY);
  }

  destroySession():void{
    this.$window.sessionStorage.removeItem(AuthService.SESSION_KEY);
  }

  validateCredentials(user:ICredentials):boolean {
    return user.email === 'j@d.be';
  }
}
