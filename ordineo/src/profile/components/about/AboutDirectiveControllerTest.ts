import 'angular-mocks';
import {ORDINEO_PROFILE} from '../../ProfileModule.ts';
import {AboutDirectiveController} from "./AboutDirectiveController";

describe('About directive controller', ()=> {
  beforeEach(angular.mock.module(ORDINEO_PROFILE));

  var ctrl, scope, bindings;

  beforeEach(inject((_$rootScope_, _$controller_)=>{
    scope = _$rootScope_.$new();
    bindings = {};
    ctrl = _$controller_(AboutDirectiveController,{$scope:scope},bindings);
  }));

  it('')
});
