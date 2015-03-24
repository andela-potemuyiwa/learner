var app = angular.module('InstructorService', []);

app.factory('Instructor', ['$http', function($http) {

    return {
        // call to get all Instructors
        get: function() {
            return $http.get('/api/instructors');
        },

        getEachInstructor: function( twitter_handle ){
            return $http.get('/api/instructors/' + twitter_handle );
        },

        getInstructorById: function( id ){
            return $http.get('/api/instructors/' + id );
        },

        // call to create a new Instructor
        create : function(instructorData) {
            return $http.post('/api/instructors', instructorData);
        },

        // call to DELETE an instructor
        delete : function(id) {
            return $http.delete('/api/instructors/' + id);
        }
    }

}]);