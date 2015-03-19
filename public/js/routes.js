var app = angular.module('appRoutes', [])

app.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider',function($routeProvider, $locationProvider, $sceDelegateProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: './views/home.client.view.html',
            controller: 'MainController'
        })

        // users page that will use the UserController
        .when('/users', {
            templateUrl: './views/users.client.view.html',
            controller: 'UserController'
        })
        // Sign In route
        .when('/sign_in', {
            templateUrl: './views/sign_in.client.view.html',
            controller: 'UserController'
        })
        // Sign Up route
        .when('/sign_up', {
            templateUrl: './views/sign_up.client.view.html',
            controller: 'UserController'
        })

        // courses page that will use the CourseController
        .when('/courses', {
            templateUrl: './views/courses.client.view.html',
            controller: 'CourseController'
        })

        .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);


        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            "http://www.youtube.com/embed/**"
        ]);

}]);

