app.factory('Technology', ['$http', function($http) {
  return {
    // call to get all Technologies
    get: function() {
      return $http.get('/api/technologies');
    },
    // call to get a Technology
    getEachTech: function( slug ){
      return $http.get('/api/technologies/' + slug );
    },
    // call to get courses under each Technology
    getCourseForTech: function( slug ){
      return $http.get('/api/technologies/' + slug + "/courses");
    },
    // call to create a new Technology
    create: function( TechData ) {
      return $http.post('/api/technologies', TechData);
    },
    // call to DELETE a Technology
    delete: function( id ) {
      return $http.delete('/api/technologies/' + id);
    }
  }
}]);