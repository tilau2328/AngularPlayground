'use strict';
/* global angular */

var app = app || angular.module('playgroundApp');

function MusicCtrl($scope, MusicService){
    $scope.bands = [];

    $scope.getBands = function(){

    }

    $scope.getBand = function(band){

    }

    $scope.getAlbum = function(band, album){

    }

    $scope.getSong = function(band, album, song){

    }

    $scope.getBands();
}

app.controller('MusicCtrl', ['$scope', 'MusicService', MusicCtrl]);
