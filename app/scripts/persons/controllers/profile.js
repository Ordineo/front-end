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

ProfileCtrl.$inject = ['$scope', '$window', '$modal', '$log', '$http', '$location', 'dataservice', 'PersonFactory', 'SkillFactory', 'SkillCompetenceFactory', '$mdDialog'];

function ProfileCtrl($scope, $window, $modal, $log, $http, $location, dataservice, PersonFactory, SkillFactory, SkillCompetenceFactory, $mdDialog) {
  $log.info('ProfileCtrl loaded');
  var reviewer = null;

  //----------
  //Dummy data
  //----------

  $scope.skillset = [
    {
      description: 'HTML5',
      points: 35
    },
    {
      description: '.NET 3.5',
      points: 11
    },
    {
      description: 'SCRUM',
      points: 4
    },
    {
      description: 'Google analytics',
      points: 22
    },
    {
      description: 'CSS3',
      points: 29
    },
    {
      description: 'jQuery',
      points: 22
    },
    {
      description: 'Presentations',
      points: 2
    },
    {
      description: 'HTML5',
      points: 35
    },
    {
      description: '.NET 3.5',
      points: 11
    },
    {
      description: 'SCRUM',
      points: 4
    },
    {
      description: 'Google analytics',
      points: 22
    },
    {
      description: 'CSS3',
      points: 29
    },
    {
      description: 'jQuery',
      points: 22
    },
    {
      description: 'Presentations',
      points: 2
    }
  ];
  $window.skillset = $scope.skillset;

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
    workplace: {
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
    }
  };

  //Last new person images must be pushed in front of array 'persons'
  $scope.endorsements = [
    {
      description: 'Inspiring',
      counter: 16,
      persons: [
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        }
      ]
    },
    {
      description: 'Accessible',
      counter: 15,
      persons: [
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        }
      ]
    },
    {
      description: 'Active',
      counter: 13,
      persons: [
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        }
      ]
    },
    {
      description: 'Action-Oriented',
      counter: 12,
      persons: [
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        }
      ]
    },
    {
      description: 'Smart',
      counter: 11,
      persons: [
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        }
      ]
    },
    {
      description: 'Confident',
      counter: 9,
      persons: [
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        }
      ]
    },
    {
      description: 'Brings a smile',
      counter: 8,
      persons: [
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        }
      ]
    },
    {
      description: 'Entrepreneurial',
      counter: 6,
      persons: [
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        }
      ]
    },
    {
      description: 'CSS',
      counter: 5,
      persons: [
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        },
        {
          image: 'http://lorempixel.com/20/20/'
        }
      ]
    }
  ];
  $window.endorsements = $scope.endorsements;

  //----
  //Vars
  //----

  var reviewer = window.sessionStorage.getItem('reviewer');
  if (window.sessionStorage.getItem('logged')) {
    console.log('auaauau');
    $scope.isLogged = true;
  }

  var id = window.sessionStorage.getItem('id');
  var role = window.sessionStorage.getItem('role');
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

  PersonFactory.getMyDetails(id).then(function (data, status) {
    $scope.myDetails = data;
  }, function (response) {
    $location.path('login');
  });

  //-----
  //Roles
  //-----
  /*
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

   //-----------------
   //Skill competences
   //-----------------

   var personId = window.sessionStorage.getItem('id');
   updateList();

   $scope.save = function (skillCompetence) {
   console.log('Adding Skill Competence to current user');
   skillCompetence.skill = skillCompetence.skill._links.self.href;
   skillCompetence.person = personId;
   SkillCompetenceFactory.add(skillCompetence, updateList);
   $scope.skillCompetence = null;
   };

   $scope.remove = function (href) {
   SkillCompetenceFactory.remove(href, updateList);
   };

   SkillFactory.getSkills(function (response) {
   $scope.skills = response.data._embedded.skills;
   });

   PersonFactory.getPersonById().then(function (data) {
   $scope.person = data;
   });

   function updateList() {
   $scope.skillCompetences = SkillCompetenceFactory.getSkillCompetenceForPersonId(personId);
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
   */

  $scope.state = false;
  $scope.onChange = function(cbState) {
    if (cbState == false) {
      $scope.mapAddress = $scope.address;
    }
    $scope.state = cbState;
  };
  $scope.initPlaces = function(address) {
    $scope.mapAddress = address;
    $scope.address = address;
  }
}
