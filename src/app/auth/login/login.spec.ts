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

describe("Login controller", ()=> {
  var scope:IScope;
  var ctrl:LoginController;
  var authService:IAuthService;

  beforeEach(
    angular.mock.module(JWORKS_AUTH,
      ($provide:IProvideService)=> {
        authService = new AuthMock();

        $provide.service(AuthService.NAME, ()=>authService);
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


  it('should login', inject((_$q_:IQService)=> {
    var deferred:IDeferred<any> = _$q_.defer();
    spyOn(ctrl, '$onInit');
    spyOn(authService, 'logIn').and.returnValue(deferred.promise);
    ctrl.logIn({
      email: 'ryan@mail.be',
      password: 'hottentottentettententoonstelling',
      username: 'Rydg'
    });
    expect(authService.logIn).toHaveBeenCalled();
    deferred.resolve({data: {}});
    scope.$digest();
    expect(ctrl.$onInit).toHaveBeenCalled();
  }));

});

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
