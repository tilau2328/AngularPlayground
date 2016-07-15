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
        MusicService
        .getBand(bandSlug)
        .then(function(res){ 
            $scope.band = res.data;
            $scope.loadingBand = false;
            getAlbums();
            getArtists();
        }, function(err){
            $scope.error = err;
            $scope.loadingBand = false;
        });
    };
    
    var getAlbums = function (){
        MusicService
        .getBandAlbums(bandSlug)
        .then(function(res){ 
            $scope.band.albums = res.data;
            $scope.loadingAlbums = false;
        }, function(err){
            $scope.error = err;
            $scope.loadingAlbums = false;
        });
    };
    
    var getArtists = function (){
        MusicService
        .getBandArtists(bandSlug)
        .then(function(res){ 
            $scope.band.members = res.data;
            $scope.loadingArtists = false;
        }, function(err){
            $scope.error = err;
            $scope.loadingArtists = false;
        });
    };
    
    getBand();
}