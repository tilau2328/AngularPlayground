'use strict';
/* global angular */

var app = app || angular.module('playgroundApp', ['ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', appConfig]);

function appConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/',
        views: {
            'navbar': {
                templateUrl : '/static/js/app/main/views/navbar.html',
                controller  : 'NavCtrl'
            },
            'content': {
                templateUrl : '/static/js/app/main/views/home.html'
            },
            'footer': {
                templateUrl : '/static/js/app/main/views/footer.html'
            }
        }
    })
    .state('app.aboutme', {
        url: 'aboutme',
        data: {
            name: "About Me"
        },
        views: {
            'content@': {
                templateUrl : '/static/js/app/main/views/aboutme.html'
            }
        }
    })
    .state('app.contacts', {
        url: 'contacts',
        data: {
            name: "Contacts"
        },
        views: {
            'content@': {
                templateUrl : '/static/js/app/main/views/contacts.html'
            }
        }
    })
    .state('app.register', {
        url: 'register',
        views:{
            'content@': {
                templateUrl : '/static/js/app/auth/views/register.html',
                controller  : 'AuthCtrl'
            }
        }
    })
    .state('app.files', {
        url: 'files',
        views:{
            'content@': {
                templateUrl : '/static/js/app/files/views/files.html',
                controller  : 'FilesCtrl'
            }
        }
    })
    .state('app.projects', {
        url: 'projects',
        views:{
            'content@': {
                templateUrl : '/static/js/app/projects/views/list.html',
                controller  : 'ProjectsCtrl'
            }
        }
    })
    .state('app.projects.details', {
        url: '/detail/:slug',
        views:{
            'content@': {
                templateUrl : '/static/js/app/projects/views/detail.html',
                controller  : 'ProjectsCtrl'
            }
        }
    })
    .state('app.projects.add', {
        url: '/add',
        views:{
            'content@': {
                templateUrl : '/static/js/app/projects/views/add.html',
                controller  : 'ProjectsCtrl'
            }
        }
    })
    .state('app.music', {
        url: 'music',
        views:{
            'content@': {
                templateUrl : '/static/js/app/music/views/music.html',
                controller  : 'MusicCtrl'
            },
            'musicContent@app.music': {
                templateUrl : '/static/js/app/music/views/main.html'
            }
        }
    })
    .state('app.music.artists', {
        url: '/artists',
        views:{
            'musicContent': {
                templateUrl : '/static/js/app/music/views/artists.html'
            }
        }
    })
    .state('app.music.artists.details', {
        url: '/:slug',
        views:{
            'content@': {
                templateUrl : '/static/js/app/music/views/artist-details.html',
                controller: 'ArtistCtrl'
            }
        }
    })
    .state('app.music.bands', {
        url: '/bands',
        views:{
            'musicContent': {
                templateUrl : '/static/js/app/music/views/bands.html'
            }
        }
    })
    .state('app.music.bands.details', {
        url: '/:slug',
        views:{
            'content@': {
                templateUrl : '/static/js/app/music/views/band-details.html',
                controller: 'BandCtrl'
            }
        }
    })
    .state('app.music.albums', {
        url: '/albums',
        views:{
            'musicContent': {
                templateUrl : '/static/js/app/music/views/albums.html'
            }
        }
    })
    .state('app.music.albums.details', {
        url: '/:id',
        views:{
            'content@': {
                templateUrl : '/static/js/app/music/views/album-details.html',
                controller: 'AlbumCtrl'
            }
        }
    })
    .state('app.music.tracks', {
        url: '/tracks',
        views:{
            'musicContent': {
                templateUrl : '/static/js/app/music/views/tracks.html'
            }
        }
    })
    .state('app.music.tracks.details', {
        url: '/:id',
        views:{
            'content@': {
                templateUrl : '/static/js/app/music/views/track-details.html',
                controller: 'TrackCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/');
}
