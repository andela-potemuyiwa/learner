var app = angular.module('UserCtrl', [])

app.controller('UserController', ['$rootScope', '$scope','$http','$location','$window','$mdToast','User' , function($rootScope, $scope, $http, $location, $window, $mdToast, User) {

    User.get().success(function(data) {
      $scope.users = data;
    });

    if( $window.sessionStorage["users"] ){
        $rootScope.currentUser = JSON.parse( $window.sessionStorage["users"]);
    }


    $scope.isAuthenticated = function(){
      return !!$rootScope.currentUser;
    }

    $scope.signOut = function(){
      User.logOutUser( function( success, user ){
        if(success){
          $rootScope.currentUser = user;
          delete $window.sessionStorage["users"];
          $location.path('/');
          $mdToast.showSimple('You have successfully Logged Out');
        }
      });
    };

    $scope.signUp = function(){
      if( $scope.user.email && $scope.user.username && $scope.user.password){

        var newUser =  {
          email:    $scope.user.email,
          username: $scope.user.username,
          password: $scope.user.password
        };

        User.create( newUser ).success( function( data ){
            $scope.message = data.message;
        });
      }
    };

    $scope.signIn =  function(){

      var username = $scope.user.email, password = $scope.user.password;

      User.authenticateUser(username, password, function(success, user) {
        if(success) {
          $window.sessionStorage["userInfo"] = "sdsdsd";
          $window.sessionStorage["users"] = JSON.stringify( user );
          $rootScope.currentUser = JSON.parse( $window.sessionStorage["users"]);
          $location.path('/courses');
          $mdToast.showSimple('You have successfully LoggedIn');
        }
        else {
          $mdToast.showSimple('Username/Password combination Incorrect');
        }
      });

    };

}]);