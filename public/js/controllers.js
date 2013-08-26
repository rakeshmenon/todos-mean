'use strict';

/* Controllers */

angular.module('Todo.controllers', []).
    controller('AppCtrl', function ($scope, $http) {
        $scope.todos = [];
        $scope.message = "";
        $scope.labelTypes = ['.label-default', '.label-primary', '.label-success', '.label-info', '.label-warning', 'label-danger'];
        getTodoList();
        /**
         * Automatically fetching data from the server on load
         * @type An array of todo items being sent
         */
        function getTodoList(){
            $http({
              method: 'GET',
              url: '/todos'
            }).
            success(function (data, status, headers, config) {
              // $scope.name = data.name;
                // console.log(data);
                $scope.todos = data;
                if($scope.todos.length==0){
                    $scope.message = "Your Todo List Is Empty";
                }
            }).
            error(function (data, status, headers, config) {
              $scope.name = 'Error!'
            });
        }

        /**
         *  Method to add Todo item to the list
         *  @param item Value filled in the text area
         *  @return string success or failure
         */
        $scope.addToDo = function(){
            var item = $scope.todoItem;
            $http({
                method: 'POST',
                url: '/todos',
                data: {'item' : $scope.todoItem},
                headers: {'Content-Type': 'application/json'}
            }).
            success(function (data, status, headers, config) {
                // $scope.name = data.name;
                // $scope.todos.push($scope.todoItem);
                $scope.todoItem = "";
                getTodoList();
            }).
            error(function (data, status, headers, config) {
                $scope.message = 'Error!'
            });
        }

        /**
         * Method to delete an existing todo liste item
         * @return {[type]} [description]
         */
        $scope.deleteTodo = function(item){
            console.log(item);
            $http({
                method: 'DELETE',
                url: '/todos',
                data: {'id' : item._id},
                headers: {'Content-Type': 'application/json'}
            }).
            success(function (data, status, headers, config) {
                // $scope.name = data.name;
                $scope.message = data.status;
                getTodoList();
            }).
            error(function (data, status, headers, config) {
                $scope.message = 'Error!'
            });
        }
    }).
    controller('MyCtrl1', function ($scope) {
        // write Ctrl here

    }).
    controller('MyCtrl2', function ($scope) {
        // write Ctrl here

    });
