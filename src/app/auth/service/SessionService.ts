import IWindowService = angular.IWindowService;

export class SessionService implements ISessionService {
  static NAME:string = "sessionService";
  static $inject = ['$window', 'jwtHelper'];

  private ITEM_TOKEN:string = 'session.token';

  private token:string;

  constructor(private $window:IWindowService, private jwtHelper:any) {
    this.token = this.$window.localStorage.getItem(this.ITEM_TOKEN);
  }
  
  getAuthData():string {
    return this.$window.localStorage.getItem(this.ITEM_TOKEN);
  }

  setAuthData(token:string):void {
    this.token = token;
    if(token) {
      this.$window.localStorage.setItem(this.ITEM_TOKEN, this.token);
    }else{
      this.$window.localStorage.removeItem(this.ITEM_TOKEN);
    }
  }

  getUsername():string {
    if (this.token) {
      return this.jwtHelper.decodeToken(this.token).sub;
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
  getAuthData():string;
  getUsername():string;
  destroySession():void;
}
