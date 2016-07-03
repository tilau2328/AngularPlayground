'use strict';
/* global angular */
var app = app || angular.module('playgroundApp', []);

app.factory('ProjectsService', ['$http', ProjectsService]);

function ProjectsService($http){
    
    function getProjects(){
        return $http.get('/api/projects');
    }
    
    function createProject(newProject){
        return $http.post('/api/projects', newProject);
    }
    
    function getProject(slug){
        return $http.get('/api/projects/'+slug);
    }
    
    function updateProject(slug, newProject){
        return $http.put('/api/projects/'+slug, newProject);
    }
    
    function deleteProject(slug){
        return $http.delete('/api/projects/'+slug);
    }
    
    return {
        getProjects: getProjects,
        createProject: createProject,
        getProject: getProject,
        updateProject: updateProject,
        deleteProject: deleteProject
    };
}