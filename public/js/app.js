var app = angular.module('LearnerApp', ['ngRoute', 'ngMaterial','appRoutes','ngSanitize'])
  .run(['$rootScope', '$location', function($rootScope, $location) {
    //register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($rootScope.currentUser == undefined  && next.requireAuth) {
        $location.path( "/" );
      }
    });
}]);