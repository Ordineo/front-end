import 'angular-mocks';
import {ORDINEO_PROFILE} from '../../ProfileModule.ts';
import {AboutDirectiveController} from "./AboutDirectiveController";
import {ProfileService} from "../../services/ProfileService";
import {IProfileService} from "../../services/ProfileService";
import IQService = ng.IQService;
import {MockProfileService} from "../../../../test/mock/MockProfileService";
import IProvideService = angular.auto.IProvideService;
import IControllerService = angular.IControllerService;
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import IDeferred = angular.IDeferred;

describe('About directive controller', ()=> {
  var $controller:IControllerService, $q:IQService, $rootScope:IRootScopeService;
  var serviceMock:IProfileService;
  var ctrl:AboutDirectiveController;
  var scope:IScope, bindings:any;

  beforeEach(angular.mock.module(ORDINEO_PROFILE,
    ($provide:IProvideService)=> {
      serviceMock = new MockProfileService();
      $provide.service(ProfileService.NAME, ()=>serviceMock);
    }));

  beforeEach(inject((_$controller_:IControllerService, _$q_:IQService, _$rootScope_:IRootScopeService)=> {
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
  }));

  describe("When the controller gets instantiated for the first time", ()=> {
    it("should have edit mode disabled", ()=> {
      ctrl = $controller(AboutDirectiveController);
      expect(ctrl.isEditModeEnabled).toBeFalsy();
    });
    it("should not have content loaded", ()=> {
      expect(ctrl.isContentLoaded).toBeFalsy();
    })
  });

  describe("when username gets binded to a value", ()=> {
    var userNameValue = 'nivek';

    beforeEach(()=> {
      bindings = {
        username: userNameValue
      };
      spyOn(serviceMock, 'getAboutInfoByUsername').and.returnValue(
        $q.defer().promise
      );
      ctrl = $controller(AboutDirectiveController, {$scope: scope}, bindings);
    });

    it('ctrl username property should be equal to the value', ()=> {
      expect(ctrl.username).toBe(userNameValue);
    });

    it('the controller should fetch data from the profile service', ()=> {
      expect(serviceMock.getAboutInfoByUsername).toHaveBeenCalled();
    });
  });

  describe("when the data is fetched from the remote service", ()=> {
    beforeEach(()=> {
      var deferred:IDeferred<any> = $q.defer();
      bindings = {
        username: 'nivek'
      };
      spyOn(serviceMock, 'getAboutInfoByUsername').and.returnValue(deferred.promise);

      ctrl = $controller(AboutDirectiveController, {$scope: scope}, bindings);

      expect(serviceMock.getAboutInfoByUsername).toHaveBeenCalled();

      deferred.resolve({
        function: 'designer',
        unit: {
          name: 'jworks'
        },
        description: 'hey'
      });
      scope.$digest();
    });

    it('should have content loaded', ()=> {
      expect(ctrl.isContentLoaded).toBeTruthy();
    });
    it('should have function equal to designer', ()=> {
      expect(ctrl.functie).toBe('designer');
    });
    it('should have unit equal to jworks', ()=> {
      expect(ctrl.unit).toBe('jworks');
    });
    it('should have description equal to hey', ()=> {
      expect(ctrl.description).toBe('hey');
    });
  });

  describe("when username does not get binded", ()=> {
    beforeEach(inject((_$rootScope_, _$controller_, _$q_:IQService)=> {
      bindings = {};
      spyOn(serviceMock, 'getAboutInfoByUsername').and.returnValue(
        _$q_.defer().promise
      );
      ctrl = _$controller_(AboutDirectiveController, {$scope: scope}, bindings);
    }));

    it('the controller should make no call to the profile service', ()=> {
      expect(serviceMock.getAboutInfoByUsername).not.toHaveBeenCalled();
    })
  })
});
