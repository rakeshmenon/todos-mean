'use strict';

// Declare app level module which depends on filters, and services

angular.module('Todo', [
  'Todo.controllers',
  'Todo.filters',
  'Todo.services',
  'Todo.directives',
  'notifications'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/profile', {
      templateUrl: 'partials/profile',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
});
