app.controller('TechController', ['$scope', '$routeParams', 'Technology', function($scope, $routeParams, Technology ) {

  Technology.get().success(function(data) {
    $scope.technologies = data;
  });

  Technology.getEachTech($routeParams.tech_slug).success(function(data) {
   $scope.techDetails = data[0];
  });

  if( $routeParams.tech_slug ){
    Technology.getCourseForTech($routeParams.tech_slug ).success(function(data) {
      $scope.techcourseDetails = data[0].courses;
      console.log( data[0].courses );
    });
  }
}]);



