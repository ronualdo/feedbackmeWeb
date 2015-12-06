'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('feedbackmeWebApp'));

  var MainCtrl,
    scope,
    httpBackend;

  var testUserFeedbackUrl = 'https://f33dbackme.herokuapp.com/test_user/feedbacks';

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $routeParams: {username: 'test_user'}
    });
    httpBackend = $httpBackend;
  }));

  it('should show a success message when able to provide new feedback', function() {
    var newFeedback = {
      feedbackText: 'my new feedback',
      author: 'author'
    };
        
    scope.feedback = newFeedback;


    httpBackend.when('GET', testUserFeedbackUrl).respond(201, []);
    httpBackend.expectPOST(testUserFeedbackUrl, newFeedback).respond({});
    
    scope.provideFeedback();
    
    httpBackend.flush();
    expect(scope.message).toContain('sent');
  });

  it('should clean fields after providing feedback', function(){
    scope.feedback.feedbackText = 'test';
    scope.feedback.author = 'author';

    httpBackend.when('GET', testUserFeedbackUrl).respond(201, []);
    httpBackend.when('POST', testUserFeedbackUrl)
        .respond({});

    scope.provideFeedback();
    
    httpBackend.flush();

    expect(scope.feedback.feedbackText).toEqual('');
    expect(scope.feedback.author).toEqual('');
  });

  it('should inform when a validation fail while providing feedback', function(){
    var validationErrors = [
      { field: 'field1', message: 'validation message 1' },
      { field: 'field2', message: 'validation message 2' }
    ];
   

    httpBackend.when('GET', testUserFeedbackUrl).respond(201, []);
    httpBackend.when('POST', testUserFeedbackUrl).respond(401, validationErrors);

    scope.provideFeedback();

    httpBackend.flush();

    expect(scope.validationErrors.length).toBe(2);
    expect(scope.validationErrors).toContain(validationErrors[0]);
    expect(scope.validationErrors).toContain(validationErrors[1]); 
  });

  it('should list the feedbacks of the user', function(){
    var feedbacks = [
      {id: 1, feedbackText: 'feedback 1', author: 'author1'},
      {id:2, feedbackText: 'feedback 2', author: 'author2'}
    ];

    httpBackend.when('GET', testUserFeedbackUrl).respond(201, feedbacks);
    httpBackend.flush();

    expect(scope.feedbacks.length).toBe(2);
    expect(scope.feedbacks).toContain(feedbacks[0]);
    expect(scope.feedbacks).toContain(feedbacks[1]);
  });

  it('should load list of feedbacks after submiting', function() {
    var newFeedback = {
      feedbackText: 'a new feedback ',
      author: 'author'
    };

    scope.feedback.feedbackText = newFeedback.feedbackText;
    scope.feedback.author = newFeedback.author;

    httpBackend.expectGET(testUserFeedbackUrl).respond(201, []);
    httpBackend.expectGET(testUserFeedbackUrl).respond(201, [newFeedback]);
    httpBackend.when('POST', testUserFeedbackUrl).respond(201, {});

    scope.provideFeedback();

    httpBackend.flush();

    expect(scope.feedbacks.length).toBe(1);
    expect(scope.feedbacks).toContain(newFeedback);
  });

});
