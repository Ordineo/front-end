import IWindowService = angular.IWindowService;

export class SessionService implements ISessionService {
  static NAME:string = "sessionService";
  static $inject = ['$window'];

  private ITEM_USER:string = 'session.user';
  private ITEM_TOKEN:string = 'session.token';

  private _authData:AuthData;

  constructor(private $window:IWindowService) {
    this._authData = {
      token: this.$window.localStorage.getItem(this.ITEM_TOKEN),
      username: this.$window.localStorage.getItem(this.ITEM_USER)
    }
  }

  setAuthData(authData:AuthData):void {
    this.$window.localStorage.setItem(this.ITEM_USER, authData.username);
    this.$window.localStorage.setItem(this.ITEM_TOKEN, authData.token);
    this._authData = authData;
  }

  getAuthData():AuthData {
    return this._authData;
  }

  destroySession():void {
    this.setAuthData({token: null, username: null});
  }
}

export interface AuthData {
  username:string;
  token:string;
}

export interface ISessionService {
  setAuthData(authData:AuthData):void;
  getAuthData():AuthData;
  destroySession():void;
}
