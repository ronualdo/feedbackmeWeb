"use strict";angular.module("feedbackmeWebApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("feedbackmeWebApp").controller("MainCtrl",["$scope","$http",function(a,b){a.feedback={feedbackText:"",author:""},a.message="",a.showMessage=!1,a.validationErrors=[],a.provideFeedback=function(){b.post("https://f33dbackme.herokuapp.com/test_user/feedbacks",a.feedback).success(function(){a.message="Feedback sent",a.showMessage=!0,c()}).error(function(b){a.validationErrors=b})};var c=function(){a.feedback.feedbackText="",a.feedback.author=""}}]),angular.module("feedbackmeWebApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("feedbackmeWebApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="alert alert-info" ng-show="showMessage"> {{ message }} </div> <form ng-submit="provideFeedback()"> <fieldset class="form-group"> <label for="feedback">Feedback: </label> <textarea class="form-control" id="feedback" rows="3" ng-model="feedback.feedbackText"></textarea> </fieldset> <fieldset class="form-group"> <label for="author">Author: </label> <input type="text" id="author" ng-model="feedback.author"> </fieldset> <button type="submit" class="btn btn-primary">Submit</button> </form>')}]);