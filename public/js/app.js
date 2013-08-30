'use strict';

// Declare app level module which depends on filters, and services

var todo = angular.module('Todo', [
  'Todo.controllers',
  'Todo.filters',
  'Todo.services',
  'Todo.directives',
  'notifications'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/profile', {
      templateUrl: '/partials/profile.html',
      controller: 'ProfileCtrl'
    }).
    when('/logout', {
      // do nothing
    }).
    when('/', {
      templateUrl: '/partials/todo.html',
      controller: 'AppCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
  if(window.location.hash == '#_=_'){
    window.location.href = '/';
  }
});
