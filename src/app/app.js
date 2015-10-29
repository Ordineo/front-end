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
      'ngMdIcons',
      'ngMap'
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
    .config(['$mdThemingProvider', function ($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('orange')
    }])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          redirectTo: '/login'
        })
        .when('/about', {
          templateUrl: 'app/persons/about.html'
        })
        .when(('/search/:otherId'), {
          templateUrl: 'app/persons/search.html',
          controller: 'SearchCtrl'
        })
        .when('/persons', {
          templateUrl: 'app/persons/persons.html',
          controller: 'ManagementCtrl',
          resolve: {
            person: function (PersonFactory) {
              return PersonFactory.getMyDetails();
            }
          }
        })
        .when('/dashboard', {
          templateUrl: 'app/persons/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .when('/profile', {
          templateUrl: 'app/persons/profile.html',
          controller: 'ProfileCtrl'
        })
        .when('/panel', {
          templateUrl: 'app/persons/panel.html',
          controller: 'PanelCtrl',
          resolve: {
            persons: function (PersonFactory) {
              return PersonFactory.getAll();
            },
            person: function (PersonFactory) {
              return PersonFactory.getMyDetails();
            }
          }
        })
        .when('/customers', {
          templateUrl: 'app/persons/customers.html',
          controller: 'CustomersCtrl'
        })
        .when('/login', {
          templateUrl: 'app/authentication/login.html',
          controller: 'LoginCtrl',
          access: {
            requiresLogin: false
          }
        })
        .when('/register', {
          templateUrl: 'app/authentication/register.html',
          controller: 'RegisterCtrl',
          access: {
            requiresLogin: false,
            isRegister: true
          }
        })
        .when('/unit', {
          templateUrl: 'app/persons/unit.html'
        })
        .when('/roles', {
          templateUrl: 'app/persons/roles.html',
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
            }
          }
        }
      )
        .otherwise({
          redirectTo: '/'
        });
    });
})();
