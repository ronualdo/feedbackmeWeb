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
      $scope.showMessage = false;
      $http.post('https://f33dbackme.herokuapp.com/test_user/feedbacks', $scope.feedback)
        .success(function(){
          $scope.validationErrors = [];
          $scope.message = 'Feedback sent';
          $scope.showMessage = true;
          cleanFields();
        })
        .error(function(data) {
          console.log(data);
          $scope.validationErrors = data;
        });
    };

    $scope.hasValidationErrors = function() {
      return $scope.validationErrors.length > 0;
    };

    var cleanFields = function() {
      $scope.feedback.feedbackText = '';
      $scope.feedback.author = '';
    };
  });
