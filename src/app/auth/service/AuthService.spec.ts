import {JWORKS_AUTH} from "../AuthModule";
import IProvideService = angular.auto.IProvideService;
import {SessionMock} from "../login/login.spec";
import {IAuthService} from "./AuthService";
import {ISessionService, SessionService} from "./SessionService";
import IRootScopeService = angular.IRootScopeService;
import IQService = angular.IQService;
import IScope = angular.IScope;
import IHttpBackendService = angular.IHttpBackendService;
import {MockRouter} from "../../../../test/mock/MockRouter";
import Router = angular.Router;
import {MainRoute, LoginRoute, DashboardRoute} from "../../app.routes";
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import createSpy = jasmine.createSpy;
import {ProfileRoutes} from "../../profile/ProfileRoutes";

describe("Auth service", ()=> {

  var sessionService:ISessionService;
  var routerMock:Router;
  var $q:IQService;
  var $httpBackend:IHttpBackendService;
  var authService:IAuthService;

  beforeEach(
    angular.mock.module(JWORKS_AUTH, ($provide:IProvideService)=> {
      sessionService = new SessionMock();
      routerMock = new MockRouter();

      $provide.service(SessionService.NAME, ()=>sessionService);
      $provide.service("$rootRouter", ()=>routerMock);
    })
  );

  beforeEach(inject((_$q_:IQService, _$httpBackend_:IHttpBackendService, _authService_:IAuthService)=> {
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    authService = _authService_;
  }));

  describe("logout", ()=> {

    it("should log out", ()=> {
      spyOn(sessionService, "destroySession");
      spyOn(authService, "authenticate");
      authService.logOut();
      expect(sessionService.destroySession).toHaveBeenCalled();
      expect(authService.authenticate).toHaveBeenCalledWith([MainRoute.NAME], null);
    });

  });

  describe("login", ()=> {

    it("should log in", inject(($http)=> {
      spyOn($http, "post");
      var credentials = {username: "mike", password: "sdfsd"};
      authService.logIn(credentials);
      expect($http.post).toHaveBeenCalledWith(GatewayApiService.getAuthApi(), credentials);
    }));

  });

  describe("authenticate", ()=> {

    describe("with callback", ()=>{

      it("should not call spy when route is null and should navigate to loginRoute", ()=> {
        spyOn(routerMock, 'navigate');
        spyOn(authService, "isAuthorized").and.returnValue(false);
        var spy = createSpy("spy");
        authService.authenticate(null, spy);
        expect(routerMock.navigate).toHaveBeenCalledWith([LoginRoute.NAME]);
        expect(spy).not.toHaveBeenCalled();
      });

      it("should route to dashboard when user is authorised and no route parameters are given", ()=> {
        spyOn(routerMock, 'navigate');
        spyOn(authService, "isAuthorized").and.returnValue(true);
        var spy = createSpy("spy");
        authService.authenticate(null, spy);
        expect(routerMock.navigate).toHaveBeenCalledWith([DashboardRoute.NAME]);
        expect(spy).toHaveBeenCalled();
      });

      it("should route to given routes when user is authorised", ()=> {
        spyOn(routerMock, 'navigate');
        spyOn(authService, "isAuthorized").and.returnValue(true);
        var spy = createSpy("spy");
        var routeNames = [DashboardRoute.NAME, ProfileRoutes.MILESTONES];
        authService.authenticate(routeNames, spy);
        expect(routerMock.navigate).toHaveBeenCalledWith(routeNames);
        expect(spy).toHaveBeenCalled();
      });

    });

    describe("without callback", ()=>{

      it("should navigate to loginRoute", ()=> {
        spyOn(routerMock, 'navigate');
        spyOn(authService, "isAuthorized").and.returnValue(false);
        authService.authenticate(null, null);
        expect(routerMock.navigate).toHaveBeenCalledWith([LoginRoute.NAME]);
      });

      it("should route to dashboard when user is authorised and no route parameters are given", ()=> {
        spyOn(routerMock, 'navigate');
        spyOn(authService, "isAuthorized").and.returnValue(true);
        authService.authenticate(null, null);
        expect(routerMock.navigate).toHaveBeenCalledWith([DashboardRoute.NAME]);
      });

      it("should route to given routes when user is authorised", ()=> {
        spyOn(routerMock, 'navigate');
        spyOn(authService, "isAuthorized").and.returnValue(true);
        var routeNames = [DashboardRoute.NAME, ProfileRoutes.MILESTONES];
        authService.authenticate(routeNames, null);
        expect(routerMock.navigate).toHaveBeenCalledWith(routeNames);
      });

    });

    describe("isAuthorized",()=>{

      it("should return false when current username is null", ()=>{
        spyOn(sessionService, "getUsername").and.returnValue(null);
        var result = authService.isAuthorized();
        expect(result).toBe(false);
      });

      it("should return true when current username is not null", ()=>{
        spyOn(sessionService, "getUsername").and.returnValue("user");
        var result = authService.isAuthorized();
        expect(result).toBe(true);
      });
    });

  });
});
