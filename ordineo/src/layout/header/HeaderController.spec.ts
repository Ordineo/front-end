import {HeaderController} from "./HeaderController";
import {ProfileService} from "../../profile/services/ProfileService";
import {ORDINEO_LAYOUT} from "../LayoutModule";
import {HeaderComponent} from "./HeaderComponent";
import IServiceProvider = angular.IServiceProvider;
import IProvideService = angular.auto.IProvideService;
import IRootScopeService = angular.IRootScopeService;
describe("Header controller", ()=> {
  var component:any;
  var $componentController;
  var scope;
  var ctrl:HeaderController;

  var profileService:ProfileService;

  beforeEach(angular.mock.module(ORDINEO_LAYOUT, ($provide:IProvideService)=> {
    profileService = <ProfileService>{};

    $provide.service(ProfileService.NAME, ()=>profileService);
  }));

  beforeEach(inject((_$rootScope_:IRootScopeService,_$componentController_:any)=> {
    scope = _$rootScope_.$new();
    $componentController = _$componentController_;
  }));

  it("should be defined", ()=> {
    ctrl = $componentController(HeaderComponent.NAME, {$scope: scope});
    expect(ctrl).toBeDefined();
  });
});
