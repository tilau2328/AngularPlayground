'use strict';
/* global angular */
var app = app || angular.module('playgroundApp', []);

app.controller('ProjectsCtrl', ['$rootScope', '$scope', '$stateParams', '$location', 'ProjectsService', ProjectsCtrl]);

function ProjectsCtrl($rootScope, $scope, $stateParams, $location, ProjectsService) {
    $scope.projects = [];
    $scope.formData = {};
    
    var projectSlug = $stateParams.slug;
    $scope.show = false;
    $scope.message = "Loading ...";
    
    if(!projectSlug){
        ProjectsService
        .getProjects()
        .then(function (response) {
            $scope.projects = response.data.projects;
            $scope.show = true;
        }, function(err){
            console.log(err);
            $scope.message = "Error: unable to retrieve projects!";
        });    
    } else {
        $scope.project = {};
        ProjectsService
        .getProject(projectSlug)
        .then(function (response) {
            $scope.project = response.data.project;
            $scope.show = true;
        }, function(err){
            console.log(err);
            $scope.message = "Error: unable to retrieve project!";
        });
    }
    
    $scope.createProject = function(){
        var title = $scope.formData.title || "";
        var description = $scope.formData.description || "";
        if(title){
            ProjectsService
            .createProject({title: title, description: description})
            .then(function (response) {
                switch(response.data.code) {
                    case 200:
                        var newProject = response.data.project;
                        $scope.projects.push(newProject);
                        $rootScope.$emit("newProject", newProject);
                        $location.path('/');
                        break;
                    case 409:
                        break;
                }
            }, function(err){
                console.log(err);
                // TODO: tornar a mensagem global
                $scope.message = "Error: unable to create project, you are not logged in!";
                $location.path('/');
            });
        }
    };
    
    
}