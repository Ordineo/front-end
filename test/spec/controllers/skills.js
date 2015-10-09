'use strict';

describe('Controller: SkillsCtrl', function () {

  // load the controller's module
  beforeEach(module('empApp'));

  var $scope, $controller, SkillsCtrl, skillData, SkillFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, _$controller_, _SkillFactory_) {
    $scope = $rootScope.$new();
    $controller = _$controller_;
    SkillFactory = _SkillFactory_;
  }));

  function givenSkillData() {
    skillData = {title: 'test', content: 'This is some dummy content'};
  }


  function whenControllerInitialized() {
    SkillsCtrl = $controller('SkillsCtrl', {
      $scope: $scope
    });
    $scope.$digest();
  }

  it("contains something", function () {
    givenSkillData();
    whenControllerInitialized();


    var s = scope.skills;
    expect(s).toBeDefined();
  })

});

