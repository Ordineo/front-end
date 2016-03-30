import {HeaderController} from "./HeaderController";
import {ProfileService, IProfileService} from "../../profile/services/ProfileService";
import {ORDINEO_LAYOUT} from "../LayoutModule";
import {HeaderComponent} from "./HeaderComponent";
import {MockProfileService} from "../../../test/mock/MockProfileService";
import IServiceProvider = angular.IServiceProvider;
import IProvideService = angular.auto.IProvideService;
import IRootScopeService = angular.IRootScopeService;
import IQService = angular.IQService;
describe("Header controller", ()=> {
  var $componentController;
  var scope;
  var ctrl:HeaderController;

  var profileService:IProfileService;

  beforeEach(angular.mock.module(ORDINEO_LAYOUT, ($provide:IProvideService)=> {
    $provide.service(ProfileService.NAME, ()=>new MockProfileService());
  }));

  beforeEach(inject((_$rootScope_:IRootScopeService,_$componentController_:any)=> {
    scope = _$rootScope_.$new();
    $componentController = _$componentController_;
    // spyOn(profileService,)
    ctrl = $componentController(HeaderComponent.NAME, {$scope: scope});
  }));

  it("should be defined", ()=> {
    expect(ctrl).toBeDefined();
  });

  it("oninit should set users", function () {
    expect(ctrl.users).toBeDefined();
  });
});
