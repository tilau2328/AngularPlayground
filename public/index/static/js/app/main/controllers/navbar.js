'use strict';
/* global angular */
var app = app || angular.module('playgroundApp', []);

app.controller('NavCtrl', ['$rootScope', '$scope', '$window', 'ProjectsService', NavCtrl]);

function NavCtrl($rootScope, $scope, $window, ProjectsService) {
    $scope.tree = [];
    
    ProjectsService.getProjects().then(function (response) {
        var projects = response.data.projects;
        for(var i = 0; i < projects.length; i++){
            var project = projects[i];
            var leaf = {
                name: project.title,
                link: "app.projects.detail({ slug: '" + project.slug + "' })"
            };
            $scope.tree.push(leaf);
        }
        
        //TODO: Só adicionar addProject se o user estiver logged
        if($rootScope.logged){
            if(projects.length > 0){
                var divider = {
                    name: "divider",
                    link: "#"    
                };
                $scope.tree.push(divider);
            }
            var addProject = {
                name: "Add Project",
                link: "app.projects.add"
            };
            $scope.tree.push(addProject);
        }
    }, function(err){
        console.log(err);
    });
    
    angular.element($window).bind('resize', function(){
        if($window.innerWidth > 767) $scope.navCollapsed = true;
        $scope.$digest();
    });
    
    $rootScope.$on('newProject', function(event, project){
        if($scope.tree[0].name == "Add Project"){ $scope.tree.unshift({ name: "divider", link: "#" }); }
        $scope.tree.unshift({ name: project.title, link: "app.projects.detail({ slug: '" + project.slug + "' })" });
    });
    
    $rootScope.$on('login', function(event, user){
        if($scope.tree.length > 0){ $scope.tree.push({ name: "divider", link: "#" }); }
        $scope.tree.push({ name: "Add Project", link: "app.projects.add" }); 
    });
    
    $rootScope.$on('logout', function(event, user){
        $scope.tree.pop();
        if($scope.tree.length > 0) $scope.tree.pop();
    });
}
