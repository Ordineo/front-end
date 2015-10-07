'use strict';

/**
 * @ngdoc overview
 * @name empApp
 * @description
 * # empApp
 *
 * Main module of the application.
 */
angular
  .module('empApp', [
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
    'ngMaterial'
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

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        access: {
          requiresLogin: false

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



          /*roles: function (RoleService, $location) {

            return RoleService.getAll().then(function (data) {
              return data;
            }, function (response) {

              return response.status;
            });

          },
          avroles: function (RoleService) {
            return RoleService.getFunctionalRoles();
          },
          persons: function (PersonFactory) {
            return PersonFactory.getPersonsOfReviewer();
          }*/
        }
      })
      .when('/panel', {
        templateUrl: 'views/panel.html',
        controller: 'PanelCtrl',
        access: {
          requiresLogin: true

        }
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        access: {
          requiresLogin: true
        }
      })
      .when('/persons', {
        templateUrl: 'views/persons.html',
        controller: 'PersonsCtrl',
        access: {
          requiresLogin: true
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
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        access: {
          requiresLogin: true
        }
      })

      .when('/skills', {
        templateUrl: 'views/skills.html',
        controller: 'SkillsCtrl',
        access: {
          requiresLogin: true
        }
      })
      .when('/skillCompetences', {
        templateUrl: 'views/skillCompetences.html',
        controller: 'SkillCompetencesCtrl',
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
          roles: function (RoleService, $location) {

            return RoleService.getAll().then(function (data) {
              return data;
            }, function (response) {

              return response.status;
            });

          },
          avroles: function (RoleService) {
            return RoleService.getFunctionalRoles();
          },
          persons: function (PersonFactory) {
            return PersonFactory.getPersonsOfReviewer();
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

    AuthenticateFactory.initialise(id);


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
