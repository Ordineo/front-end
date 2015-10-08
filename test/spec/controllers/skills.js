'use strict';

describe('Controller: SkillsCtrl', function () {

  // load the controller's module
  beforeEach(module('empApp'));

  var $scope, $controller, $q, SkillsCtrl, skillData, SkillFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, _$controller_, _$q_, _SkillFactory_) {
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $q = _$q_;
    SkillFactory = _SkillFactory_;
  }));

  function givenSkillData() {
    skillData = {title: 'test', content: 'This is some dummy content'};
  }

  function givenSpyOnSkillService() {
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
    givenSpyOnSkillService();
    whenControllerInitialized();


    var s = scope.skills;
    expect(s).toBeDefined();
  })

});

