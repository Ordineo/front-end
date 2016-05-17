import IProvideService = angular.auto.IProvideService;
import {ORDINEO_CORE} from "../../core/core.module";
import IWindowService = angular.IWindowService;
import {ISessionService} from "./SessionService";

describe("Session service", ()=> {

  var sessionService:ISessionService;
  var $window:IWindowService;
  var jwtHelper:any;

  beforeEach(
    angular.mock.module(ORDINEO_CORE, ($provide:IProvideService)=> { //TODO: check if correct module is used


    })
  );

  //  static $inject = ['$window', 'jwtHelper'];
  beforeEach(inject((_sessionService_:ISessionService, _$window_:IWindowService, _jwtHelper_:any)=> {
    sessionService = _sessionService_;
    $window = _$window_;
    jwtHelper = _jwtHelper_;
  }));

  describe("destroy session", ()=> {

    //TODO: write better tests: don't check if the setAuthData method has been called but check if the session is destroyed
    //TODO: find a way to set the spies withouth aving to use string literals for the methods. This should work even if method names are refactored!
    it("sets the authentication data to null", ()=> {
      spyOn(sessionService, "setAuthData");
      sessionService.destroySession();
      expect(sessionService.setAuthData).toHaveBeenCalledWith(null);
    });
  });

});
