'use strict';

/* Directives */

angular.module('Todo.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
}).
  directive('randomClass', function (version) {
    return function(scope, elem, attrs) {
        elem.addClass(scope.labelTypes[Math.floor(Math.random() * scope.labelTypes.length)]);
    };
}).
  directive('checkMark', function (version,$timeout) {
    return function(scope, elem, attrs) {
        elem.bind("click",function(){
            if(scope.item.completed==false){
                scope.$apply(function(){
                    scope.item.completed = true;
                });
                // elem.parent().parent('.todo-item').toggleClass('completed-true');
            }else{
                scope.$apply(function(){
                    scope.item.completed = false;
                });
                // elem.parent().parent('.todo-item').toggleClass('completed-false');
            }
            scope.updateTodo(scope.item);
        });
    }
});

