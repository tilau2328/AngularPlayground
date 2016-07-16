'use strict';
/* global angular */
var app = app || angular.module('playgroundApp', []);

app.factory('ProjectsService', ['$resource', ProjectsService]);

function ProjectsService($resource){
    return $resource( '/api/projects/:slug', { slug: '@slug' } );
}