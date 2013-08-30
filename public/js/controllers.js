'use strict';

/* Controllers */

angular.module('Todo.controllers', []).
    controller('AppCtrl', function ($scope, $http, $notification) {
        $scope.todos = [];
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
                $scope.todos = data.reverse();
                if($scope.todos.length==0){
                    $scope.message = "Your Todo List Is Empty";
                }
            }).
            error(function (data, status, headers, config) {
                $notification.error("Error "+status, "Unable to fetch the todo list"); 

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
                $scope.todos.unshift(data.item);
                $scope.todoItem = "";
                // $notification.success("Added!", "Todo Item Added Successfully!"); 
                // getTodoList();
            }).
            error(function (data, status, headers, config) {
                $notification.error("Error "+status, "Unable to add a new item. Please try again later."); 
            });
        }

        /**
         * Method to delete an existing todo liste item
         * @return {[type]} [description]
         */
        $scope.deleteTodo = function(item){
            $http({
                method: 'DELETE',
                url: '/todos',
                data: {'id' : item._id},
                headers: {'Content-Type': 'application/json'}
            }).
            success(function (data, status, headers, config) {
                var index = $scope.todos.indexOf(item);
                $scope.todos.splice(index, 1);
                // $notification.success("Deleted!", "Item successfully deleted. Hope you completed it first :)"); 
                // getTodoList();
            }).
            error(function (data, status, headers, config) {
                $notification.error("Error "+status, "Unable to delete"); 
            });
        }

        /**
         * Method to edit an existing todo list item
         * @return {[type]} [description]
         */
        $scope.updateTodo = function(item){
            $http({
                method: 'PUT',
                url: '/todos',
                data: {'id' : item._id, 'completed' : item.completed, 'item' : item.item },
                headers: {'Content-Type': 'application/json'}
            }).
            success(function (data, status, headers, config) {
                if(item.completed == true){
                    var index = $scope.todos.indexOf(item);
                    $scope.todos.push($scope.todos.splice(index, 1)[0]);
                }
            }).
            error(function (data, status, headers, config) {
                $notification.error("Error "+status, "Unable to update the list"); 
            });
        }
    }).
    controller('NavBarCtrl', function ($scope, $notification, $http, $location) {
        /**
         * Logout method to call /logout using GET
         * 
         */
        $scope.logout = function(){
            $http({
              method: 'GET',
              url: '/logout'
            }).
            success(function (data, status, headers, config) {
              window.location.href="/";
            }).
            error(function (data, status, headers, config) {
            });
        }

    }).
    controller('ProfileCtrl', function ($scope, $http, $notification) {
        $scope.user = "";
        getUserData();
        /**
         * Fetching user data
         * @type An object of the user
         */
        function getUserData(){
            $http({
              method: 'GET',
              url: '/account'
            }).
            success(function (data, status, headers, config) {
                $scope.user=data;
            }).
            error(function (data, status, headers, config) {
                $notification.error("Error "+status, "Unable to get data"); 
            });
        }
    });
