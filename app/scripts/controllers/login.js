angular.module('empApp')
    .controller('LoginCtrl', ['$scope', '$modal', '$log', '$http', '$location','dataservice', function ($scope, $modal, $log, $http, $location,dataservice) {

        $scope.invalid =false;
          $scope.valid=false;

        if(window.sessionStorage.getItem("username")==null) {
            $scope.logged = false;
        }else{
            $scope.logged=true;
        }

        $scope.logout = function(){

          window.sessionStorage.clear();
            $scope.logged =false;
            $scope.errmsg = "Successfully logged out!"

        };

        $scope.login =function(login){

            var credentials = {
                'username': login.username,
                'password': login.password


            };



            var handleSuccess = function (data, status) {


                console.log(data);



                if(data==true){
                    console.log("Login successful");
                    window.sessionStorage.setItem("username",login.username);
                    $scope.errmsg ="Logged in!"
                    $scope.logged = true;
                    $scope.invalid =false;
                    $scope.valid=true;


                }else{

                    console.log("data is false");
                    $scope.errmsg ="Invalid Username/Password"
                    $scope.invalid =true;

                }
                    /*window.sessionStorage.setItem("username",login.username);
                    $location.path('/dashboard');

                 else {

                    $scope.err = "Invalid username/password";

                }*/
            };

            dataservice.postItem('POST','http://localhost:8080/api/persons/login/pos',credentials,'application/json').success(handleSuccess);


        }


    }]);