'use strict';

describe('Controller: SkillsCtrl', function () {

  // load the controller's module
  beforeEach(module('empApp'));

  var $scope, $controller, SkillsCtrl, skillData, SkillFactory, $q;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, _$controller_, _$q_, _SkillFactory_) {
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $q = _$q_;
    SkillFactory = _SkillFactory_;
  }));

  function givenSkillData() {
    skillData = {skills: 'This is some dummy content'};
  }

  function givenSpyOnAboutService() {
    var deferred = $q.defer();
    deferred.resolve(skillData);
    spyOn(SkillFactory, 'all').and.returnValue(deferred.promise);
  }


  function whenControllerInitialized() {
    SkillsCtrl = $controller('SkillsCtrl', {
      $scope: $scope
    });
    $scope.$digest();
  }

  it("contains something", function () {
    givenSkillData();
    givenSpyOnAboutService();
    whenControllerInitialized();


    var s = $scope.skills;
    expect(s).toBeDefined();
  })

});

