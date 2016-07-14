'use strict';
/* global angular */
var app = app || angular.module('playgroundApp');

app.factory('AuthService', ['$rootScope', '$http', '$localStorage', AuthService]);

function AuthService($rootScope, $http, $localStorage) {
    $rootScope.user = $localStorage.currentUser;
    
    if($rootScope.user){ 
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.user.token;
    }

    function GetUser(){ return $rootScope.user; }

    function Register(username, password, email, callback) {
        $http.post('/register', { username: username, password: password, email: email })
            .success(function (response) {
                if (response.token) {
                    $localStorage.currentUser = { username: username, token: response.token };
                    $rootScope.user = $localStorage.currentUser;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
                    callback(true);
                } else {
                    callback(false);
                }
            }).error(function(err){
                console.log(err);
                callback(false);
            });
    }

    function Login(username, password, callback) {
        $http.post('/login', { username: username, password: password })
            .success(function (response) {
                if (response.token) {
                    $localStorage.currentUser = { username: username, token: response.token };
                    $rootScope.user = $localStorage.currentUser;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
                    callback(true);
                } else {
                    callback(false);
                }
            }).error(function(err){
                console.log(err);
                callback(false);
            });
    }

    function Logout() {
        delete $localStorage.currentUser;
        $rootScope.user = null;
        $http.defaults.headers.common.Authorization = '';
    }

    return {
        Login: Login,
        Register: Register,
        Logout: Logout,
        GetUser: GetUser
    };
}
