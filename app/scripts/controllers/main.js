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
 
    var emptyFeedback = {
      feedbackText: '',
      author: ''
    };

    $scope.feedback = emptyFeedback;
    $scope.message = '';
    $scope.validationErrors = [];

    $scope.provideFeedback = function() {
      $http.post('http://f33dbackme.herokuapp.com/test_user/feedbacks', $scope.feedback)
        .success(function(){
          console.log('success');
          $scope.message = 'Feedback sent';
        })
        .error(function(data) {
          console.log('error');
          $scope.validationErrors = data;
        });
    }
  
  });
