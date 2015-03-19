var app = angular.module('CourseCtrl', []);

app.controller('CourseController', ['$scope', '$sce','Course', function($scope, $sce, Course ){

    $scope.tagline = 'Nothing beats a pocket protector for Courses!';

    Course.get().success(function(data) {

         angular.forEach( data, function(value, key ){

            console.log( value.course_video_url );

            var url  = value.course_video_url;

            $scope.course_video = $sce.trustAsHtml('<iframe width="200" height="200" src="' + url + '" frameborder="0" allowfullscreen></iframe>');

            value.course_video_url = $scope.course_video;

         });

         $scope.courses = data;

    });

}]);