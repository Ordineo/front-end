import 'angular';
import 'angular-mocks';
import {ComponentTest} from '../../../util/ComponentTest'
import {AboutDirectiveController} from "./AboutDirectiveController"
import 'phantomjs-polyfill';
import {APP_NAME} from "../../../app.module";

describe('Component AboutDirective', () => {
  var directiveTest:ComponentTest<AboutDirectiveController>;
  beforeEach(angular.mock.module(APP_NAME));

  beforeEach(() => {
    directiveTest = new ComponentTest<AboutDirectiveController>('<profile-about description="descr" unit="jworks" functie="developer"></profile-about>', 'profile-about');
  });

  beforeEach(inject(function (_$httpBackend_) {
    _$httpBackend_.whenGET(/.svg$/).respond(200, '');
  }));

  describe('the passed description is "descr"', () => {
    it('should set the default description value to "descr"', () => {
      var attributes:any = {
        description: 'descr',
        unit: 'jworks',
        functie: 'developer'
      };

      var vm:AboutDirectiveController = directiveTest.createComponent(attributes);
      expect(vm.description).toBe('descr');
    });
  })
});
