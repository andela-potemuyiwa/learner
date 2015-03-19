var app = angular.module('UserCtrl', [])

app.controller('UserController', ['$scope','User' , function($scope, User) {

    $scope.tagline = 'These are the Users for Learner.io...Badges are coming soon';

    User.get().success(function(data) {
         $scope.users = data;
    });

    $scope.newUser = [];


    $scope.signUp = function(){
          if( $scope.user.email && $scope.user.username && $scope.user.password){
            $scope.newUser.push({
              email:    $scope.user.email,
              username: $scope.user.username,
              password: $scope.user.password
            });

            User.create( $scope.newUser ).success( function( data ){
                $scope.message = data.message;
            });
          }
    };


    $scope.signIn = function(){
        if($scope.user.email && $scope.user.password){
          alert($scope.user.email);
          alert($scope.user.password);
        }
    }

}]);