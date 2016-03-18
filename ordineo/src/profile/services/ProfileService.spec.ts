import 'angular-mocks';
import {ORDINEO_PROFILE} from '../ProfileModule.ts';
import {ProfileService} from "./ProfileService";

describe('Profile service', ()=> {
  beforeEach(angular.mock.module(ORDINEO_PROFILE));

  var profileService:ProfileService;

  beforeEach(inject(()=> {
    var injectorService = angular.injector([ORDINEO_PROFILE]);
    profileService = injectorService.get<ProfileService>(ProfileService.NAME);
  }));


  it('getAboutInfoByUsername should return a promise', ()=> {
    expect(profileService.getAboutInfoByUsername('ryan')).toBeDefined();
  });
});
