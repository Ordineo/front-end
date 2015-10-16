'use strict';

/**
 * @ngdoc function
 * @name oraj360.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the oraj360
 */
angular.module('oraj360')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', '$modal', '$log', '$http', '$location', 'dataservice', 'PersonFactory', 'SkillFactory', 'SkillCompetenceFactory'];

function ProfileCtrl($scope, $modal, $log, $http, $location, dataservice, PersonFactory, SkillFactory, SkillCompetenceFactory) {
  $log.info('ProfileCtrl loaded');

  //----------
  //Dummy data
  //----------

  $scope.aLittleAboutMe = {
    intro: 'Lester is a highly motivated person with strong interest in IT. During his education, he specialized in web technologies such as html/css, javascript, PHP and ASP.NET. As a developer, he is passionately engaged and combines his technical skills with clear communication between everyone he interacts with.',
    jobs: 'Together with his day job as a Microsoft software consultant, Lester is also an active member of Ordina Competence Centers about ALM, web and soft skills.',
    address: {
      street: 'Oudenaardsesteenweg',
      streetNumber: 407,
      zipCode: '9420',
      city: 'Mere',
      country: 'Belgium'
    },
    contactInformation: {
      twitter: '@ellesso',
      skype: 'lester.lievens',
      windowsLiveMessenger: 'lester.lievens@telenet.be',
      googleTalk: 'lievens.lester@gmail.com'
    },
    website: 'http://lesterlievens.be',
    birthDate: '1989-07-24',
    children: 1
  };

  $scope.certificates = [
    {
      description: 'Prince2 Foundation',
      image: 'http://lorempixel.com/80/80/'
    },
    {
      description: 'Programming in HTML5, JavaScript, CSS3',
      image: 'http://lorempixel.com/80/80/'
    },
    {
      description: 'Developing ASP.NET MVC Web Applications',
      image: 'http://lorempixel.com/80/80/'
    },
    {
      description: 'Prince2 Foundation',
      image: 'http://lorempixel.com/80/80/'
    },
    {
      description: 'Programming in HTML5, JavaScript, CSS3',
      image: 'http://lorempixel.com/80/80/'
    },
    {
      description: 'Developing ASP.NET MVC Web Applications',
      image: 'http://lorempixel.com/80/80/'
    },
    {
      description: 'Prince2 Foundation',
      image: 'http://lorempixel.com/80/80/'
    },
    {
      description: 'Programming in HTML5, JavaScript, CSS3',
      image: 'http://lorempixel.com/80/80/'
    },
    {
      description: 'Developing ASP.NET MVC Web Applications',
      image: 'http://lorempixel.com/80/80/'
    }
  ];

  $scope.interests = [
    {
      description: 'Microsoft'
    },
    {
      description: '.NET'
    },
    {
      description: 'Sales'
    },
    {
      description: 'MVC'
    },
    {
      description: 'Fishing'
    },
    {
      description: 'CSS'
    },
    {
      description: 'Soccer'
    },
    {
      description: 'HTML5'
    },
    {
      description: 'Java'
    },
    {
      description: 'jQuery'
    },
    {
      description: 'SQL'
    },
    {
      description: 'Matlab'
    },
    {
      description: 'Marketing'
    },
    {
      description: 'Eclipse'
    },
    {
      description: 'Agile'
    },
    {
      description: 'SOAPUI'
    }
  ];

  $scope.dailyRoute = {
    route: {
      departure: $scope.aLittleAboutMe.address.city,
      arrival: 'Antwerpen'
    },
    customer: {
      name: 'Digipolis Antwerpen',
      address: {
        street: 'Generaal Armstrongweg',
        streetNumber: 1,
        zipCode: '2020',
        city: 'Antwerpen'
      }
    },
    workingHours: {
      begin: {
        hours: 8,
        minutes: 0
      },
      end: {
        hours: 17,
        minutes: 0
      }
    },
    travel: {
      distance: 71,
      duration: {
        hours: 0,
        minutes: 50
      }
    }
  };

  //----
  //Vars
  //----

  var reviewer = window.sessionStorage.getItem('reviewer');
  var bum = 'Bum';
  var resourceManager = 'Resource Manager';
  var competenceLeader = 'Competence Leader';
  var practiceManager = 'Practice Manager';
  var coach = 'Coach';
  var consultant = 'Consultant';
  var seniorConsultant = 'Senior Consultant';

  //----------
  //Details
  //----------

  PersonFactory.getMyDetails(null).then(function(data, status) {
    $scope.myDetails = data;
  });

  //-----
  //Roles
  //-----

  PersonFactory.getMyFunctionalRoles(null).then(function(data, status) {
    $scope.myFunctionalRoles = data;
  });

  //---------
  //Customers
  //---------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasCustomers = true;
          PersonFactory.getMyCustomers(null).then(function(data, status) {
            $scope.myCustomers = data;
          });
          break;
  }

  //----------------------
  //Business unit managers
  //----------------------

  switch (reviewer) {
    case competenceLeader:
    case practiceManager:
    case coach:
    case consultant:
    case seniorConsultant:
          $scope.hasBusinessUnitManagers = true;
          PersonFactory.getMyBusinessUnitManagers(null).then(function(data, status) {
            $scope.myBusinessUnitManagers = data;
          });
          break;
  }

  //------------------
  //Competence leaders
  //------------------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasCompetenceLeaders = true;
          PersonFactory.getMyCompetenceLeaders(null).then(function(data, status) {
            $scope.myCompetenceLeaders = data;
          });
          break;
  }

  //-----------------
  //Practice managers
  //-----------------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasPracticeManagers = true;
          PersonFactory.getMyPracticeManagers(null).then(function(data, status) {
            $scope.myPracticeManagers = data;
          });
          break;
  }

  //-------
  //Coaches
  //-------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasCoaches = true;
          PersonFactory.getMyCoaches(null).then(function(data, status) {
            $scope.myCoaches = data;
          });
          break;
  }

  //-----------
  //Descendants
  //-----------

  switch (reviewer) {
    case bum:
    case resourceManager:
    case competenceLeader:
    case practiceManager:
    case coach:
          $scope.hasDescendants = true;
          PersonFactory.getPersonsOfReviewer().then(function(data, status) {
            $scope.myDescendants = data;
          });
          break;
  }

  //-----------
  //Credentials
  //-----------

  $scope.modalPasswordChange = function() {
    $scope.modal = $modal.open({
      animation: false,
      templateUrl: 'passwordChangeModalContent',
      controller: 'SettingsCtrl',
      size: 'sm',
      scope: $scope
    });
    $scope.modal.result.then(function (message) {
      $log.info(message);
    }, function() {
      $log.info('Modal dismissed');
    });

    $scope.cancelModal = function()  {
      $scope.modal.dismiss('cancel');
    };
  };

  $scope.changePassword = function(password) {
    var id = window.sessionStorage.getItem("id");
    var userData  = {
      'oldPassword' : password.oldPassword,
      'newPassword' : password.newPassword
    };

    $scope.passwordChanged = false;
    $scope.passwordWrong = false;

    var handleSuccess = function(data) {
      $log.info("Password changed");
      $scope.passwordChanged = true;

      $timeout(function() {
        $scope.modal.close();
      }, 1500);
    };
    var handleError = function() {
      $log.info("Current password not correct");
      $scope.passwordWrong = true;
    };

    dataservice.postItem('POST', 'http://localhost:9900/api/persons/' + id + '/settings/resetPassword', userData, 'application/json').success(handleSuccess).error(handleError);
  }
}
