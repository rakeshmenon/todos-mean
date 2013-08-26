'use strict';

/* Directives */

angular.module('Todo.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
});

angular.module('Todo.directives', []).
  directive('addTodo', function (version, $timeout, $defer) {
    return function(scope, elem, attrs) {
    	console.log(elem);
    	// elem.bind("keypress", function(event){
    	// 	if(event.which == 13){
    	// 		console.log("enter pressed");
    	// 		scope.$apply(function(){
    	// 			scope.addToDo();
    	// 		});
    	// 		elem.parent('#form-parent').addClass('has-success');
    	// 		$timeout(function() {
			  //       elem.parent('#form-parent').removeClass('has-success');
			  //   }, 500);
    	// 		event.preventDefault();
    	// 	}
    	// });
    };
});
angular.module('Todo.directives', []).
  directive('animate', function (version,$timeout) {
    return function(scope, elem, attrs) {
    	$timeout(function(){
    		// elem.addClass('slide-top');
    		console.log(scope.labelTypes);
    		elem.addClass(scope.labelTypes[3]);
    	});
  	}
});

