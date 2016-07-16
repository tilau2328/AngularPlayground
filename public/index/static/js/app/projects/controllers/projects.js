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
        ProjectsService.get(function(res){
            $scope.projects = res.projects;
            $scope.show = true;
        });   
    } else {
        $scope.project = {};
        ProjectsService.get({ slug: projectSlug }, function(res){
            $scope.project = res.project;
            $scope.show = true;
        });
    }
    
    $scope.createProject = function(){
        var title = $scope.formData.title || "";
        var description = $scope.formData.description || "";
        if(title){
            var newProject = new ProjectsService({title: title, description: description});
            newProject.$save(function(res) {
                switch(res.code) {
                    case 200:
                        var newProject = res.project;
                        $scope.projects.push(newProject);
                        $rootScope.$emit("newProject", newProject);
                        $location.path('/');
                        break;
                    case 409:
                        break;
                }
            });
        }
    };
}