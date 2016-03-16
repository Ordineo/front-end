import 'angular-mocks';
import {ORDINEO_PROFILE} from '../../ProfileModule.ts';
import {AboutDirectiveController} from "./AboutDirectiveController";
import {ProfileService} from "../../services/ProfileService";
import {IProfileService} from "../../services/ProfileService";
import IQService = ng.IQService;

describe('About directive controller', ()=> {
  var serviceMock:IProfileService;
  var ctrl;
  var scope, bindings;

  beforeEach(
    angular.mock.module(ORDINEO_PROFILE,
      ($provide:any, $injector:any)=> {
        serviceMock = <IProfileService>{
          getAboutInfoByUsername: (userName:string)=> {
          },
          getMock: ()=> {
          }
        };
        $provide.service(ProfileService.NAME, ()=>serviceMock)
      }));

  beforeEach(inject((_$rootScope_, _$controller_,_$q_:IQService)=> {
    scope = _$rootScope_;
    bindings = {
      username: 'nivek'
    };
    spyOn(serviceMock, 'getAboutInfoByUsername').and.returnValue(
      _$q_.defer().promise
    );
    ctrl = _$controller_(AboutDirectiveController, {$scope: scope}, bindings);
  }));

  describe("when the directive passes nivek as username", ()=> {
    it('ctrl username property should be nivek', ()=> {
      expect(ctrl.username).toBe('nivek');
      expect(serviceMock.getAboutInfoByUsername).toHaveBeenCalled();
    });
  });
});
