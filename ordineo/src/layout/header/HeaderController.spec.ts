import {HeaderController} from "./HeaderController";
import {ProfileService, IProfileService} from "../../profile/services/ProfileService";
import {ORDINEO_LAYOUT} from "../LayoutModule";
import {HeaderComponent} from "./HeaderComponent";
import {MockProfileService} from "../../../test/mock/MockProfileService";
import IServiceProvider = angular.IServiceProvider;
import IProvideService = angular.auto.IProvideService;
import IRootScopeService = angular.IRootScopeService;
import IQService = angular.IQService;
import IScope = angular.IScope;
describe("Header controller", ()=> {
  var $componentController;
  var scope:IScope;
  var rootScope:IRootScopeService;
  var user:string;
  var ctrl:HeaderController;

  var profileService:IProfileService;

  beforeEach(angular.mock.module(ORDINEO_LAYOUT, ($provide:IProvideService)=> {
    $provide.service(ProfileService.NAME, ()=>new MockProfileService());
  }));

  beforeEach(inject((_$rootScope_:IRootScopeService,_$componentController_:any)=> {
    rootScope = _$rootScope_;
    scope = _$rootScope_.$new();
    $componentController = _$componentController_;
    // spyOn(profileService,)
    ctrl = $componentController(HeaderComponent.NAME, {$scope: scope});
  }));

  it('should not broadcast event when user null', ()=> {
    givenUser(null);
    givenSpyOnBroadcast();
    whenSelectedItemIsCalled();
    expect(rootScope.$broadcast).not.toHaveBeenCalled();
  });

  it('should broadcast event when user is not null', ()=> {
    givenUser("ryan");
    givenSpyOnBroadcast();
    whenSelectedItemIsCalled();
    expect(rootScope.$broadcast).toHaveBeenCalled();
  });

  function givenUser(_user_:string):void{
    user = _user_;
  }
  function givenSpyOnBroadcast():void{
    spyOn(rootScope, '$broadcast');
  }
  function whenSelectedItemIsCalled():void{
    ctrl.selectedItemChange(user);
  }
});
