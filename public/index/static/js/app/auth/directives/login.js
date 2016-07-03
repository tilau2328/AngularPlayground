'use strict';
/* global angular */
/* global AuthCtrl */

var app = app || angular.module('playgroundApp');

const login = function(){
    return {
        restrict: 'E',
        scope: {
            logged: "="
        },
        templateUrl: "/static/js/app/auth/directives/templates/login.html",
        replace: true,
        controller: AuthCtrl
    };
};

app.directive("login", login);
