'use strict';
/* global angular */
var app = app || angular.module('playgroundApp', []);

app.controller('NavCtrl', ['$rootScope', '$scope', '$window', '$location', 'ProjectsService', NavCtrl]);

function NavCtrl($rootScope, $scope, $window, $location, ProjectsService) {
    $scope.publicTree = [];
    
    ProjectsService.get(function (res) {
        var projects = res.projects;
        for(var i = 0; i < projects.length; i++){
            var project = projects[i];
            var leaf = {
                name: project.title,
                link: "app.projects.details({slug:'" + project.slug + "'})"
            };
            $scope.publicTree.push(leaf);
        }
        
        if($rootScope.logged && $rootScope.user.username == "tilau"){
            if(projects.length > 0){
                var divider = {
                    name: "divider",
                    link: "#"    
                };
                $scope.publicTree.push(divider);
            }
            var addProject = {
                name: "Add Project",
                link: "app.projects.add"
            };
            $scope.publicTree.push(addProject);
        }
    });
    
    $scope.isActive = function (current) { return current === $location.path(); };
    
    angular.element($window).bind('resize', function(){
        if($window.innerWidth > 767) $scope.navCollapsed = true;
        $scope.$digest();
    });
    
    $rootScope.$on('newProject', function(event, project){
        if($scope.publicTree[0].name == "Add Project"){ $scope.publicTree.unshift({ name: "divider", link: "#" }); }
        $scope.publicTree.unshift({ name: project.title, link: "app.projects.detail({ slug: '" + project.slug + "' })" });
    });
    
    $rootScope.$on('login', function(event, user){
        if($rootScope.user.username == "tilau"){
            if($scope.publicTree.length > 0){ $scope.publicTree.push({ name: "divider", link: "#" }); }
            $scope.publicTree.push({ name: "Add Project", link: "app.projects.add" }); 
        }
    });
    
    $rootScope.$on('logout', function(event, user){
        if($scope.publicTree[$scope.publicTree.length-1].name == "Add Project"){
            $scope.publicTree.pop();
            if($scope.publicTree.length > 0) $scope.publicTree.pop();
        }
    });
    
    $scope.collapseNav = function(){ $scope.navCollapsed = true; };
}
