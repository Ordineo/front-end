import IWindowService = angular.IWindowService;

export class SessionService implements ISessionService {
  static NAME:string = "sessionService";
  static $inject = ['$window', 'jwtHelper'];

  private ITEM_TOKEN:string = 'session.token';

  private token:string;

  constructor(private $window:IWindowService, private jwtHelper:any) {
    this.token = this.$window.localStorage.getItem(this.ITEM_TOKEN);
  }

  setAuthData(token:string):void {
    this.token = token;
    this.$window.localStorage.setItem(this.ITEM_TOKEN, this.token);
  }

  getUsername():string {
    if (this.token) {
      return this.jwtHelper.decodeToken(this.token).username;
    } else {
      return null;
    }
  }

  destroySession():void {
    this.setAuthData(null);
  }
}

export interface ISessionService {
  setAuthData(authData:string):void;
  getUsername():string;
  destroySession():void;
}
