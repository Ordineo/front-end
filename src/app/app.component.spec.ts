import "angular";
import "angular-mocks/ngMock";
import {APP_NAME} from "./app.module.ts";

describe("Main App Component", () => {
  // beforeEach(angular.mock.module(APP_NAME, ()=> {
  //
  // }));

  it("app name should be ordineo", () => {
    expect(APP_NAME).toBe("ordineo");
  });
});

// var ctrl:AppComponentController;
// var scope:IScope;
// var authService:IAuthService;

// beforeEach(()=> {
// angular.mock.module(APP_NAME,
//   ($provide:IProvideService)=> {
//     authService = new AuthMock();
//
//     $provide.service(AuthService.NAME, ()=>authService);
//   })
// });

// beforeEach(inject((_$componentController_, _$rootScope_:IRootScopeService)=> {
//   // ctrl = _$componentController_(AppComponent.NAME, {$scope: _$rootScope_.$new()});
// }));
