var app = angular.module('appRoutes', []);

app.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider',function($routeProvider, $locationProvider, $sceDelegateProvider){
  $routeProvider
    // home page
    .when('/', {
        templateUrl: './views/home.client.view.html',
        controller: 'UserController',
        requireAuth: false
    })
    // users page that will use the UserController
    .when('/users', {
        templateUrl: './views/users.client.view.html',
        controller: 'UserController',
        requireAuth: false
    })
    // Sign In route
    .when('/sign_in', {
        templateUrl: './views/sign_in.client.view.html',
        controller: 'UserController',
        requireAuth: false
    })
    // Sign Up route
    .when('/sign_up', {
        templateUrl: './views/sign_up.client.view.html',
        controller: 'UserController',
        requireAuth: false
    })
    // courses page that will use the CourseController
    .when('/courses', {
        templateUrl: './views/courses.client.view.html',
        controller: 'TechController',
        requireAuth: true
    })
    .when('/courses/:course_slug', {
        templateUrl: './views/courseDetails.client.view.html',
        controller: 'CourseController',
        requireAuth: true
    })
    .when('/technologies/:tech_slug',{
        templateUrl: './views/tech_course.client.view.html',
        controller: 'TechController',
        requireAuth: true
    })
    .when('/api/technologies/:tech_slug/courses',{
        templateUrl: './views/tech_course.client.view.html',
        controller: 'TechController'
    })
    .otherwise({ redirectTo: '/' });

    // eliminate the hashbang shinanegin
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    // whitelist youtube url to be trusted by AngularJs
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        "http://www.youtube.com/embed/**"
    ]);
}]);

