'use strict';
/* global angular */

var app = app || angular.module('playgroundApp');

function MusicCtrl($scope, $state, MusicService){
    $scope.bands = [];
    $scope.artists = [];
    $scope.albums = [];
    $scope.tracks = [];
    
    $scope.showMusic = true;
    $scope.message = "";
    
    var state = $state.current.name;
    
    $scope.select = function(new_state){ 
        $state.transitionTo(new_state);
        state = new_state; 
    };
    
    $scope.isSelected = function(check_state){ return state == check_state; };
    
    $scope.getArtists = function(){
        if($scope.artists.length == 0) {
            $scope.loading = true;
            $scope.error = false;
            MusicService.getArtists()
                        .then(function(res){
                $scope.artists = res.data;
                $scope.loading = false;
            }, function(err){
                console.log(err);
                $scope.error = err;
                $scope.loading = false;
            });
        }
    };
    
    $scope.getBands = function(){
        if($scope.bands.length == 0) {
            $scope.loading = true;
            $scope.error = false;
            MusicService.getBands()
                        .then(function(res){
                $scope.bands = res.data;
                $scope.loading = false;
            }, function(err){
                console.log(err);
                $scope.error = err;
                $scope.loading = false;
            });
        }
    };
    
    $scope.getAlbums = function(){
        if($scope.albums.length == 0) {
            $scope.loading = true;
            $scope.error = false;
            MusicService.getAlbums()
                        .then(function(res){
                $scope.albums = res.data;
                $scope.loading = false;
            }, function(err){
                console.log(err);
                $scope.error = err;
                $scope.loading = false;
            });
        }
    };
    
    $scope.getTracks = function(){
        if($scope.tracks.length == 0) {
            $scope.loading = true;
            $scope.error = false;
            MusicService.getTracks()
                        .then(function(res){
                $scope.tracks = res.data;
                $scope.loading = false;
            }, function(err){
                console.log(err);
                $scope.error = err;
                $scope.loading = false;
            });
        }
    };
    
    $scope.getBand = function(){
        
    };

    $scope.getAlbum = function(){

    };

    $scope.getSong = function(){

    };

    switch(state){
        case "app.music":
            break;
        case "app.music.artists":
            $scope.getArtists();
            break;
        case "app.music.bands":
            $scope.getBands();
            break;
        case "app.music.albums":
            $scope.getAlbums();
            break;
        case "app.music.tracks":
            $scope.getTracks();
            break;
    }
}

app.controller('MusicCtrl', ['$scope', '$state','MusicService', MusicCtrl]);
