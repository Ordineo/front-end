'use strict';

/**
 * @ngdoc overview
 * @name oraj360
 * @description
 * # oraj360
 *
 * Main module of the application.
 */
angular
  .module('oraj360', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'restangular',
    'ngMaterial',
    'md.data.table',
    'ngMdIcons'
    //'ngRoleAuth'
  ])
  .config(['$httpProvider', function ($httpProvider) {

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

  }
  ])
  .config(function ($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        access: {
          requiresLogin: false

        }
      })
      .when(("/search/:otherId"), {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        access: {
          requiresLogin: true
        }
      })
      .when('/persons', {
        templateUrl: 'views/persons.html',
        controller: 'ManagementCtrl',
        access: {
          requiresLogin: true
        },
        resolve: {
          persons: function (PersonFactory) {
            return PersonFactory.getPersonsOfReviewer().then(function (data) {
                if (data != null) {
                  return data;
                }
              },
              function (response) {
                return response;
              });
          },
          person: function (PersonFactory) {
            return PersonFactory.getMyDetails();
          }
        }


      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        access: {
          requiresLogin: true
        }
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        access: {
          requiresLogin: true
        },
        resolve: {
          //Code here
        }
      })
      .when('/panel', {
        templateUrl: 'views/panel.html',
        controller: 'PanelCtrl',
        access: {
          requiresLogin: true

        },
        resolve: {
          myPersons: function (PersonFactory) {
            return PersonFactory.getPersonsOfReviewer();
          },
          persons: function (PersonFactory) {
            return PersonFactory.getAll();
          },
          person: function (PersonFactory) {
            return PersonFactory.getMyDetails();
          }
        }
      })
      .when('/customers', {
        templateUrl: 'views/customers.html',
        controller: 'CustomersCtrl',
        access: {
          requiresLogin: true
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        access: {
          requiresLogin: true
        }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'PersonsCtrl',
        access: {
          requiresLogin: false
        }
      })
      .when('/skills', {
        templateUrl: 'views/skills.html',
        controller: 'SkillsCtrl',
        access: {
          requiresLogin: true
        }
      })
      .when('/roles', {
        templateUrl: 'views/roles.html',
        controller: 'RoleCtrl',
        access: {
          requiresLogin: true
        },
        resolve: {
          roles: function (RoleService) {
            return RoleService.getAll().then(function (data) {
              return data;
            }, function (response) {

              return response.status;
            });

          },
          avroles: function (RoleService) {
            return RoleService.getFunctionalRoles().then(function (data) {
              return data;
            }, function (response) {
              return response.status;
            });
          },
          persons: function (PersonFactory) {
            return PersonFactory.getPersonsOfReviewer().then(function (data) {
              return data;
            }, function (response) {
              return response.status;
            });
          }
        }



        // authorized: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $location, AuthenticateFactory) {
    var id = window.sessionStorage.getItem('id');
    console.log(id);
    if (id === null) {
      $location.path('/login');
    } else {
      AuthenticateFactory.initialise(id);
    }

    // Redirect to '/' if the role is not 'not_confirmed'
    $rootScope.$on('$routeChangeStart', function (event, next) {

      if (next.access === undefined) {
        $location.path('/login');
      } else {
        var authorised = next.access.requiresLogin;
        console.log(next.access.requiresLogin);


        if (authorised && AuthenticateFactory.isAuthorized()) {
          console.log('passing through');
          $location.path(next.templateurl);
        } else {
          $location.path(next.templateurl);
        }
      }

    });

  });
