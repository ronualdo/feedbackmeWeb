'use strict';

/**
 * @ngdoc overview
 * @name feedbackmeWebApp
 * @description
 * # feedbackmeWebApp
 *
 * Main module of the application.
 */
angular
  .module('feedbackmeWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/user/:username', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/about'
      });
  });
