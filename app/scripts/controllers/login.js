angular.module('empApp')
    .controller('LoginCtrl', LoginCtrl);


LoginCtrl.$inject =['$scope', '$log', '$http', '$location','dataservice','AuthenticateFactory','PersonFactory','$route']

function LoginCtrl($scope, $log, $http, $location,dataservice,AuthenticateFactory,PersonFactory,$route) {


            if(AuthenticateFactory.isAuthorized()){
                $scope.isLogged = true;
                var role = window.sessionStorage.getItem("role");

                if(role=='admin'){
                    $scope.isAdmin =true;
                }

            }
        $scope.logout = function(){

          window.sessionStorage.clear();
            AuthenticateFactory.setAuthorized(false);
            window.location.reload();
            $route.reload();
            $location.path('/login');
        };

        $scope.login =function(login){

            var credentials = {
                'username': login.username,
                'password': login.password


            };
            var handleSuccess = function (data, status,headers,config) {

                console.log("Login successful");
                AuthenticateFactory.setAuthorized(true);
                window.sessionStorage.setItem("id",headers('Location'));


                  if(AuthenticateFactory.isAuthorized()) {
                      $route.reload();
                      window.location.reload();
                      $location.path('/roles');
                  }




            };


            var handleError = function(data, status, headers){

                $scope.errmsg = data.message;
                $scope.invalid = true;

            };
            AuthenticateFactory.getLogin(credentials).success(handleSuccess).error(handleError);


        }


    };