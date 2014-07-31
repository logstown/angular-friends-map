'use strict';

/**
 * @ngdoc overview
 * @name friendsMapApp
 * @description
 * # friendsMapApp
 *
 * Main module of the application.
 */
angular
    .module('friendsMapApp', [
        'ngAnimate',
        'ngCookies',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'facebook',
        'google-maps',
        'mgcrea.ngStrap'
    ])
    .config(function($routeProvider, FacebookProvider) {

        FacebookProvider.init('333221083476999');

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });