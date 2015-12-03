'use strict';

/**
 * @ngdoc function
 * @name feedbackmeWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the feedbackmeWebApp
 */
angular.module('feedbackmeWebApp')
  .controller('MainCtrl', function ($scope, $http) {
 
    $scope.feedback = {
      feedbackText: '',
      author: ''
    };

    $scope.message = '';
    $scope.showMessage = false;
    $scope.validationErrors = [];

    $scope.provideFeedback = function() {
      $http.post('https://f33dbackme.herokuapp.com/test_user/feedbacks', $scope.feedback)
        .success(function(){
          $scope.message = 'Feedback sent';
          $scope.showMessage = true;
          cleanFields();
        })
        .error(function(data) {
          console.log(data);
          $scope.validationErrors = data;
        });
    };

    var cleanFields = function() {
      $scope.feedback.feedbackText = '';
      $scope.feedback.author = '';
    };
  });
