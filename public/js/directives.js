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
}).
  directive('contenteditable', function (version,$timeout,$notification) {
    return function(scope, elem, attrs) {
        elem.bind("blur",function(){
            scope.$apply(function(){
                var elemText = elem.text();
                if(scope.item.item != elemText && elemText.trim() != ""){
                    scope.item.item = elemText;
                    elem.addClass('pulse animated');
                    scope.updateTodo(scope.item);
                }else if(elemText.trim() == ""){
                    $notification.warning("O oh!", "You cannot have a blank todo item!");
                    elem.text(scope.item.item);
                }
            });
        });
    }
}).
  directive('deleteAnimate', function (version,$timeout,$notification) {
    return function(scope, elem, attrs) {
        elem.bind("click",function(){
            elem.parent().addClass('animated flipOutX');
            $timeout(function(){
                scope.deleteTodo(scope.item);
            },500);
        });
    }
});

