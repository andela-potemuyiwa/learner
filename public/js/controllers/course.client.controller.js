app.controller('CourseController', ['$scope', '$routeParams', '$sce','Course', 'Instructor', function($scope, $routeParams, $sce, Course, Instructor ){

  Course.getEachCourse( $routeParams.course_slug ).success( function( data ){

    $scope.courseDetails = data[0];

    var url  = $scope.courseDetails.course_video_url;

    Instructor.getInstructorById( $scope.courseDetails.instructor_id ).success( function( data ){
        var firstName = data[0].first_name;
        var lastName   = data[0].last_name;
        $scope.courseInstructor = firstName + " " + lastName;
    });

    $scope.course_video = $sce.trustAsHtml('<iframe width="900" height="500" src="' + url + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

    $scope.courseDetails.course_video_url = $scope.course_video;
  });

}]);