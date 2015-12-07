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
    $scope.feedbacks = [];
    var feedbackUrl = 'https://f33dbackme.herokuapp.com/'+ $routeParams.username +'/feedbacks';

    var loadFeedbacks = function() {
      $http.get(feedbackUrl)
          .success(function(data) {
            $scope.feedbacks = data;
          })
          .error(function() {
            showMessage('Problem retrieving feedbacks');
          });
    };
  
    loadFeedbacks();

    $scope.provideFeedback = function() {
      $scope.showMessage = false;
      $http.post(feedbackUrl, $scope.feedback)
        .success(function(){
          $scope.validationErrors = [];
          showMessage('Feedback sent');
          cleanFields();
          loadFeedbacks();
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

    var showMessage = function(message) {
      $scope.message = message;
      $scope.showMessage = true;
    };

});
