var app = angular.module('UserService', []);

app.factory('User', ['$http','$q', '$window', function($http, $q, $window ) {

  return {
    // call to get all users
    get : function() {
      return $http.get('/api/users');
    },

    // call to POST and create a new user
    create : function(userData) {
      return $http.post('/api/users', userData);
    },

    // call to DELETE a user
    delete : function(id) {
      return $http.delete('/api/users/' + id);
    },

    authenticateUser: function(username, password, cb) {
      $http.post('/login', { username: username, password: password }).then(function( response ){
        if(response.data.success){
          cb(true, response.data.user);
        }
        else {
          cb(false, null);
        }
      });
    },

    logOutUser: function( cb ){
      $http.post('/logout', { logout: true }).then(function(){
          cb(true, undefined );
      });
    }
  }

}]);