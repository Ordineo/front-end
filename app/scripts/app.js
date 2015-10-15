(function () {
  'use strict';

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
          templateUrl: 'views/about.html'
        })
        .when('/about', {
          templateUrl: 'views/about.html'
        })
        .when(("/search/:otherId"), {
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl'
        })
        .when('/persons', {
          templateUrl: 'views/persons.html',
          controller: 'ManagementCtrl',
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
          controller: 'DashboardCtrl'
        })
        .when('/profile', {
          templateUrl: 'views/profile.html',
          controller: 'ProfileCtrl'
        })
        .when('/panel', {
          templateUrl: 'views/panel.html',
          controller: 'PanelCtrl',
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
          controller: 'CustomersCtrl'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          access: {
            requiresLogin: false
          }
        })
        .when('/register', {
          templateUrl: 'views/register.html',
          controller: 'RegisterCtrl',
          access: {
            requiresLogin: false,
            isRegister: true
          }
        })
        .when('/unit', {
          templateUrl: 'views/unit.html'
        })
        .when('/roles', {
          templateUrl: 'views/roles.html',
          controller: 'RoleCtrl',
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
        })
        .otherwise({
          redirectTo: '/'
        });
    });
  /* .run(function ($rootScope, $location, AuthenticateFactory) {
      var id = window.sessionStorage.getItem('id');
      if (id === null) {
        $location.path('/login');
      } else {
        AuthenticateFactory.initialise(id);
      }
      $rootScope.$on('$routeChangeStart', function (event, next) {
        if (next.access === undefined) {
          $location.path(next.templateurl);
        } else {
          var requiresLogin = next.access.requiresLogin;
          if (requiresLogin && AuthenticateFactory.isAuthorized()) {
            $location.path(next.templateurl);
          } else {
            if (next.access.isRegister) {
              $location.path('/register');
            } else {
              $location.path('/login');
            }
          }
        }
      });

   });*/
})();
