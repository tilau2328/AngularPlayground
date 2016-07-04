'use strict';
/* global angular */
var app = app || angular.module('playgroundApp');

function AuthCtrl($scope, $rootScope, $location, AuthService) {
    $scope.user = AuthService.GetUser() || null;
    const formData = {
        username: "",
        password: "",
        email: ""
    };
    $scope.formData = formData;
    $scope.$root.logged = ($scope.user != null);

    $scope.register = function(){
        const username = $scope.formData.username;
        const email = $scope.formData.email;
        const password = $scope.formData.password;
        const password_confirm = $scope.formData.password_confirm;
        $scope.error = '';
        // TODO: implementar verificação de password repetida no form
        // TODO: implementar persistencia entre o controlador de login e o de register, para o logged
        if(username && email && password && password_confirm){
            console.log(password_confirm);
            if(password == password_confirm){
                $scope.loading = true;
                AuthService.Register(username, password, email, function (result) {
                    if (result === true) {
                        $rootScope.$root.logged = true;
                        $scope.formData.username = "";
                        $scope.formData.password = "";
                        $scope.formData.password_confirm = "";
                        $scope.formData.email = "";
                        $location.path('/');
                    } else {
                        $scope.error = 'Username already exists';
                    }
                    $scope.loading = false;
                    $scope.user = AuthService.GetUser();
                });
            } else {
                $scope.error = 'Passwords do not match';
            }
        }
    };

    $scope.login = function(){
        const username = $scope.formData.username;
        const password = $scope.formData.password;
        $scope.loading = true;
        $scope.error = '';
        AuthService.Login(username, password, function (result) {
            if (result === true) {
                $rootScope.$root.logged = true;
                $scope.formData.username = "";
                $scope.formData.password = "";
                $rootScope.$emit("login");
            } else {
                $scope.error = 'Username or password is incorrect';
            }
            $scope.loading = false;
            $scope.user = AuthService.GetUser();
        });
    };

    $scope.logout = function(){
        AuthService.Logout();
        $rootScope.$root.logged = false;
        $rootScope.$emit("logout");
        $scope.user = null;
        $location.path('/');
    };

}

app.controller('AuthCtrl', ["$scope", "$rootScope", "$location", "AuthService", AuthCtrl]);
