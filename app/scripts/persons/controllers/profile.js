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

ProfileCtrl.$inject = ['$scope', '$log', '$window', '$location', 'PersonFactory'];

function ProfileCtrl($scope, $log, $window, $location, PersonFactory) {

  $log.info('ProfileCtrl loaded');
  var reviewer = null;


  if (window.sessionStorage.getItem('logged')) {
    var id = window.sessionStorage.getItem('id');
    var role = window.sessionStorage.getItem('role');

    $scope.isLogged = true;
    PersonFactory.getMyDetails(id).then(function (data, status) {
      $scope.myDetails = data;
    }, function (response) {
      $location.path('login');
    });
  }

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


  $scope.state = false;
  $scope.onChange = function (cbState) {
    if (cbState == false) {
      $scope.mapAddress = $scope.address;
    }
    $scope.state = cbState;
  };
  $scope.initPlaces = function (address) {
    $scope.mapAddress = address;
    $scope.address = address;
  }
}
