angular.module('LearnerApp', ['ngRoute', 'ngMaterial','appRoutes','ngSanitize','MainCtrl','TechCtrl','CourseCtrl', 'UserCtrl', 'UserService','CourseService','TechService','InstructorService'])
  .run(['$rootScope', '$location', function($rootScope, $location) {
    //register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ( $rootScope.currentUser == undefined  && next.requireAuth ) {
        $location.path( "/" );
      }
    });
  }]);