import IProvideService = angular.auto.IProvideService;
import {ORDINEO_CORE} from "../../core/core.module";
import IWindowService = angular.IWindowService;
import {ISessionService} from "./SessionService";
import UndefinedLiteral = hbs.AST.UndefinedLiteral;

describe("Session service", ()=> {

  var sessionService:ISessionService;
  var $window:IWindowService;
  var jwtHelper:any;

  beforeEach(
    angular.mock.module(ORDINEO_CORE)
  );

  beforeEach(inject((_sessionService_:ISessionService, _$window_:IWindowService, _jwtHelper_:any)=> {
    sessionService = _sessionService_;
    $window = _$window_;
    jwtHelper = _jwtHelper_;

    sessionService.setAuthData(null);
  }));

  describe("destroy session", ()=> {

    it("sets the authentication data to null", ()=> {
      spyOn(sessionService, "setAuthData");
      sessionService.destroySession();
      expect(sessionService.setAuthData).toHaveBeenCalledWith(null);
    });

  });

  describe("getUsername", ()=> {

    it("should return null when there is no active session", ()=> {
      var result = sessionService.getUsername();
      expect(result).toBe(null);
    });

    it("should return the username of the current user if there is an active session", ()=> {
      var validToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUZXN0Iiwicm9sZSI6IltST0xFX1VTRVIsIFJPTEVfQURNSU5dIiwiY3JlYXRlZCI6MTQ2MzQ4NDIzNjMyNSwiZXhwIjoxNDY0MDg5MDM2fQ.4Jw7tETk8Y5YAAJZvLpSrf1HizfWAIO3FO-k6lpsStzUWp6ah66xi7IzFiLgT-IWB1pbN6bG4yWQ8HyWX1jpYg";
      sessionService.setAuthData(validToken);
      var username = sessionService.getUsername();
      expect(username).toBe("Test");
    });

  });

  describe("setAuthData", ()=> {

    it("should set the given authentication data", ()=> {
      addAndTestAuthData(sessionService);
    });

    it("should remove authentication data when null is given", ()=> {
      addAndTestAuthData(sessionService); //check if data is added correctly
      sessionService.setAuthData(null);
      var authDataResult = sessionService.getAuthData();
      expect(authDataResult).toBe(null); // check if the data is removed after adding it
    });

  });

  describe("getAuthData", ()=> {

    it("should return authentication data when data is set", ()=> {
      addAndTestAuthData(sessionService);
    });

    it("should return null when there is no authentication data", ()=> {
      var result = sessionService.getAuthData();
      expect(result).toBe(null);
    });

  });

  function addAndTestAuthData(sessionService:ISessionService) {
    var authDataInput = "authData";
    sessionService.setAuthData(authDataInput);
    var authDataResult = sessionService.getAuthData();
    expect(authDataResult).toEqual(authDataInput);
  }

});
