var app = angular.module('TechCtrl', [])

app.controller('TechController', ['$scope', '$routeParams', 'Technology', function($scope, $routeParams, Technology ) {

    Technology.get().success( function(data) {
         $scope.technologies = data;
         console.log( data );
    });

    Technology.getEachTech( $routeParams.tech_slug ).success( function(data) {
         $scope.techDetails = data[0];
         console.log( data);
    });

    Technology.getCourseForTech( $routeParams.tech_slug ).success( function(data) {

         $scope.techcourseDetails = data[0].courses;
         console.log( data[0].courses );
        // console.log( "Tech Course Details : ",  $scope.techcourseDetails );

         // angular.forEach(  $scope.techcourseDetails[0].courses, function( value, key ){
         //   console.log("These are the values",  value );
         // });
    });

}]);



