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

    beforeEach(()=> {
      ctrl = $controller(AboutDirectiveController);
    });
    it("should have footerButtonLabel equal to more", ()=> {
      expect(ctrl.footerButtonLabel).toBe('more');
    });
    it("should have a default title of about myself", ()=> {
      expect(ctrl.title).toBe('About myself');
    });
    it("should have edit mode disabled", ()=> {
      expect(ctrl.isEditModeEnabled).toBeDefined();
      expect(ctrl.isEditModeEnabled).toBeFalsy();
    });
    it("should not have content loaded", ()=> {
      expect(ctrl.isContentLoaded).toBeFalsy();
    });
    it("should set hasError to false", ()=> {
      expect(ctrl.hasError).toBeFalsy();
    });
    it("should be collapsed", ()=> {
      expect(ctrl.isCollapsed).toBeTruthy();
    });
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
    var deferred:IDeferred<any>;

    beforeEach(()=> {
      deferred = $q.defer();
      bindings = {
        username: 'nivek'
      };
      spyOn(serviceMock, 'getAboutInfoByUsername').and.returnValue(deferred.promise);
      ctrl = $controller(AboutDirectiveController, {$scope: scope}, bindings);
      expect(serviceMock.getAboutInfoByUsername).toHaveBeenCalled();
    });

    describe("and the promise gets resolved", ()=> {
      beforeEach(()=> {
        deferred.resolve(getMockAboutInfo());
        scope.$digest();
      });

      it("should have a short description property which cannot be longer than 365 chars", ()=> {
        expect(ctrl.shortDescription.length).toBeLessThan(367);
      });

      it("should have a short description wich equals the first same 365 characters of the description", ()=> {
        expect(ctrl.shortDescription).toBe(getMockAboutInfo().description.substr(0, 362) + ' ...');
      });

      it('should set isContentLoaded to true', ()=> {
        expect(ctrl.isContentLoaded).toBeTruthy();
      });
      it('should have function equal to designer', ()=> {
        expect(ctrl.functie).toBe('designer');
      });
      it('should have unit equal to jworks', ()=> {
        expect(ctrl.unit).toBe('jworks');
      });
      it('should have matching description ', ()=> {
        expect(ctrl.description).toBe(getMockAboutInfo().description);
      });
    });

    describe("and the promise gets rejected", ()=> {
      beforeEach(()=> {
        deferred.reject();
        scope.$digest();
      });

      it('should set isContentLoaded to false', ()=> {
        expect(ctrl.isContentLoaded).toBeFalsy();
      });

      it('should set hasError to true', ()=> {
        expect(ctrl.hasError).toBeTruthy();
      });
    });
  });

  describe("when onEdit gets called", ()=> {
    beforeEach(()=> {
      ctrl = $controller(AboutDirectiveController);
      ctrl.onEdit();
    });
    it("should set isEditModeEnabled to true ",()=>{
      expect(ctrl.isEditModeEnabled).toBeTruthy();
    });
    it("should store the current about information", ()=> {
      expect(ctrl.aboutInfoCache).toBeDefined();
      expect(ctrl.aboutInfoCache.description).toBe(ctrl.description);
      expect(ctrl.aboutInfoCache.functie).toBe(ctrl.functie);
      expect(ctrl.aboutInfoCache.unit).toBe(ctrl.unit);
    });
  });

  describe("when onButtonClick gets called", ()=> {

  });

  describe("when onCancel gets called", ()=> {
    beforeEach(()=> {
      ctrl = $controller(AboutDirectiveController);
      ctrl.onCancel();
    });
    it("should set isEditModeEnabled to false", ()=> {
      expect(ctrl.isEditModeEnabled).toBeFalsy();
    });
    it("should call the restore function", ()=> {
      spyOn(ctrl, 'restore');
      ctrl.onCancel();
      expect(ctrl.restore).toHaveBeenCalled();
    });
    it("should restore the information",()=>{
      expect(ctrl.description).toBe(ctrl.aboutInfoCache.description);
      expect(ctrl.unit).toBe(ctrl.aboutInfoCache.unit);
      expect(ctrl.functie).toBe(ctrl.aboutInfoCache.functie);
    });
  });

  describe("when onSubmit gets called", ()=> {
    beforeEach(()=> {
      ctrl = $controller(AboutDirectiveController);
      ctrl.onSubmit();
    });

    it("should set edit mode to false", ()=> {
      expect(ctrl.isEditModeEnabled).toBe(false);
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

function getMockAboutInfo():any {
  return {
    function: 'designer',
    unit: {
      name: 'jworks'
    },
    description: `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.
When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then`
  }
}
