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
  var $q:IQService;
  var scope:IScope;
  var rootScope:IRootScopeService;
  var user:string;
  var ctrl:HeaderController;

  var profileService:IProfileService;

  beforeEach(angular.mock.module(ORDINEO_LAYOUT, ($provide:IProvideService)=> {
    $provide.service(ProfileService.NAME, ()=>new MockProfileService());
  }));

  beforeEach(inject((_$q_:IQService,_$rootScope_:IRootScopeService, _$componentController_:any, _ordineoProfileService_:ProfileService)=> {
    $q = _$q_;
    rootScope = _$rootScope_;
    scope = _$rootScope_.$new();
    $componentController = _$componentController_;
    profileService = _ordineoProfileService_;
    ctrl = $componentController(HeaderComponent.NAME, {$scope: scope});
  }));

  it('should call get employees from service when controller lifecycle method onInit is called.', ()=> {
    givenSpyOnGetAllEmployeesFromProfileService();
    whenOnInitIsCalled();
    expect(profileService.getAllEmployees).toHaveBeenCalled();
  });

  it('should not broadcast event when user null', ()=> {
    givenUser(null);
    givenSpyOnBroadcast();
    whenSelectedItemChangeIsCalled();
    expect(rootScope.$broadcast).not.toHaveBeenCalled();
  });

  it('should broadcast event when user is not null', ()=> {
    givenUser("ryan");
    givenSpyOnBroadcast();
    whenSelectedItemChangeIsCalled();
    expect(rootScope.$broadcast).toHaveBeenCalled();
  });

  function whenOnInitIsCalled(){
    ctrl.$onInit();
  }

  function givenSpyOnGetAllEmployeesFromProfileService(){
    var defer = $q.defer();
    var promise = defer.promise;
    spyOn(profileService, 'getAllEmployees').and.returnValue(promise);
  }

  function givenUser(_user_:string):void {
    user = _user_;
  }

  function givenSpyOnBroadcast():void {
    spyOn(rootScope, '$broadcast');
  }

  function whenSelectedItemChangeIsCalled():void {
    ctrl.selectedItemChange(user);
  }
});
