'use strict';
/* global angular */

var app = app || angular.module('app');

const musicPlayer = function(){
    return {
        restrict: 'A',
        templateUrl: "/static/js/app/music/directives/templates/musicPlayer.html",
        replace: true,
        scope: {},
        link: function($scope, $el, $attrs){
        }
    };
};

app.directive("musicPlayer", musicPlayer);