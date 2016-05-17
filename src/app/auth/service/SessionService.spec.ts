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
    angular.mock.module(ORDINEO_CORE, ($provide:IProvideService)=> { //TODO: check if correct module is used

    })
  );

  beforeEach(inject((_sessionService_:ISessionService, _$window_:IWindowService, _jwtHelper_:any)=> {
    sessionService = _sessionService_;
    $window = _$window_;
    jwtHelper = _jwtHelper_;

    sessionService.setAuthData(null);
  }));

  describe("destroy session", ()=> {

    //TODO: write better tests: don't check if the setAuthData method has been called but check if the session is destroyed
    //TODO: find a way to set the spies without having to use string literals for the methods. This should work even if method names are refactored!
    it("sets the authentication data to null", ()=> {
      spyOn(sessionService, "setAuthData");
      sessionService.destroySession();
      expect(sessionService.setAuthData).toHaveBeenCalledWith(null);
    });

    // it("removed the session from storage", ()=> {
    //   $window.localStorage.getItem(ITEM_TOKEN)
    // })
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
      var authDataInput = "authData";
      sessionService.setAuthData(authDataInput);
      var authDataResult = sessionService.getAuthData();
      expect(authDataResult).toEqual(authDataInput);
    });

    it("should remove authentication data when null is given", ()=> {
      var authDataInput = "authData";
      sessionService.setAuthData(authDataInput);
      var authDataResult = sessionService.getAuthData();
      expect(authDataResult).toEqual(authDataInput); //check if data is added correctly
      sessionService.setAuthData(null);
      authDataResult = sessionService.getAuthData();
      expect(authDataResult).toBe(null); // check if the data is removed after adding it
    });

  });

  describe("getAuthData", ()=> {

    it("should return authentication data when data is set", ()=> {
      var authDataInput = "authData";
      sessionService.setAuthData(authDataInput);
      var authDataResult = sessionService.getAuthData();
      expect(authDataResult).toEqual(authDataInput);
    });

    it("should return null when there is no authentication data", ()=> {
      var result = sessionService.getAuthData();
      expect(result).toBe(null);
    });
  });

});
