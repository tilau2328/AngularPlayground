'use strict';
/* global angular */
var app = app || angular.module('playgroundApp');

app.factory('MusicService', ['$http', '$resource', MusicService]);

function MusicService($http, $resource) {
    
    const artists = {
        list: $resource( '/music/artists'),
        detail: $resource( '/music/artists/:slug', { slug:'@slug' }),
        bands: $resource( '/music/artists/:slug/bands', { slug:'@slug' })
    };
    
    const bands = {
        list: $resource( '/music/bands'),
        detail: $resource( '/music/bands/:slug', { slug:'@slug' }),
        artists: $resource( '/music/bands/:slug/artists', { slug:'@slug' }),
        albums: $resource( '/music/bands/:slug/albums', { slug:'@slug' }),
        tracks: $resource( '/music/bands/:slug/tracks', { slug:'@slug' })
    };
    
    const albums = {
        list: $resource( '/music/albums'),
        detail: $resource( '/music/albums/:id', { id:'@id' }),
        tracks: $resource( '/music/albums/:id/tracks', { id:'@id' }),
        bands: $resource( '/music/albums/:id/bands', { id:'@id' })
    };
    
    const tracks = {
        list: $resource( '/music/tracks'),
        detail: $resource( '/music/tracks/:id', { id:'@id' }),
        albums: $resource( '/music/tracks/:id/albums', { id:'@id' }),
        bands: $resource( '/music/tracks/:id/bands', { id:'@id' })
    };
   
    return {
        artists: artists,
        bands: bands,
        albums: albums,
        tracks: tracks
    };
}