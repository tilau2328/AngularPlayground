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
            MusicService.artists.list.query(function(artists){
                $scope.artists = artists;
                $scope.loading = false;
            });
        }
    };
    
    $scope.getBands = function(){
        if($scope.bands.length == 0) {
            $scope.loading = true;
            $scope.error = false;
            MusicService.bands.list.query(function(bands){
                $scope.bands = bands;
                $scope.loading = false;
            });
        }
    };
    
    $scope.getAlbums = function(){
        if($scope.albums.length == 0) {
            $scope.loading = true;
            $scope.error = false;
            MusicService.albums.list.query(function(albums){
                $scope.albums = albums;
                $scope.loading = false;
            });
        }
    };
    
    $scope.getTracks = function(){
        if($scope.tracks.length == 0) {
            $scope.loading = true;
            $scope.error = false;
            MusicService.tracks.list.query(function(tracks){
                $scope.tracks = tracks;
                $scope.loading = false;
            });
        }
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
