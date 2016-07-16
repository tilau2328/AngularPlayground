'use strict';
/* global angular */

var app = app || angular.module('playgroundApp', []);

app.controller('BandCtrl', ['$scope', '$stateParams', 'MusicService', BandCtrl]);

function BandCtrl($scope, $stateParams, MusicService){
    var bandSlug = $stateParams.slug;
    
    $scope.band = {};
    $scope.loadingBand = true;
    $scope.loadingAlbums = true;
    $scope.loadingArtists = true;

    var getBand = function (){
        MusicService.bands.detail.get({slug: bandSlug}, function(band){
            $scope.band = band;
            $scope.loadingBand = false;
            getAlbums();
            getArtists();
        });
    };
    
    var getAlbums = function (){
        MusicService.bands.albums.query({slug: bandSlug}, function(albums){
            $scope.band.albums = albums;
            $scope.loadingAlbums = false;
        });
    };
    
    var getArtists = function (){
        MusicService.bands.artists.query({slug: bandSlug}, function(artists){
            $scope.band.members = artists;
            $scope.loadingArtists = false;
        });
    };
    
    getBand();
}