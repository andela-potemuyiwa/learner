app.factory('Instructor', ['$http', function($http) {
  return {
    // call to get all Instructors
    get: function() {
        return $http.get('/api/instructors');
    },
    // call to get an Instructor by twitter_handle
    getEachInstructor: function( twitter_handle ){
        return $http.get('/api/instructors/' + twitter_handle );
    },
    // call to get an Instructor by id
    getInstructorById: function( id ){
        return $http.get('/api/instructors/' + id );
    },
    // call to create a new Instructor
    create: function(instructorData) {
        return $http.post('/api/instructors', instructorData);
    },
    // call to delete an instructor
    delete: function(id) {
        return $http.delete('/api/instructors/' + id);
    }
  }

}]);