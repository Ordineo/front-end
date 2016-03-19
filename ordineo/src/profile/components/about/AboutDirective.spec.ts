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
import {ButtonState} from "../../../core/labels/ButtonState";

describe('About directive: ', ()=> {
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
    it('should have one card header with a title of About myself', ()=> {
      expect(elm.find("card-header").attr('title')).toBe("About myself");
    });
    it('should show the content-container', ()=> {
      expect(elm.find("div.content-container").hasClass('ng-hide')).toBeFalsy();
    });
    it('should have one div with class about-function', ()=> {
      expect(elm.find("div.about-function").length).toBe(1);
    });
    it('should have one div with class about-unit', ()=> {
      expect(elm.find("div.about-unit").length).toBe(1);
    });
    it('should have one div with class about-gender', ()=> {
      expect(elm.find("div.about-gender").length).toBe(1);
    });
    it('should hide about-gender', ()=> {
      expect(elm.find("div.about-gender").hasClass('ng-hide')).toBeTruthy();
    });
    it('should have one div with class about-start-date', ()=> {
      expect(elm.find("div.about-start-date").length).toBe(1);
    });
    it('should hide about-start-date div', ()=> {
      expect(elm.find("div.about-start-date").hasClass('ng-hide')).toBeTruthy();
    });
    it('should have one div with class about-end-date', ()=> {
      expect(elm.find("div.about-end-date").length).toBe(1);
    });
    it('should hide about-end-date div', ()=> {
      expect(elm.find("div.about-end-date").hasClass('ng-hide')).toBeTruthy();
    });
    it('should hide the loading-container', ()=> {
      expect(elm.find("div.loading-container").hasClass('ng-hide')).toBeTruthy();
    });
    it('should have one div with class about-footer', ()=> {
      expect(elm.find("div.about-footer").length).toBe(1);
    });
    it('should have a button with text "more" inside the about-footer', ()=> {
      var aboutFooter:IAugmentedJQuery = elm.find("div.about-footer");
      expect(aboutFooter.find('.md-button').length).toBe(1);
      expect(aboutFooter.find('.md-button').text()).toBe(ButtonState.MORE);
    });
  });

  describe('The end date section', () => {
    var endDateContainer:IAugmentedJQuery;

    beforeEach(()=> {
      endDateContainer = elm.find("div.about-end-date");
    });

    it("should contain a h4 element with text: End date", ()=> {
      expect(endDateContainer.find('h4').length).toBe(1);
      expect(endDateContainer.find('h4').text()).toBe('End date');
    });
    it("should contain a span element with text equal to ctrl.endDate",()=>{
      ctrl.endDate = "2015-11-01";
      isolateScope.$digest();
      expect(endDateContainer.find('span').length).toBe(1);
      expect(endDateContainer.find('span').text()).toBe(ctrl.endDate);
    });
  });

  describe('when the more button gets clicked', ()=> {
    var button:IAugmentedJQuery;

    beforeEach(()=> {
      button = elm.find('div.about-footer').find('.md-button');
      ctrl.onExpandCollapseButtonClick();
      isolateScope.$digest();
    });

    it('should show about-gender', ()=> {
      expect(elm.find('div.about-gender').hasClass('ng-hide')).toBeFalsy();
    });

    it('should show about-start-date div', ()=> {
      expect(elm.find('div.about-start-date').hasClass('ng-hide')).toBeFalsy();
    });

    it('should show about-end-date div', ()=> {
      expect(elm.find('div.about-end-date').hasClass('ng-hide')).toBeFalsy();
    });

    it('should change the button text from "more" to "collapse"', ()=> {
      expect(button.text()).toBe(ButtonState.COLLAPSE);
    });

    it('should hide about-end-date if end date is empty or null and element is not collapsed.', ()=> {
      ctrl.endDate = null;
      isolateScope.$digest();
      expect(elm.find('div.about-end-date').hasClass('ng-hide')).toBeTruthy();
      ctrl.endDate = '';
      isolateScope.$digest();
      expect(elm.find('div.about-end-date').hasClass('ng-hide')).toBeTruthy();
    });

    describe('when the button gets clicked again', ()=> {
      beforeEach(()=> {
        ctrl.onExpandCollapseButtonClick();
        isolateScope.$digest();
      });

      it('should change the button text from "collapse" to "more"', ()=>{
        expect(button.text()).not.toBe(ButtonState.MORE);
      })
    });
  });
});
