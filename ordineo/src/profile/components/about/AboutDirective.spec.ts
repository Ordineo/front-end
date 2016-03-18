import {ORDINEO_PROFILE} from '../../ProfileModule.ts';
import IRootScopeService = angular.IRootScopeService;
import 'angular-mocks'
import ICompileService = angular.ICompileService;
import IHttpBackendService = angular.IHttpBackendService;
import IScope = angular.IScope;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import {IAboutDirective} from "./AboutDirectiveController";
import {AboutDirective} from "./AboutDirective";
import {AboutDirectiveController} from "./AboutDirectiveController";

describe('About directive', ()=> {
  beforeEach(angular.mock.module(ORDINEO_PROFILE));

  var template:string = `<profile-about username="Turbots"></profile-about>`;

  var $compile:ICompileService;
  var $rootScope:IRootScopeService;
  var elm:IAugmentedJQuery;
  var scope:IScope;
  var isolateScope:IScope;
  var ctrl:AboutDirectiveController;
  var controllerAs:string = '$ctrl';

  beforeEach(inject((_$httpBackend_:IHttpBackendService, _$compile_:ICompileService, _$rootScope_:IRootScopeService)=> {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    _$httpBackend_.whenGET(/.svg$/).respond(200, '');
  }));

  beforeEach(()=> {
    scope = $rootScope.$new();
    elm = $compile(template)(scope);
    isolateScope = elm.isolateScope();
    ctrl = isolateScope[controllerAs];
    isolateScope.$digest();
  });

  describe('when the about directive gets created', ()=> {
    it('should have one card header', ()=> {
      expect(elm.find("card-header").length).toBe(1);
    });

    it('should have one card header with a title of About myself', ()=> {

    });

    it('should have one div with class loading-container', ()=> {
      expect(elm.find("div.loading-container").length).toBe(1);
    });

    it('should have one div with class content-container', ()=> {
      expect(elm.find("div.content-container").length).toBe(1);
    });

    it('should hide the content-container', ()=> {
      expect(elm.find("div.content-container").hasClass('ng-hide')).toBeTruthy();
    })
  });

  describe('when the content is loaded', () => {
    beforeEach(()=> {
      ctrl.isContentLoaded = true;
      isolateScope.$digest();
    });
    it('should show the content-container', ()=> {
      expect(elm.find("div.content-container").hasClass('ng-hide')).toBeFalsy();
    });
    it('should hide the loading-container', ()=> {
      expect(elm.find("div.loading-container").hasClass('ng-hide')).toBeTruthy();
    });
  });
});
