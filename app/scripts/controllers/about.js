'use strict';

/**
 * @ngdoc function
 * @name friendsMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the friendsMapApp
 */
angular.module('friendsMapApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
