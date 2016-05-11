//   import {HeaderController, User} from "./HeaderController";
// import {ProfileService, IProfileService} from "../../profile/services/ProfileService";
// import {ORDINEO_LAYOUT} from "../LayoutModule";
// import {HeaderComponent} from "./HeaderComponent";
// import IServiceProvider = angular.IServiceProvider;
// import IProvideService = angular.auto.IProvideService;
// import IRootScopeService = angular.IRootScopeService;
// import IQService = angular.IQService;
// import IScope = angular.IScope;
// import IDeferred = angular.IDeferred;
// import IPromise = angular.IPromise;
// import {Employee} from "../../core/models/employee";
// import {MockProfileService} from "../../../../test/mock/MockProfileService";
//   import {ProfileSearchController} from "./ProfileSearchController";
//
// describe("Profile search controller", ()=> {
//   var $componentController;
//   var $q:IQService;
//   var scope:IScope;
//   var defer:IDeferred<any>;
//   var promise:IPromise<any>;
//   var rootScope:IRootScopeService;
//   var user:User;
//   var ctrl:ProfileSearchController;
//
//   var profileService:IProfileService;
//
//   beforeEach(angular.mock.module(ORDINEO_LAYOUT, ($provide:IProvideService)=> {
//     $provide.service(ProfileService.NAME, ()=>new MockProfileService());
//   }));
//
//   beforeEach(inject((_$q_:IQService, _$rootScope_:IRootScopeService, _$componentController_:any, _ordineoProfileService_:ProfileService)=> {
//     $q = _$q_;
//     rootScope = _$rootScope_;
//     scope = _$rootScope_.$new();
//     $componentController = _$componentController_;
//     profileService = _ordineoProfileService_;
//     ctrl = $componentController(HeaderComponent.NAME, {$scope: scope});
//   }));
//
//   it('should call get employees from service when controller lifecycle method onInit is called.', ()=> {
//     givenSpyOnGetAllEmployeesFromProfileService();
//     whenOnInitIsCalled();
//     expect(profileService.getAllEmployees).toHaveBeenCalled();
//   });
//
//   it('should set users when getAllEmployees gets resolved', ()=> {
//     givenSpyOnGetAllEmployeesFromProfileService();
//     expect(ctrl.users).toBeUndefined();
//     whenOnInitIsCalled();
//     whenGetAllEmployeesPromiseGetsResolved();
//     expect(ctrl.users).toBeDefined();
//   });
//
//   it('should not broadcast event when user null', ()=> {
//     givenUser(null);
//     givenSpyOnBroadcast();
//     whenSelectedItemChangeIsCalled();
//     expect(rootScope.$broadcast).not.toHaveBeenCalled();
//   });
//
//   it('should broadcast event when user is not null', ()=> {
//     givenUser({display:'ryan',value:'Ryde'});
//
//     givenSpyOnBroadcast();
//     whenSelectedItemChangeIsCalled();
//     expect(rootScope.$broadcast).toHaveBeenCalled();
//   });
//
//   function whenGetAllEmployeesPromiseGetsResolved() {
//     defer.resolve(getMockEmployees());
//     scope.$digest();
//   }
//
//   function whenOnInitIsCalled() {
//     ctrl.$onInit();
//   }
//
//   function givenSpyOnGetAllEmployeesFromProfileService() {
//     defer = $q.defer();
//     promise = defer.promise;
//     spyOn(profileService, 'getAllEmployees').and.returnValue(promise);
//   }
//
//   function givenUser(_user_:User):void {
//     user = _user_;
//   }
//
//   function givenSpyOnBroadcast():void {
//     spyOn(rootScope, '$broadcast');
//   }
//
//   function whenSelectedItemChangeIsCalled():void {
//     ctrl.selectedItemChange(user);
//   }
//
//   function getMockEmployees():Array<Employee> {
//     return [
//       {
//         username: "Nivek",
//         firstName: "Gina",
//         lastName: "De Beukelaer",
//         linkedin: "https://www.linkedin.com/in/gina-de-beukelaer-076ba2117",
//         email: "kevin@gmail.com",
//         phoneNumber: "047637287",
//         function: "Java Developer at Ordina Belgium",
//         unit: "JWorks",
//         gender: "FEMALE",
//         birthDate: "1992-07-25",
//         hireDate: "2015-08-03",
//         startDate: "2016-03-24",
//         resignationDate: null,
//         description: null
//       },
//       {
//         username: "Turbots",
//         firstName: "Dieter",
//         lastName: "Hubau",
//         linkedin: "",
//         email: "dieter@gmail.com",
//         phoneNumber: "047637283",
//         function: "Competence Leader Cloud",
//         unit: "JWorks",
//         gender: "MALE",
//         birthDate: "1987-04-15",
//         hireDate: "2010-08-03",
//         startDate: "2010-11-01",
//         resignationDate: null,
//         description: "I AM AWESOME",
//       }
//     ]
//   }
// });
