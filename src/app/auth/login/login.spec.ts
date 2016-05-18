import 'angular-mocks';
import {JWORKS_AUTH} from "../AuthModule";

import IProvideService = angular.auto.IProvideService;
import {AuthService, IAuthService} from "../service/AuthService";
import createSpy = jasmine.createSpy;
import {ICredentials} from "../ICredentials";
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import {LoginComponent, LoginController} from "../LoginComponent";
import {ISessionService, SessionService} from "../service/SessionService";

describe("Login controller", ()=> {
  var scope:IScope;
  var ctrl:LoginController;
  var authService:IAuthService;
  var sessionService:ISessionService;

  beforeEach(
    angular.mock.module(JWORKS_AUTH,
      ($provide:IProvideService)=> {
        authService = new AuthMock();
        sessionService = new SessionMock();

        $provide.service(AuthService.NAME, ()=>authService);
        $provide.service(SessionService.NAME, ()=>sessionService);
      }));

  beforeEach(inject((_$componentController_, _$rootScope_:IRootScopeService)=> {
    scope = _$rootScope_.$new();
    ctrl = _$componentController_(LoginComponent.NAME, {$scope: scope});
  }));

  it('should authenticate', ()=> {
    spyOn(authService, 'authenticate');
    ctrl.$onInit();
    expect(authService.authenticate).toHaveBeenCalled();
  });

  describe('login', ()=> {

    it('should succeed', inject((_$q_:IQService)=> {
      var deferred:IDeferred<any> = _$q_.defer();
      spyOn(authService, 'logIn').and.returnValue(deferred.promise);
      spyOn(sessionService, 'setAuthData');
      spyOn(authService, 'authenticate');
      ctrl.logIn({
        email: 'ryan@mail.be',
        password: 'hottentottentettententoonstelling',
        username: 'Rydg'
      });
      expect(authService.logIn).toHaveBeenCalled();
      deferred.resolve({data: {}});
      scope.$digest();
      expect(sessionService.setAuthData).toHaveBeenCalled();
      expect(authService.authenticate).toHaveBeenCalled();
    }));

    it('should fail with 401 error', inject((_$q_:IQService)=> {
      var deferred:IDeferred<any> = _$q_.defer();
      spyOn(authService, 'logIn').and.returnValue(deferred.promise);
      spyOn(ctrl, 'showErrorMessage');
      ctrl.logIn({});
      expect(authService.logIn).toHaveBeenCalled();
      deferred.reject({status: 401});
      scope.$digest();

      expect(ctrl.showErrorMessage).toHaveBeenCalled();
      expect(ctrl.errorMessage).toBe("Login failed. Invalid username or password");
    }));

    it('should fail with connection error', inject((_$q_:IQService)=> {
      var deferred:IDeferred<any> = _$q_.defer();
      spyOn(authService, 'logIn').and.returnValue(deferred.promise);
      spyOn(ctrl, 'showErrorMessage');
      ctrl.logIn({});
      expect(authService.logIn).toHaveBeenCalled();
      deferred.reject({});
      scope.$digest();

      expect(ctrl.showErrorMessage).toHaveBeenCalled();
      expect(ctrl.errorMessage).toBe("Connection Error");
    }));

  });

});
export class SessionMock implements ISessionService {
  setAuthData(authData:string):void {
  }

  getAuthData():string {
    return null;
  }

  getUsername():string {
    return null;
  }

  destroySession():void {
  }
}
export class AuthMock implements IAuthService {
  authenticate(routeNames:string[], callBack:Function):void {

  }

  logIn(credentials:ICredentials):angular.IPromise<any> {
    return null;
  }

  logOut():angular.IPromise<any> {
    return null;
  }

  isAuthorized():boolean {
    return null;
  }
}
