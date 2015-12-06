'use strict';

angular.module('feedbackmeWebApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams) {
 
    $scope.feedback = {
      feedbackText: '',
      author: ''
    };

    $scope.message = '';
    $scope.showMessage = false;
    $scope.validationErrors = [];
    
    $scope.provideFeedback = function() {
      $scope.showMessage = false;
      $http.post('http://localhost:8080/'+ $routeParams.username +'/feedbacks', $scope.feedback)
        .success(function(){
          $scope.validationErrors = [];
          $scope.message = 'Feedback sent';
          $scope.showMessage = true;
          cleanFields();
        })
        .error(function(data) {
          if (data) {
            $scope.validationErrors = data;
          } else {
            $scope.validationErrors = [{message: 'problem while sending feedback'}];
          }
        });
    };

    $scope.hasValidationErrors = function() {
      return $scope.validationErrors.length > 0;
    };

    var cleanFields = function() {
      $scope.feedback.feedbackText = '';
      $scope.feedback.author = '';
    };

    var loadFeedbacks() = function() {
    
    }
  });
