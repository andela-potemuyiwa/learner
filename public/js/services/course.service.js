app.factory('Course', ['$http', function($http) {
  return {
    // call to get all courses
    get: function() {
      return $http.get('/api/courses');
    },
    getEachCourse: function( course_slug ){
      return $http.get('/api/courses/' + course_slug );
    },
    /* these will work when more API routes are defined on the Node side of things
     * call to POST and create a new course
     */
    create: function(userData) {
      return $http.post('/api/courses', courseData);
    },
    // call to DELETE a course
    delete: function(id) {
      return $http.delete('/api/courses/' + id);
    }
  }
}]);